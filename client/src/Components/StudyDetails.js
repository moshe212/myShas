import React from "react";
import "./StudyDetails.css";

const StudyDetails = ({ studyDetails }) => {
  // const [isChoose, setIsChoose] = useState(false);

  return (
    <div className="study-details">
      {studyDetails.map((item, index) => (
        <div key={index} className="learn-details">
          <p className="full-name">{item.FullName}</p>
          <p className="chapter-tractate-name">
            <p>{item.ChapterName ? "פרק" : "מסכת"}</p>{" "}
            {item.ChapterName ? item.ChapterName : item.TractateName}
            <p className="in-tractate-name">
              {item.ChapterName ? `במסכת ${item.TractateName}` : ""}
            </p>
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudyDetails;
