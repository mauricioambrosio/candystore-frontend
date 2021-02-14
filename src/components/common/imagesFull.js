import React, {Component} from "react";
import ImageSlides from "react-imageslides";
import { withRouter } from "react-router-dom";

function ImagesFull(props) {
    let images = [];
    let index = 1;

    if(props.location && props.location.state && props.location.state.images){
        images = props.location.state.images;
        
        const currentImage = props.location.state.currentImage + 1;
        index = currentImage >= 1 && currentImage <= images.length ? currentImage : 1; 
    }

    else return (window.location = "/"); 
    
    return ( <ImageSlides images={images} index={index} isOpen showPageButton /> );
}

export default withRouter(ImagesFull);
