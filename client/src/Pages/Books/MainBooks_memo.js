import { PageFlip } from "page-flip";
import "./MainBook2.css";

import React, { useState, useRef, useEffect, memo } from "react";
import HTMLFlipBook from "react-pageflip";
// import Editor from "./TextEditor";
import { Editor } from "@tinymce/tinymce-react";
import { debounce } from "lodash"; // Ensure lodash is installed
import axios from "axios";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  console.log(props.number);
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => setDirty(false), [props.initialValue]);
  console.log("data", props.data);
  console.log("number", props.number);
  const isDataExist =
    props.data.filter((data) => data.Index === props.number).length > 0;
  console.log("isDataExist", isDataExist);
  if (isDataExist) {
    console.log(props.data.find((data) => data.Index === props.number));
  }
  const currentData = isDataExist
    ? props.data.find((data) => data.Index === props.number).MemoryText
    : undefined;
  console.log("current", currentData);
  // useEffect(() => {
  //   const currentData = data[props.number];
  //   console.log("current", currentData);
  // }, [data, props.number]);

  // const [value, setValue] = useState(initialValue ?? "");
  // useEffect(() => setValue(initialValue ?? ""), [initialValue]);
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      axios
        .post("/api/SaveMemories", {
          content,
          index: props.number,
        })
        .then(function (response) {
          console.log("response", response);
          if (response.data === "OK") {
            console.log(response.data);
          } else {
            console.log("error", response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(content);
    }
  };
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">
          Page header - {props.number} currentData -{" "}
          {currentData ? currentData : ""}
        </h2>
        {/* <div className="page-image"></div>
        <div className="page-text">{props.children}</div> */}
        <div>
          {!currentData && (
            <div>
              <Editor
                apiKey="pjg3vvtu0xlf1e2r41wq0nuefa1qaw1tliuzpedkohqoi5d5"
                init={{
                  menubar: false,
                  content_css: "tinymce-5",
                  height: "500px",
                  plugins:
                    "directionality autoresize tinycomments mentions anchor autolink charmap codesample emoticons image link lists media wordcount mediaembed formatpainter pageembed permanentpen footnotes editimage powerpaste",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | link image media table | blocks fontfamily fontsize | rtl ltr | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  directionality: "rtl",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  // browser_spellcheck: false,
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  autoresize_max_height: 500, // maximum height the editor should resize to
                  min_height: 500,
                  max_height: 500,
                  // content_style: "body { overflow-y: hidden; }",
                  setup: function (editor) {
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

                  // ai_request: (request, respondWith) =>
                  //   respondWith.string(() =>
                  //     Promise.reject("See docs to implement AI Assistant")
                  //   ),
                }}
                // value={value}
                // onEditorChange={(newValue, editor) => setValue(newValue)}
                // initialValue={initialValue}
                initialValue={
                  currentData ? currentData : props.initialValue || ""
                }
                onInit={(evt, editor) => (editorRef.current = editor)}
                onDirty={() => setDirty(true)}
              />
              <button onClick={save} disabled={!dirty}>
                Save
              </button>

              {dirty && <p>You have unsaved content!</p>}
            </div>
          )}
          {currentData && <div>{currentData}</div>}
        </div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

function MainBooks() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(6);
  const flipBook = useRef(null);
  const [state, setState] = useState("read");
  const [memoryData, setMemoryData] = useState([]);

  const nextButtonClick = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const onPage = (e) => {
    console.log("onPage", e);

    setPage(e.data);
  };

  useEffect(() => {
    let isMounted = true;

    const getAllMemories = () => {
      axios
        .post("/api/getAllMemories")
        .then(function (response) {
          if (isMounted) {
            console.log("response", response);
            if (response.data.length > 0) {
              console.log(response.data);
              setMemoryData(response.data);
            } else {
              console.log("error", response);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getAllMemories();

    return () => {
      isMounted = false; // set the flag to false when component unmounts
    };
  }, []);
  // useEffect(() => {
  //   if (flipBook.current) {
  //     setTotalPage(flipBook.current.getPageCount());
  //   }
  // }, [flipBook]); // This mimics componentDidMount as it only runs once

  return (
    <div>
      <HTMLFlipBook
        disableFlipByClick={true}
        // state={state}
        startPage={7}
        width={550}
        height={733}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        // onFlip={onPage}
        // You can still define onChangeOrientation and onChangeState if needed
        className="demo-book"
        ref={flipBook}
      >
        <PageCover>THE END</PageCover>

        <Page
          key={1}
          index={1}
          number={5}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <Page
          key={2}
          index={2}
          number={4}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <Page
          key={3}
          index={3}
          number={3}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <Page
          key={4}
          index={4}
          number={2}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <Page
          key={5}
          index={5}
          number={1}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <Page
          key={6}
          index={6}
          number={0}
          initialValue="Welcome to TinyMCE!"
          data={memoryData}
        >
          Lorem ipsum...
        </Page>
        <PageCover>BOOK TITLE</PageCover>
      </HTMLFlipBook>

      <div className="container">
        <div>
          <button type="button" onClick={nextButtonClick}>
            דף קודם
          </button>
          [<span>{totalPage}</span>of<span>{page}</span>]
          <button type="button" onClick={prevButtonClick}>
            דף הבא
          </button>
        </div>
        {/* Other state or orientation elements */}
      </div>
    </div>
  );
}

export default MainBooks;
