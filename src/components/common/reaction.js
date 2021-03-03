import React from "react";

// component to allow user to react with posts
const Reaction = ({ isActive, activeIcon, inactiveIcon, onClick }) => {
  return (
    <>
      {isActive ? (
        <i
          onClick={onClick}
          style={{ cursor: "pointer" }}
          className={activeIcon}
          aria-hidden="true"
        />
      ) : (
        <i
          onClick={onClick}
          style={{ cursor: "pointer" }}
          className={inactiveIcon}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Reaction;
