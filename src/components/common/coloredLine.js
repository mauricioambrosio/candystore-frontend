import React from "react";

const ColoredLine = ({ color, height }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: height
        }}
    />
);

export default ColoredLine;