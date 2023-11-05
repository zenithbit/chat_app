import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  console.log(potentialChats);
  return (
    <>
      <div className="all-users">
        {potentialChats.map((u, index) => {
          return (
            <div
              className="single-user"
              key={index}
              onClick={() => createChat(user._id, u._id)}
            >
              {u.name}
              <span className="user-online"></span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PotentialChats;
