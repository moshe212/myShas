import React, { useState, useRef, useEffect, memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Page = React.forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => setDirty(false), [props.initialValue]);

  const isDataExist =
    props.data.filter((data) => data.Index === props.number).length > 0;

  const currentData = isDataExist
    ? props.data.find((data) => data.Index === props.number)
    : undefined;

  const date = new Date(currentData?.Date);
  const day = String(date?.getDate()).padStart(2, "0"); // Adds leading 0 if necessary
  const month = String(date?.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const year = date?.getFullYear();

  // Combine the parts into your desired format
  const formattedDate = `${day}/${month}/${year}`;

  const initialValueHtml = `<p class='custom-font'>${props.initialValue}</p>`;

  const saveMemory = ({ status }) => {
    if (editorRef.current) {
      // Retrieve the UUID from local storage
      let storedUUID = localStorage.getItem("myUniqueIdentifier");

      if (!storedUUID) {
        const myUUID = uuidv4();
        localStorage.setItem("myUniqueIdentifier", myUUID);
        storedUUID = localStorage.getItem("myUniqueIdentifier");
      }

      const content = editorRef.current.getContent();
      const isDirty = status === "Draft";
      setDirty(isDirty);
      editorRef.current.setDirty(isDirty);

      axios
        .post("/api/SaveMemories", {
          content,
          index: props.number,
          status,
          userID: storedUUID,
        })
        .then(function (response) {
          if (response.data === "OK") {
            console.log(" eq OK");
          } else {
            console.log("error", response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">
          זכרון שלמה - ספר זכרונות
          {/* Page header - {props.number} currentData -{" "}
          {currentData ? currentData : ""} */}
        </h2>
        {/* <div className="page-image"></div>
        <div className="page-text">{props.children}</div> */}
        <div>
          {!currentData && (
            <div>
              <Editor
                apiKey="pjg3vvtu0xlf1e2r41wq0nuefa1qaw1tliuzpedkohqoi5d5"
                init={{
                  forced_root_block: "div", // Use 'div' instead of 'p' for new blocks
                  // forced_root_block_attrs: {
                  //   // Set attributes for the 'div' (optional)
                  //   class: "my-custom-class",
                  // },
                  branding: false,
                  menubar: false,
                  // content_css: "memory.css",
                  // content_style:
                  //   "@font-face{font-family: 'DanaYadAlefAlefAlef-Normal';src: url('../../assets/fonts/DanaYadAlefAlefAlef-Normal.woff') format('woff');font-weight: normal;} .custom-font { font-family: 'DanaYadAlefAlefAlef-Normal';font-size: medium;font-weight: 600; } ",
                  height: "500px",
                  plugins:
                    "directionality autoresize tinycomments mentions anchor autolink charmap codesample emoticons image link lists media wordcount mediaembed formatpainter pageembed permanentpen footnotes editimage powerpaste",
                  toolbar:
                    "undo redo bold italic underline link image media | blocks fontfamily fontsize | rtl ltr | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  directionality: "rtl",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  autoresize_max_height: 500, // maximum height the editor should resize to
                  min_height: 500,
                  max_height: 500,

                  setup: function (editor) {
                    editor.ui.registry.addMenuButton("more", {
                      text: "More",
                      fetch: (callback) => {
                        const items = [
                          {
                            type: "menuitem",
                            text: "Strikethrough",
                            icon: "strikethrough",
                            onAction: () =>
                              editor.execCommand(
                                "mceToggleFormat",
                                false,
                                "strikethrough"
                              ),
                          },
                          // ... Add more items as needed
                        ];
                        callback(items);
                      },
                    });

                    editor.on("keydown", function (e) {
                      const maxChars = 700; // Set your desired limit
                      const contentLength = editor.getContent({
                        format: "text",
                      }).length;
                      if (contentLength >= maxChars) {
                        console.log("content");
                        // Content is larger than the container
                        // Handle the situation here (e.g., delete the last character, show a warning, etc.)
                        e.preventDefault();
                      }
                    });
                  },
                }}
                initialValue={
                  currentData ? currentData : initialValueHtml || ""
                }
                onInit={(evt, editor) => (editorRef.current = editor)}
                onDirty={() => {
                  saveMemory({ status: "Draft" });
                }}
              />
              <button
                className="editorBtn"
                onClick={() => {
                  saveMemory({ status: "Close" });
                }}
                disabled={!dirty}
              >
                שמור
              </button>

              {dirty && <p className="dirtyNotes">טרם שמרת את התוכן שכתבת!</p>}
            </div>
          )}
          {currentData && (
            <div>
              <p className="header-memory-text custom-font">
                <span>בס"ד</span> <span>{formattedDate}</span>
              </p>

              <div
                className="body-memory-text custom-font"
                dangerouslySetInnerHTML={{ __html: currentData.MemoryText }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="page-footer">{props.number + 1}</div>
    </div>
  );
});

export default Page;
