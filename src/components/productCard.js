import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

import {Link} from "react-router-dom";
import {addToCart} from "../store/cart";

import { connect } from "react-redux";

class ProductCard extends Component{
    state = {amount:1}


    handleAddToCart(product){
        this.props.addToCart({...product, flavors:[], amount:this.state.amount});
        this.setState({amount: 1});
    }

    render() { 
        const product = this.props.product;
        const totalPrice = this.state.amount * product.price;

        return (
        <div className="card rounded shadow mb-4 mr-4" style={{width: 200, minWidth:200}}>            
            <Link to={`/productPage/${product.pid}`}>
                <img className="card-img-top" 
                    src="/images/product_default_image.jpg" 
                    alt="Card image cap" 
                    role="button" 
                    // onClick = {() => this.props.history.push({
                    //             pathname: `/productPage/${product.pid}`,
                    //             // state: { newUser: true },
                    //         })}  
                     
                    />
            </Link>
            
            <div className="card-body text-center">
                <h5 className="card-title">{product.name} <span className="badge badge-secondary"> {"$"+totalPrice.toFixed(2)}</span></h5>
                <Col>
                    <button  className="btn btn-primary" 
                    onClick = {
                        ()=>{
                            this.handleAddToCart(product);
                        }
                    }>Add to cart</button>

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

const mapStateToProps = (state) => ({
    cart: state.entities.cart,
  });
  
const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addToCart(product)),
    // updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);