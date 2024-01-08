import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./MainBooks.css";
// import Modal from "react-animated-modal";
import { Modal, Button } from "antd";

const MainBooks = () => {
  const [visible, setVisible] = useState(false);
  const [bookId, setBookId] = useState("");
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }

  function handleClickMemories() {
    history.push("/memories");
  }

  function goToCharidy() {
    history.push("/charidy");
  }

  return (
    <div className="main">
      <div>
        <Modal
          // title="Modal 1000px width"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={"80%"}
          footer={[]}
        >
          {bookId === "lekachSholomo" ? (
            <iframe
              allowFullScreen="allowFullScreen"
              scrolling="no"
              className="fp-iframe"
              style={{
                border: "1px solid lightgray",
                width: "100%",
                height: "100vh",
              }}
              title="title"
              src="https://heyzine.com/flip-book/cda3ae9d0c.html"
            ></iframe>
          ) : bookId === "zichronShlomo" ? (
            <div className="modal-zichronShlomo">
              .לצערנו לא הצלחנו למצוא את הקבצים של ספר זה. ניתן לקבל ספר זה
              בדואר
            </div>
          ) : bookId === "Disk" ? (
            <div>
              <h2>דיסק לקח שלמה - שיעורים במוסר, אמונה ופסיכולוגיה</h2>{" "}
              <iframe
                id="Disk_iframe"
                type="text/html"
                width="95%"
                height="405"
                title="דיסק לקח שלמה - שיעורים במוסר, אמונה ופסיכולוגיה"
                src="https://www.youtube.com/embed/?listType=playlist&list=PLkGN7I5rrj0_fWQoFpmvgPSxS3IAQkK_A"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          ) : bookId === "Azkara" ? (
            <div>
              <h2>סיום שס ואזכרה במלאת 20 שנה</h2>{" "}
              <iframe
                id="Azkara_iframe"
                type="text/html"
                width="95%"
                height="405"
                title="סיום שס ואזכרה במלאת 20 שנה"
                src="https://www.youtube.com/embed/?listType=playlist&list=PLkGN7I5rrj0884r1qmlRw0UbyqojRhLiT"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          ) : null}
        </Modal>
      </div>
      <div className="main-books-header-grid-container">
        <img
          className="main-books-item1"
          src="/Images/book.png"
          alt=""
          onClick={handleClick}
        ></img>

        <div className="main-books-item2">הספרים</div>
        <div className="main-books-item3" onClick={handleClickMemories}>
          זכרונות
        </div>
        <div className="main-books-item6" onClick={goToCharidy}>
          היה שותף
        </div>
      </div>
      <div className="center">
        <div className="details">
          ידוע שהתורה שבכתב הינה תורה כללית השייכת לכלל עם ישראל, ואילו התורה
          שבע"פ היא המקום בו כל ת"ח מוצא את ביטויו ואת הזווית המיוחדת לו בהארת
          התורה. חלקו המיוחד של הרב שלמה ז"ל בא לידי ביטוי בכתבים הרבים שהותיר
          אחריו, החל בשיעורי הגמרא שהעביר במשך כ-20 שנות שימושו כר”מ בישיבה וכלה
          בשיעורי מחשבה, מוסר, אמונה ופסיכולוגיה. הכתבים יצאו לאור בע"ה בשתי
          מערכות: א. אמונה, מוסר והשקפה. ב. עיונים בסוגיות הש"ס. בסיעתא דשמיא
          והודות לכם זכינו להוציא לאור (בכמות מצומצמת) את המהדורה הראשונה של ספר
          "לקח שלמה – שיעורים והדרכות בענייני מוסר ועבודת ה'". כמו כן ב"ה זכינו
          להוציא לאור את הכרך הראשון בסדרת שיעורי העיון וכעת אנו נמצאים כבר בשיא
          העריכה של הכרכים הבאים בסוגיות הש”ס. הננו מברכים את המסייעים לפעילותנו
          להנצחת רוחו של הרב שלמה ז"ל ומקווים בע"ה ע"י תרומתכם להוציא לאור את
          חיבוריו הנפלאים, אשר הוצאתם כרוכה בממון רב, וע"י כך להנציח גם את תורתו
          דיליה ויהא בבחינת שפתותיו דובבות בקבר.
        </div>
        <div className="bookshelf">
          <div className="shelf">
            <div className="row-1">
              <div className="booksImgs">
                <img
                  className="lekachSholomo"
                  onClick={() => {
                    setVisible(true);
                    setBookId("lekachSholomo");
                  }}
                  src="/Images/lekachShlomo.jpeg"
                  alt=""
                ></img>
                <img
                  className="zichronShlomo"
                  onClick={() => {
                    setVisible(true);
                    setBookId("zichronShlomo");
                  }}
                  src="/Images/zichronShlomo.jpeg"
                  alt=""
                ></img>
              </div>

              <img
                className="bookshelf"
                src="/Images/wall-bookshelf.png"
                alt=""
              ></img>
            </div>
            <div className="row-2">
              <div className="booksImgs">
                <img
                  className="Disk"
                  onClick={() => {
                    setVisible(true);
                    setBookId("Disk");
                  }}
                  src="/Images/Disk.jpg"
                  alt=""
                ></img>
                <img
                  className="Azkara"
                  onClick={() => {
                    setVisible(true);
                    setBookId("Azkara");
                  }}
                  src="/Images/Azkara.png"
                  alt=""
                ></img>
              </div>

              <img
                className="bookshelf"
                src="/Images/wall-bookshelf.png"
                alt=""
              ></img>
            </div>
          </div>
          <p>* ניתן ללחוץ על האייקונים של הספרים\דיסק בכדי לקרוא\לשמוע</p>
        </div>
      </div>

      <div className="footer">
        <img
          className="footerImg"
          src="/Images/booksBackground.jpg"
          alt=""
        ></img>
        <div className="all-rights-reserved">
          <p>כל הזכויות שמורות ל- DreamApp</p>
          <p>052-3587990</p>
        </div>
      </div>
    </div>
  );
};

