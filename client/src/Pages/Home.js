import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import BizTicker from "../Components/Ticker";
import ChoosBox from "../Components/ChoosBox";
import ProgressBar from "../Components/ProgressBar";
import AnchorLink from "react-anchor-link-smooth-scroll";
import StudyDetails from "../Components/StudyDetails";
import "./Home.css";

const Home = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState([]);
  const [studyDetails, setStudyDetails] = useState([]);
  const { id } = useParams();
  console.log(id);
  // console.log(starCount);

  let history = useHistory();

  function handleClick() {
    history.push("/mainBooks");
  }

  const handelAvailable = (newValue) => {
    console.log("isAvailable", newValue);
    setIsAvailable(newValue);
  };

  useEffect(() => {
    axios
      .post("/api/getAllShas")
      .then(function (response) {
        setData(response.data);
        console.log("response.data", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isAvailable]);

  useEffect(() => {
    axios
      .post("/api/getStudyDetails")
      .then(function (response) {
        setStudyDetails(response.data);
        console.log("Studydata", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="ProjectRoot">
      <div className="ProjectHeader ">
        <div className="TickerRoot">
          <div className="header-grid-container">
            <img
              className="item1"
              src="/Images/book.png"
              alt=""
              onClick={handleClick}
            ></img>

            <div className="item2">חלוקת הש"ס</div>
            <AnchorLink
              offset={() => 250}
              className="item3"
              href="#TextOnProject"
            >
              אודות הפרוייקט
            </AnchorLink>
            <AnchorLink
              offset={() => 250}
              className="item4"
              href="#counter_text"
            >
              מצב נוכחי
            </AnchorLink>
            <div className="item5" onClick={handleClick}>
              הספרים
            </div>
            <AnchorLink
              offset={() => 250}
              className="item6"
              href="#ChoiseFlexContainer"
            >
              הצטרף עכשיו
            </AnchorLink>
            <div className="books-phone-view-btn" onClick={handleClick}>
              הספרים
            </div>
          </div>
          {/* <BizTicker /> */}
        </div>
      </div>
      <img className="ProjectImg" src="/Images/design4plus.jpg" alt=""></img>
      {/* <div className="donate">תרומה</div> */}
      <div className="ProjectDetails">
        {data && (
          <div className="ChoiseFlexContainer" id="ChoiseFlexContainer">
            <img
              className="ChoiseFlexContainerImg"
              src="/Images/backgroundForPhone.jpg"
              alt=""
            ></img>
            <ChoosBox
              chosen="masechet"
              stateBtn={handelAvailable}
              isAvailableBtn={isAvailable}
              data={data}
            />
            <ChoosBox
              chosen="chapter"
              stateBtn={handelAvailable}
              isAvailableBtn={isAvailable}
              data={data}
            />
            <ChoosBox
              chosen="paper"
              stateBtn={handelAvailable}
              isAvailableBtn={isAvailable}
              data={data}
            />
          </div>
        )}
        <div className="progressRoot">
          <ProgressBar data={data} />
        </div>

        <div className="ProjectText">
          <div className="TextOnProject" id="TextOnProject">
            <p className="TextOnProject_P">
              הרב שלמה אנסבכר ז"ל נולד בשנת תש"ה, בשבת בה הגיע למצוות קראו בתורה
              בסדר "אם בחוקותיי תלכו" שעל זה פ'רש"י : "שתהיו עמלים בתורה". ציווי
              זה קיים הרב שלמה ז"ל במשך כל שנות חייו בדרכים שונות.<br></br>
              <br></br> בצעירותו שקד על התורה בישיבת פוניבז' , שם קנה את צורת
              הלימוד בעיון. לאחר מכן מסיבות שונות נאלץ לעזוב את ספסלי בית המדרש
              ויצא לשנים ארוכות של עמל כפיים. תקופה זו בעולם המעשה שבה חלם
              והתמיד בכיסופיו לחזור לעולמה של תורה, עולם "השכל הטהור" כלשונו,
              תרמה רבות הן לתורתו והן ליכולתו להקשיב, להבין ולייעץ לתלמידיו.
              ואכן בשנת תש"מ זכה להגשים את חלומו והחל ללמוד בישיבת "ניר קריית
              ארבע" ולאחר מספר שנים נתבקש לשמש בהוראה בישיבה.<br></br>
              <br></br> הרב שלמה ז"ל התייגע מאוד על הכנת כל שיעור ושיעור, הוא
              התבטא פעם שיכולותיו בינוניות ולכן נדרש ממנו מעבר ליכולתו. הוא היה
              יושב ומתעמק בספרים עד השעות הקטנות של הלילה, ולמחרת היה מלבן את
              הדברים עם החברותא (אחד מתלמידיו) ולאחר שהשיעור היה מסודר במוחו היה
              מעלה אותו על הכתב ומעבירו לתלמידיו.<br></br>
              <br></br> כך נהג במשך כ-20 שנה עד כט' בטבת ה'תשס"ג עת החזיר נשמתו
              לבוראו.<br></br>
              <br></br> הרב שלמה ז"ל כל כך אהב את לימוד הגמרא והיה שקוע בה רוב
              ימיו, גם ממיטת חוליו אהב לדון בסוגיות הש"ס עם מבקריו. לקראת יום
              השנה ה-20 לפטירתו ברצוננו לסיים ש"ס בבלי לעילוי נשמתו ונשמח אם
              תוכלו לקחת חלק במפעל חשוב זה .{" "}
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="study-list">
            <StudyDetails studyDetails={studyDetails} />
          </div>
          <div className="all-rights-reserved">
            <p>כל הזכויות שמורות ל- DreamApp</p>
            <p>052-3587990</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
