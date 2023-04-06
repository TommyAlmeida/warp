const Client = ({ username }: { username: string }) => {
  return (
    <div className="client">
      <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
