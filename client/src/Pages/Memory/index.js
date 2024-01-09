import { pagesArray } from "./pagesArray";
import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Page from "./Page";
import PageCover from "./PageCover";
import "./memory.css";

function FlipBook() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(6);
  const flipBook = useRef(null);
  const [state, setState] = useState("read");
  const [memoryData, setMemoryData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const startPageNum = 83;
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
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(parseInt(window.innerHeight) - 350);
    };
    console.log("h", parseInt(window.innerHeight) - 350);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedUUID = localStorage.getItem("myUniqueIdentifier");
    const deleteDraftsMemories = () => {
      if (storedUUID) {
        axios
          .delete("/api/DeleteDraftsMemories", {
            data: { userID: storedUUID },
          })
          .then(function (response) {
            if (response.data === "OK") {
              console.log(response.data);
            } else {
              // console.log("error", response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("No storedUUID found in local storage.");
      }
    };

    deleteDraftsMemories();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const getAllMemories = () => {
      axios
        .post("/api/getAllMemories")
        .then(function (response) {
          if (isMounted) {
            if (response.data.length > 0) {
              console.log("response.data > 0");
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

  function handleClickBooks() {
    history.push("/mainBooks");
  }

  function goToCharidy() {
    history.push("/charidy");
  }

  if (!memoryData.length > 0) return <div>Loading...</div>;
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
        <div className="memory-item3" onClick={handleClickBooks}>
          ספרים
        </div>

        <div className="memory-item7" onClick={goToCharidy}>
          היה שותף
        </div>
      </div>
      <div>
        <HTMLFlipBook
          // key={`${width}-${height}`}
          disableFlipByClick={true}
          startPage={83}
          width={width < 768 ? width / 2 - 10 : 550}
          height={width < 768 ? height - 180 : 733}
          size="fixed"
          minWidth={width < 768 ? 0 : 315}
          maxWidth={width < 768 ? 100 : 1000}
          minHeight={width < 768 ? 0 : 400}
          maxHeight={width < 768 ? height - 180 : 1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          // onFlip={onPage}
          // You can still define onChangeOrientation and onChangeState if needed
          className="demo-book"
          ref={flipBook}
          // usePortrait={false}
        >
          <PageCover>
            <div className="back-cover-text">
              רעיון ספר הזכרונות הדיגיטלי נולד לאחר פניה של מספר תלמידים של אבא
              זצ"ל בעקבות המפגש סיום הש"ס שהיה בישיבה בקרית ארבע ביום השנה ה-20.
              בערב זה הייתה תחושה מרוממת של דיבוק חברים והועלו זכרונות רבים של
              תלמידים מהשנים הראשונות שאבא זצ"ל היה בישיבה בתחילת שנות ה-80.
              <p></p> אני מקווה שהפלטפורמה הזו תסייע לנו להתחבר לישיבה, לתקופה
              ולאבא שכל כך אהב את הישיבה, את קרית ארבע, את התלמידים ואת העשיה
              הלימודית והחברתית נפשית עם התלמידים.
            </div>
            <div>
              <img
                className="border-icon"
                src="Images/border-icon.png"
                alt="border-icon"
              />
            </div>
          </PageCover>
          {pagesArray.map((page) => {
            return (
              <Page
                key={page.key}
                index={page.index}
                number={page.number}
                initialValue="אנא כתוב כאן את זכרונותך..."
                data={memoryData}
              ></Page>
            );
          })}

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
