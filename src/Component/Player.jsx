import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const isEditableClickHandler = () => {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };
  const changePlayerNameHandler = (event) => {
    setPlayerName(event.target.value);
  };
  let isEditablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    isEditablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={changePlayerNameHandler}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={isEditableClickHandler}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
};
export default Player;
