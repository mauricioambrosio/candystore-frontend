import React from "react";

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
