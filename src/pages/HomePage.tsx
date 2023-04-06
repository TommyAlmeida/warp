import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import "./HomePage.css";

//@ts-ignore
import LogoSvg from "../assets/logo.svg";

const HomePage = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");

  const createNewRoom = (e: any) => {
    e.preventDefault();
    const id = uuidV4();

    setRoomId(id);
  };

  const joinRoom = () => {
    if (!roomId || !email) {
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        email,
      },
    });
  };

  const handleInputEnter = (e: any) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

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
            <span className="createInfo">
              If you don't have an invite then create &nbsp;
              <a onClick={createNewRoom} href="" className="newRoomBtn">
                new room
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