// import HTMLFlipBook from "react-pageflip";
// import { PageFlip } from "page-flip";
// import "./MainBook2.css";

// document.addEventListener("DOMContentLoaded", function () {
//   const pageFlip = new PageFlip(document.getElementById("demoBookExample"), {
//     width: 550, // base page width
//     height: 733, // base page height

//     size: "stretch",
//     // set threshold values:
//     minWidth: 315,
//     maxWidth: 1000,
//     minHeight: 420,
//     maxHeight: 1350,

//     maxShadowOpacity: 0.5, // Half shadow intensity
//     showCover: true,
//     mobileScrollSupport: false, // disable content scrolling on mobile devices
//   });

//   // load pages
//   pageFlip.loadFromHTML(document.querySelectorAll(".page"));

//   document.querySelector(".page-total").innerText = pageFlip.getPageCount();
//   document.querySelector(".page-orientation").innerText =
//     pageFlip.getOrientation();

//   document.querySelector(".btn-prev").addEventListener("click", () => {
//     pageFlip.flipPrev(); // Turn to the previous page (with animation)
//   });

//   document.querySelector(".btn-next").addEventListener("click", () => {
//     pageFlip.flipNext(); // Turn to the next page (with animation)
//   });

//   // triggered by page turning
//   pageFlip.on("flip", (e) => {
//     document.querySelector(".page-current").innerText = e.data + 1;
//   });

//   // triggered when the state of the book changes
//   pageFlip.on("changeState", (e) => {
//     document.querySelector(".page-state").innerText = e.data;
//   });

//   // triggered when page orientation changes
//   pageFlip.on("changeOrientation", (e) => {
//     document.querySelector(".page-orientation").innerText = e.data;
//   });
// });

// function MainBooks(props) {
//   return (
//     //     <div>
//     //       <div class="container">
//     //         <div>
//     //           <button type="button" class="btn-prev">
//     //             Previous page
//     //           </button>
//     //           [<span class="page-current">1</span> of{" "}
//     //           <span class="page-total">-</span>]
//     //           <button type="button" class="btn-next">
//     //             Next page
//     //           </button>
//     //         </div>

//     //         <div>
//     //           State: <i class="page-state">read</i>, orientation:{" "}
//     //           <i class="page-orientation">landscape</i>
//     //         </div>
//     //       </div>

//     //       <div class="container">
//     //         <div class="flip-book" id="demoBookExample">
//     //           <div class="page page-cover page-cover-top" data-density="hard">
//     //             <div class="page-content">
//     //               <h2>BOOK TITLE</h2>
//     //             </div>
//     //           </div>
//     //           <div class="page">
//     //             <div class="page-content">
//     //               <h2 class="page-header">Page header 1</h2>
//     //               <div
//     //                 class="page-image"
//     //                 style="background-image: url(images/html/1.jpg)"
//     //               ></div>
//     //               <div class="page-text">
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna. Aliquam
//     //                 ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
//     //                 non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna.
//     //               </div>
//     //               <div class="page-footer">2</div>
//     //             </div>
//     //           </div>

//     //           <div class="page">
//     //             <div class="page-content">
//     //               <h2 class="page-header">Page header - 15</h2>
//     //               <div
//     //                 class="page-image"
//     //                 style="background-image: url(images/html/7.jpg)"
//     //               ></div>
//     //               <div class="page-text">
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna. Aliquam
//     //                 ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
//     //                 non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna.
//     //               </div>
//     //               <div class="page-footer">16</div>
//     //             </div>
//     //           </div>
//     //           <div class="page">
//     //             <div class="page-content">
//     //               <h2 class="page-header">Page header - 16</h2>
//     //               <div
//     //                 class="page-image"
//     //                 style="background-image: url(images/html/8.jpg)"
//     //               ></div>
//     //               <div class="page-text">
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna. Aliquam
//     //                 ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
//     //                 non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
//     //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
//     //                 cursus mollis nibh, non convallis ex convallis eu. Suspendisse
//     //                 potenti. Aenean vitae pellentesque erat. Integer non tristique
//     //                 quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
//     //                 velit viverra metus, a venenatis tellus tellus id magna.
//     //               </div>
//     //               <div class="page-footer">17</div>
//     //             </div>
//     //           </div>
//     //           <div class="page page-cover page-cover-bottom" data-density="hard">
//     //             <div class="page-content">
//     //               <h2>THE END</h2>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     <HTMLFlipBook width={300} height={500}>
//       <div className="demoPage">Page 1</div>
//       <div className="demoPage">Page 2</div>
//       <div className="demoPage">Page 3</div>
//       <div className="demoPage">Page 4</div>
//     </HTMLFlipBook>
//   );
// }

export default MainBooks;
