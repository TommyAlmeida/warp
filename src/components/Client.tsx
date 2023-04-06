import { createImageFromInitials, getRandomColor } from "../utils/Avatar";

const Client = ({ username }: { username: string }) => {
  let imgSrc = "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontWeight: "bold",
      }}
    >
      <img
        style={{ borderRadius: "10%" }}
        src={
          imgSrc.length <= 0
            ? createImageFromInitials(50, username, getRandomColor())
            : imgSrc
        }
        alt="profile-pic"
      />
      <span style={{ marginTop: "10px" }}>{username}</span>
    </div>
  );
};

export default Client;
