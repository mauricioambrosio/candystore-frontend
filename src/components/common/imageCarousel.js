import React, {Component} from "react";
import Carousel from 'react-bootstrap/Carousel';
import {withRouter} from "react-router-dom";

class ImageCarousel extends Component{
    render(){
        const multiple = this.props.imageList.length > 1;
        
        return ( 
            <Carousel interval={this.props.interval} 
                controls = {multiple?true:false}
                indicators = {multiple?true:false} 
            >
                {this.props.imageList.map((image, index) => (
                    <Carousel.Item 
                        key = {image} 
                        onClick = {() => {
                            return this.props.history.push({
                                pathname: "/imagesFull",
                                state: {images: this.props.imageList, currentImage:index}
                            });
                        }}
                    >
                        <img
                            className = "d-block w-100"
                            src = {image}
                            alt = "Card cap"
                        />
                    </Carousel.Item>
                ))}
            </Carousel> );
    }
}
 
export default withRouter(ImageCarousel);