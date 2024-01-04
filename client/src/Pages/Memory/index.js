import { PageFlip } from "page-flip";
import "./memory.css";

import React, { useState, useRef, useEffect, memo } from "react";
import HTMLFlipBook from "react-pageflip";
// import Editor from "./TextEditor";
import { Editor } from "@tinymce/tinymce-react";
import { debounce } from "lodash"; // Ensure lodash is installed
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

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
    ? props.data.find((data) => data.Index === props.number)
    : undefined;
  console.log("current", currentData);

  const date = new Date(currentData?.Date);
  const day = String(date?.getDate()).padStart(2, "0"); // Adds leading 0 if necessary
  const month = String(date?.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const year = date?.getFullYear();

  // Combine the parts into your desired format
  const formattedDate = `${day}/${month}/${year}`;

  const initialValueHtml = `<p class='custom-font'>${props.initialValue}</p>`;
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
                  branding: false,
                  menubar: false,
                  content_css: "memory.css",
                  content_style:
                    "@font-face{font-family: 'DanaYadAlefAlefAlef-Normal';src: url('../../assets/fonts/DanaYadAlefAlefAlef-Normal.woff') format('woff');font-weight: normal;} .custom-font { font-family: 'DanaYadAlefAlefAlef-Normal';font-size: medium;font-weight: 600; } ",
                  height: "500px",
                  plugins:
                    "directionality autoresize tinycomments mentions anchor autolink charmap codesample emoticons image link lists media wordcount mediaembed formatpainter pageembed permanentpen footnotes editimage powerpaste",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | link image media table | blocks fontfamily fontsize | rtl ltr | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
                onDirty={() => setDirty(true)}
              />
              <button className="editorBtn" onClick={save} disabled={!dirty}>
                שמור
              </button>

              {dirty && <p>טרם שמרת את התוכן שכתבת!</p>}
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

function FlipBook() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(6);
  const flipBook = useRef(null);
  const [state, setState] = useState("read");
  const [memoryData, setMemoryData] = useState([]);

  const startPageNum = 7;
  const lastPageNum = 0;

  const goToStart = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flip(startPageNum); // Go to the first page
    }
  };

  const goToEnd = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flip(lastPageNum);
      // const totalPages = flipBook.current.getPageCount();
      // flipBook.current.pageFlip().flip(totalPages - 1);
    }
  };

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

  let history = useHistory();
  function handleClick() {
    history.push("/");
  }

  function goToCharidy() {
    history.push("/charidy");
  }

  return (
    <div className="memory-main">
      <div className="memory-header-grid-container">
        <img
          className="memory-item1"
          src="/Images/book.png"
          alt=""
          onClick={handleClick}
        ></img>

        <div className="memory-item2">זכרונות</div>
        <div className="memory-item7" onClick={goToCharidy}>
          היה שותף
        </div>
      </div>
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
          <PageCover>
            <p className="back-cover-text">
              רעיון ספר הזכרונות הדיגיטלי נולד לאחר פניה של מספר תלמידים של אבא
              זצ"ל בעקבות המפגש סיום הש"ס שהיה בישיבה בקרית ארבע ביום השנה ה-20.
              בערב זה הייתה תחושה מרוממת של דיבוק חברים והועלו זכרונות רבים של
              תלמידים מהשנים הראשונות שאבא זצ"ל היה בישיבה בתחילת שנות ה-80.
              <p></p> אני מקווה שהפלטפורמה הזו תסייע לנו להתחבר לישיבה, לתקופה
              ולאבא שכל כך אהב את הישיבה, את קרית ארבע, את התלמידים ואת העשיה
              הלימודית והחברתית נפשית עם התלמידים.
            </p>
            <div>
              <img
                className="border-icon"
                src="Images/border-icon.png"
                alt="border-icon"
              />
            </div>
          </PageCover>

          <Page
            key={1}
            index={1}
            number={5}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <Page
            key={2}
            index={2}
            number={4}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <Page
            key={3}
            index={3}
            number={3}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <Page
            key={4}
            index={4}
            number={2}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <Page
            key={5}
            index={5}
            number={1}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <Page
            key={6}
            index={6}
            number={0}
            initialValue="אנא כתוב כאן את זכרונותך!"
            data={memoryData}
          >
            Lorem ipsum...
          </Page>
          <PageCover>
            <div className="cover-header">
              <h2>זכרון שלמה</h2> <p>ספר זכרונות</p>
            </div>
            <div>
              <img
                className="cover-img"
                src="Images/coverImg_s.png"
                alt="cover-img"
              />
              <p className="cover-years">תש"ה - תשס"ג</p>
            </div>
          </PageCover>
        </HTMLFlipBook>
      </div>
      <div className="container">
        <div>
          <button
            className="editorBtn to-start"
            type="button"
            onClick={goToStart}
          >
            להתחלה
          </button>
          <button
            className="editorBtn prev-page"
            type="button"
            onClick={nextButtonClick}
          >
            דף קודם
          </button>
          {/* [<span>{totalPage}</span>of<span>{page}</span>] */}

          <button
            className="editorBtn next-page"
            type="button"
            onClick={prevButtonClick}
          >
            דף הבא
          </button>
          <button className="editorBtn to-end" type="button" onClick={goToEnd}>
            לסוף
          </button>
        </div>
        {/* Other state or orientation elements */}
      </div>
    </div>
  );
}

export default FlipBook;
