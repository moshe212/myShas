import { PageFlip } from "page-flip";
import "./MainBook2.css";

import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
// import Editor from "./TextEditor";
import { Editor } from "@tinymce/tinymce-react";

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
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        {/* <div className="page-image"></div>
        <div className="page-text">{props.children}</div> */}
        <div>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="pjg3vvtu0xlf1e2r41wq0nuefa1qaw1tliuzpedkohqoi5d5"
            init={{
              plugins:
                "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              // ai_request: (request, respondWith) =>
              //   respondWith.string(() =>
              //     Promise.reject("See docs to implement AI Assistant")
              //   ),
            }}
            initialValue="Welcome to TinyMCE!"
          />
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
    setPage(e.data);
  };

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
        onFlip={onPage}
        // You can still define onChangeOrientation and onChangeState if needed
        className="demo-book"
        ref={flipBook}
        flip={onPage}
      >
        <PageCover>THE END</PageCover>
        <Page number={5} index={1}>
          Lorem ipsum...
        </Page>
        <Page number={4} index={2}>
          Lorem ipsum...
        </Page>
        <Page number={3} index={3}>
          Lorem ipsum...
        </Page>
        <Page number={2} index={4}>
          Lorem ipsum...
        </Page>
        <Page number={1} index={5}>
          Lorem ipsum...
        </Page>
        <Page number={0} index={6}>
          Lorem ipsum...
        </Page>
        <PageCover>BOOK TITLE</PageCover>
      </HTMLFlipBook>

      <div className="container">
        <div>
          <button type="button" onClick={prevButtonClick}>
            Previous page
          </button>
          [<span>{page}</span> of
          <span>{totalPage}</span>]
          <button type="button" onClick={nextButtonClick}>
            Next page
          </button>
        </div>
        {/* Other state or orientation elements */}
      </div>
    </div>
  );
}

export default MainBooks;
