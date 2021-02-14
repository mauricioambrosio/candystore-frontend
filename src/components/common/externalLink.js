import React from "react";
const ExternalLink = ({ url, label }) => {
    return (<a rel="noopener noreferrer" target="_blank" href={url}>{label}</a>);
}

export default ExternalLink;