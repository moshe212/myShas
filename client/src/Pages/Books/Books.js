// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import $ from "jquery";
// import "turn.js";

// import "./styles.css";

// class Turn extends React.Component {
//   static defaultProps = {
//     style: {},
//     className: "",
//     options: {},
//   };

//   componentDidMount() {
//     if (this.el) {
//       $(this.el).turn(Object.assign({}, this.props.options));
//     }
//     document.addEventListener("keydown", this.handleKeyDown, false);
//   }

//   componentWillUnmount() {
//     if (this.el) {
//       $(this.el).turn("destroy").remove();
//     }
//     document.removeEventListener("keydown", this.handleKeyDown, false);
//   }

//   handleKeyDown = (event) => {
//     if (event.keyCode === 37) {
//       $(this.el).turn("previous");
//     }
//     if (event.keyCode === 39) {
//       $(this.el).turn("next");
//     }
//   };

//   render() {
//     return (
//       <div
//         className={this.props.className}
//         style={Object.assign({}, this.props.style)}
//         ref={(el) => (this.el = el)}
//       >
//         {this.props.children}
//       </div>
//     );
//   }
// }

// const options = {
//   width: 800,
//   height: 600,
//   autoCenter: true,
//   display: "double",
//   acceleration: true,
//   elevation: 50,
//   gradients: !$.isTouch,
//   when: {
//     turned: function (e, page) {
//       console.log("Current view: ", $(this).turn("view"));
//     },
//   },
// };

// const pages = [
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg",
// ];

// const Books = () => {
//   return (
//     <Turn options={options} className="magazine">
//       {pages.map((page, index) => (
//         <div key={index} className="page">
//           <img src={page} alt="" />
//         </div>
//       ))}
//     </Turn>
//   );
// };

// export default Books;

//----------------------------------------------
import React, { useEffect } from "react";
import $ from "jquery";
import "turn.js";
import { useParams } from "react-router-dom";
import "./styles.css";

import Turn from "./Turn.js";

const options = {
  // width: 1100,
  // height: 850,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function (e, page) {
      console.log("Current view: ", $(this).turn("view"));
    },
  },
};

// const pages = [
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg",
// ];

const Books = () => {
  const { bookId } = useParams();
  console.log(bookId);
  const pagesNum = 250;
  const pages = [];
  for (let i = 1; i < pagesNum + 1; i++) {
    pages.push(`/Images/${bookId}/(${i}).jpg`);
  }
  return (
    <div className="bookRoot">
      {/* <Turn options={options} className="" id="book">
        {pages.map((page, index) => (
          <div key={index} className="page">
            <img src={page} alt="" />
          </div>
        ))}
      </Turn> */}
      <iframe
        allowFullScreen="allowFullScreen"
        scrolling="no"
        className="fp-iframe"
        style={{
          border: "1px solid lightgray",
          width: "100%",
          height: "100vh",
        }}
        src="https://heyzine.com/flip-book/cda3ae9d0c.html"
      ></iframe>
    </div>
  );
};

export default Books;
