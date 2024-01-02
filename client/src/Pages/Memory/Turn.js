import React, { useRef, useEffect } from "react";
import $ from "jquery";

const Turn = (props) => {
  let fadeClass = useRef("");

  useEffect(() => {
    if (fadeClass) {
      console.log($(fadeClass).turn);
      $(fadeClass).turn(Object.assign({}, props.options));
    }
    // 	//   document.addEventListener("keydown", handleKeyDown, false);
  }, [props.options]);

  return (
    <div
      className={props.className}
      style={Object.assign({}, props.style)}
      ref={(el) => {
        fadeClass = el;
      }}
    >
      {props.children}
    </div>
  );
};

export default Turn;

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

// export default Turn;
