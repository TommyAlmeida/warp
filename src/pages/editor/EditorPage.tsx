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
import { Socket } from "socket.io-client";
import { EditorClient } from "../../utils/types";
import ClientList from "../../components/ClientList";

const EditorPage = () => {
  const socketRef = useRef<Socket | null>();
  const codeRef = useRef("");
  const location = useLocation();
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [clients, setClients] = useState(Array<EditorClient>());

  function addClient(newClient: EditorClient) {
    setClients((prevClients) => {
      const clientExists = prevClients.some(
        (client) => client.username === newClient.username
      );

      if (!clientExists) {
        return [...prevClients, newClient];
      }

      return prevClients;
    });
  }

  useEffect(() => {
    addClient({ socketId: "Tomas", username: "Tomas" } as EditorClient);
    console.log("clients", clients);
  }, []);

  async function debug() {
    console.log("clients", clients);
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

          <ClientList clients={clients} />
        </div>
        <button
          className="btn"
          style={{
            marginBottom: "10px",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={debug}
        >
          JA ME ESTOU A PASSAR ESTA MERDA NAO FUNCIONA
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
