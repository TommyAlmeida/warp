import React, { useState } from 'react';
import LogoSvg from "../logo.svg";
import './HomePage.css'

const HomePage = () => {

  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");

  const joinRoom = () => {
    console.log("Join room")
  }

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      console.log("Enter room")
    }
  }

  return (
    <>
      <div className="homePageWrapper">
        <div className="formWrapper">
          <div className="homePageLogoWrapper">
            <img className="homePageLogo" src={LogoSvg} />
          </div>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleInputEnter}
            />
            <button className="btn success" onClick={joinRoom}>
              Join
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default HomePage;