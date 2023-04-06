import { EditorClient } from "../utils/types";
import Client from "./Client";

const ClientList = ({
  clients,
}: {
  clients: Array<EditorClient> | undefined;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {clients &&
        clients.map((client) => (
          <Client key={client.socketId} username={client.username} />
        ))}
    </div>
  );
};

export default ClientList;
