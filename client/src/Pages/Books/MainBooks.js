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
            <iframe
              id="ytplayer"
              type="text/html"
              width="95%"
              height="405"
              title="youtube_iframe"
              src="https://www.youtube.com/embed/?listType=playlist&list=PLkGN7I5rrj0_fWQoFpmvgPSxS3IAQkK_A"
              frameborder="0"
              allowfullscreen
            ></iframe>
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
          "לקח שלמה – שיעורים והדרכות בענייני מוסר ועבודת ה'". כמו כן אנו נמצאים
          כבר בשיא העריכה של הכתבים הרבים בסוגיות הש”ס ע”י רבני “המכון לרבני
          ישובים”, ולקראת הוצאתו לאור של כרך ראשון על סדר "מועד" אי"ה ביום השנה
          הבא. הננו מברכים את המסייעים לפעילותנו להנצחת רוחו של הרב שלמה ז"ל
          ומקווים בע"ה ע"י תרומתכם להוציא לאור את חיבוריו הנפלאים, אשר הוצאתם
          כרוכה בממון רב, וע"י כך להנציח גם את תורתו דיליה ויהא בבחינת שפתותיו
          דובבות בקבר.
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

export default MainBooks;
