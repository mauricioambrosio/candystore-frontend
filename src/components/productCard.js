import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

import {Link} from "react-router-dom";
import {addToCart} from "../store/cart";
import Rating from '@material-ui/lab/Rating';

import {getReviews} from "../store/reviews";

import { connect } from "react-redux";

// the dispatch functions call respective redux dispatch actions
class ProductCard extends Component{
    state = {amount:1}

    async componentDidMount(){
        // call dispatch action function to get reviews of current product from database
        await this.props.getReviews(this.props.product.pid);
    }

    handleAddToCart(product){
        // call dispatch action function to add product to cart
        this.props.addToCart({...product, flavors:[], amount:this.state.amount});
        this.setState({amount: 1});
    }

    render() { 
        const product = this.props.product;
        
        // calculate current price based on amount and product price 
        const totalPrice = this.state.amount * product.price;

        // filter current product reviews from list of all reviews
        const currentProductReviews = this.props.reviews.filter(review => review.pid === product.pid);
        
        // get review scores
        const reviewRatings = currentProductReviews.map(review => review.score); 
        
        // calculate average review score
        const avgRating = reviewRatings.reduce((a, b) => a + b, 0) / reviewRatings.length;


        return (
        <div className="card rounded shadow mb-4 mr-4" style={{width: 240, minWidth:200}}>            
            
            {/* go to product page on click */}
            <Link to={`/productPage/${product.pid}`}>
                <img className="card-img-top" 
                    src="/images/product_default_image.jpg" 
                    alt="Card image cap" 
                    role="button" 
                    />
            </Link>
            
            <div className="card-body text-center">

                {/* go to product page on click */}
                <Link to={`/productPage/${product.pid}`}>
                    <h5 className="card-title">{product.name} <span className="badge badge-secondary"> {"$"+totalPrice.toFixed(2)}</span></h5>
                    {avgRating >= 1 && avgRating <= 5? <Rating
                        name="read-only"
                        value={avgRating}
                        precision={0.1}
                        size="small"
                        readOnly
                    />: null}
                </Link> 
                
                <Col>

                    {/* button to add product to cart */}
                    <button  className="btn btn-primary mr-2" 
                        onClick = {
                            ()=>{
                                this.handleAddToCart(product);
                            }
                    }>Add to cart</button>

                    {/* input to choose amount to be added to cart */}
                    <input className="mt-2 rounded" 
                        type="number" 
                        style={{width:60}} 
                        value={this.state.amount} 
                        onChange={({ currentTarget:input }) => {
                            if (input.value >= 1) return this.setState({amount: parseInt(input.value)})
                        }} />                    
                </Col>   
            </div>

        </div>
        
        );
    }
}

// map redux store state to this.props
const mapStateToProps = (state) => ({
    cart: state.entities.cart,
    reviews: state.entities.reviews.list
  });
  
// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addToCart(product)),
    getReviews: (pid) => dispatch(getReviews(pid))
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);