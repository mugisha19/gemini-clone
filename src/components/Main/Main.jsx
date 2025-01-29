import { assets } from "../../assets/assets";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Liad</span>
          </p>
          <p>How can i help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautful place to see on an upcoming road trip.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>SBriefly summarize this concept: Urban planning.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of this following code.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
