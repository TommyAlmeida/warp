const Client = ({ username }: { username: string }) => {
  let imgSrc = "";

  //TODO: O REPLIT NAO LE ESTA MERDA NUM FICHEIRO A PARTE
  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const getInitials = (name: string) => {
    let initials;

    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;

    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) +
        nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
  };

  const createImageFromInitials = (
    size: number,
    name: string | undefined,
    color: string
  ) => {
    if (!name) return;

    name = getInitials(name);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = canvas.height = size;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);

    context.fillStyle = `${color}50`;
    context.fillRect(0, 0, size, size);

    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = `${size / 2}px Roboto`;

    context.fillText(name!, size / 2, size / 2);

    return canvas.toDataURL();
  };

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
