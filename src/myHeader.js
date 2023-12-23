import logo from "./logo.svg";
import questionIcon from "./question-icon.png";

export default function MyHeader() {
  return (
    <header>
      <div className="insideHeader">
        <div className="logo">
          <img src={logo} alt="site logo" width="30px" height="30px"></img>
          <h1>Media Search Simplified</h1>
        </div>
        <div className="question">
          <div className="questionIcon">
            <img
              src={questionIcon}
              alt="site logo"
              width="40px"
              height="40px"
            ></img>
          </div>
        </div>
      </div>
    </header>
  );
}
