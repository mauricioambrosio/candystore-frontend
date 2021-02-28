import React, {Component} from "react";
import form from "./common/form";
import {connect} from "react-redux";
import {getFlavors} from "../store/flavors";
import {getProducts} from "../store/products";
import {getCurrentUser} from "../store/auth";
import {addToCart} from "../store/cart";
import { postReview, getReviews } from "../store/reviews";
import Rating from '@material-ui/lab/Rating';

import {Switch} from "antd";
import {Row, Col, Container} from "react-bootstrap";

import ReviewForm from "./reviewForm";
import ReviewCard from "./reviewCard";

import ColoredLine from "./common/coloredLine";


const CUSTOMIZED_ID = 0;

class ProductPage extends Component {
    state = { amount: 1, 
            text:"", 
            score:0,
            showReviews: true };


    async componentDidMount(){
        const pid = parseInt(this.props.match.params.id); 
        await this.props.getReviews(pid);
    }


    handleAddToCart(product){
        this.props.addToCart({...product, flavors:[], amount:this.state.amount});
        this.setState({amount: 1});
    }

    render() { 

        const pid = parseInt(this.props.match.params.id);
        const product = this.props.products.find(product => product.pid === parseInt(pid));
        if (!product) return (window.location = "/");
        
        let totalPrice = product.price * this.state.amount;
         

        const currentProductReviews = this.props.reviews.filter(review => review.pid === pid);
        const reviewRatings = currentProductReviews.map(review => review.score); 

        const avgRating = reviewRatings.reduce((a, b) => a + b, 0) / reviewRatings.length;

        return ( 
            <Container style={{maxWidth:600}}>
                                
                <div>
                    <h3>{product.name+" "} 
                        <span className="badge badge-secondary">
                            {totalPrice.toFixed(2)}
                        </span> 
                        
                    </h3> 
                    
                    {avgRating >= 1 && avgRating <= 5? <Rating
                        name="simple-controlled"
                        value={avgRating}
                        precision={0.1}
                        readOnly
                        // onChange={(event, newValue) => onRate(newValue)}
                    />: null}

                    <ColoredLine color="grey" height={1} />
                         

                    <img className="card-img-top" 
                        src="/images/product_default_image.jpg" 
                        alt="Card image cap" 
                    />
                </div>    
                        
                <div className="card-body text-center">
                    <Row>
                        <input className="rounded mr-4 mb-2" 
                            type="number" 
                            style={{width:60}} 
                            value={this.state.amount} 
                            onChange={({ currentTarget:input }) => {
                                if (input.value >= 1) return this.setState({amount: parseInt(input.value)})
                            }} />                    

                        <button  className="btn btn-primary" 
                            onClick = {()=>this.handleAddToCart(product)}>Add to cart</button>
                    </Row>   
                </div>   


                {/* <button
                  type="button"
                  className="btn btn-link"
                  onClick={async () => {
                    
                    this.setState({
                      showReviews: !this.state.showReviews
                    });
                  }}
                >
                  {!this.state.showReviews ? <div>Reviews</div> : <div>Hide reviews</div>
                  }
                </button> */}

                {this.state.showReviews? <ReviewForm 
                    text={this.state.text} 
                    rating={this.state.score}
                    onChange={e => this.setState({text: e.target.value})} 
                    onRate={(newScore) => {
                        this.setState({score: newScore!==null? newScore: 0})}
                    }   
                    onCancel={()=>this.setState({text:"", score: 0})}                 
                    onSubmit={async () => {
                        const text = this.state.text;
                        const score = this.state.score;
                        this.setState({text:"", score:0});
                        
                        await this.props.postReview({text:text, score:score, pid:parseInt(pid)});
                    }}
                />: null}

                {this.state.showReviews? currentProductReviews.map(review => <ReviewCard key={review._id} data={review}/>): null}
   
            </Container>  );
    }
}
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    products: state.entities.products.list,
    reviews: state.entities.reviews.list
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    addToCart: (product) => dispatch(addToCart(product)),
    postReview: (review) => dispatch(postReview(review)),
    getReviews: (pid) => dispatch(getReviews(pid))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);