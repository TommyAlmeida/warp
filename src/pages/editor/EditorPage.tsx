import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Client from "../../components/Client";
import Editor from "../../components/Editor";

//@ts-ignore
import LogoSvg from "../../assets/logo.svg";
import "./EditorPage.css";
import { initSocket } from "../../utils/sockets";
import SocketActions from "../../utils/actions";
import { Socket } from "socket.io-client";

type EditorClient = {
  socketId: string;
  username: string;
};

const EditorPage = () => {
  const socketRef = useRef<Socket | null>();
  const codeRef = useRef("");
  const location = useLocation();
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [clients, setClients] = useState(Array<EditorClient>());

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e: Error) {
        console.log("socket error", e);
        //navigate("/");
      }

      socketRef.current.emit(SocketActions.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };

    init();

    return () => {
      if (!socketRef.current) return;

      socketRef.current.disconnect();
      socketRef.current.off(SocketActions.JOINED);
      socketRef.current.off(SocketActions.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    if (!roomId) return;

    try {
      await navigator.clipboard.writeText(roomId);
    } catch (err) {
      console.error(err);
    }
  }

  function leaveRoom() {
    navigate("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src={LogoSvg} alt="logo" />
          </div>

          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button
          className="btn"
          style={{
            marginBottom: "10px",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={copyRoomId}
        >
          Copy Room Id
        </button>
        <button
          className="btn"
          style={{
            background: "linear-gradient(to right, #E74C3C, #F39C12)",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={leaveRoom}
        >
          Leave Room
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code: string) => {
            if (!codeRef.current) {
              return;
            }

            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
