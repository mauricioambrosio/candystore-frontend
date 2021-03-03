import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";

import Joi from "joi-browser";

import CartItemCard from "./cartItemCard";

import {getProducts} from "../store/products";
import {getFlavors} from "../store/flavors";
import {getCurrentUser, isEmployee} from "../store/auth";

import {postCart, genItemKey} from "../store/cart";

import {clearCart} from "../store/cart";
import {connect} from "react-redux";

import Form from "./common/form";

import FormDatePicker from "./common/formDatePicker";
import ColoredLine from "./common/coloredLine";
import { Redirect } from "react-router-dom";

// string constants
const DELIVERY_ADDRESS = "Delivery address";
const PHONE_NUMBER = "Phone number";
const CREDICT_CARD_NUMBER = "Credit card number"
const EXPIRATION_DAtE = "Expiration date";
const CVV = "CVV"

// the dispatch functions call respective redux dispatch actions
class Cart extends Form {
    state = { 
                data:{ 
                    del_address:"", 
                    phone_number:"", 
                    
                    /* credit card data omitted for current version */ 
                    // cc_number: "", 
                    // cc_expdate: new Date(), 
                    // cc_cvv: "" 
                }, 
                // used to prevent multiple orders from being submitted after first click
                errors:{}, 
                completeEnabled: true 
            };
    
    schema = {
        del_address: Joi.string().max(256).required(),
        phone_number: Joi.string().max(32).required(),

        /* credit card data omitted for current version */
        // cc_number: Joi.string().min(8).max(32).required(),
        // cc_cvv: Joi.string().min(2).max(7).required(),
        // cc_expdate: Joi.date().min(new Date().setDate(new Date().getDate())).required(),        
    };

    // fill delivery address and phone number fields with current user data
    componentDidMount(){
        const currentUser = this.props.currentUser;
        if (currentUser){
            const newState={};
                
            newState.data={
                ...this.state.data, 
                del_address:currentUser.address ? currentUser.address : "",
                phone_number:currentUser.phone_number ? currentUser.phone_number : ""
            }
            
            this.setState(newState);
        }
    }

    render() { 

        const cart = this.props.cart;
        
        if (cart.length < 1) return window.location = "/myorders";
        
        // calculate total price of order.
        // this is only calculated to be displayed in frontend.
        // total price in recalculated in the backend.
        const totalPrice = cart.map(cartItem => cartItem.price * cartItem.amount).reduce((a,b)=>a+b); 
        return ( 
            <Container className="pb-3" style={{maxWidth:600}}>
                <h3>Cart</h3>
                <ColoredLine color="grey" height={1} />
                
                {/* render a cart item card for each order line in cart */}
                {cart.map((cartItem)=>(
                        <CartItemCard 
                            key={genItemKey(cartItem)} 
                            cartItem={cartItem}
                        />                        
                    )
                )}

                {/* show total price */}
                <div className="card mt-3" >
                    <h5 className="card-header"> {"Total ="} <span> {"$"+totalPrice.toFixed(2)} </span></h5>
                </div>
                
                {/* clear cart */}
                <div className="card mt-4 mb-4">
                    <button className="btn-danger rounded p-2"
                        onClick={() => this.props.clearCart()}
                    >
                        <b>Clear cart</b>
                    </button>
                </div>

                {this.renderInput("del_address", DELIVERY_ADDRESS, false)}
                {this.renderInput("phone_number", PHONE_NUMBER, false)}


                {/* credit card data omitted for current version */}

                {/* {this.renderInput("cc_number", CREDICT_CARD_NUMBER, false )}                  
                <FormDatePicker
                    name={"cc_expdate"}
                    value={this.state.data["cc_expdate"]}
                    label={EXPIRATION_DAtE}
                    onChange={(date) => this.handleDatePick("cc_expdate", date, this.state.data.cc_expdate)}
                    error={this.state.errors["cc_expdate"]}
                    picker="month"
                    format="YYYY/MM"
                    disabled={false}
                />
                {this.renderInput("cc_cvv", CVV, false)} */}
               
                <h5 className="text-center">Payment is made with cash upon delivery.</h5>
                

                <div className="card mt-4 mb-3">
                    
                    {/* complete order button */}
                    <button className="btn-primary rounded p-2"
                        disabled={!this.state.completeEnabled}
                        onClick={async () => {
                            
                            // disable button upon click 
                            this.setState({completeEnabled: false});

                            const data = this.state.data;

                            // get required fields for creating orders in backend api
                            const cart = this.props.cart.map(cartItem => ({pid: cartItem.pid, flavors: cartItem.flavors.map(flavor => flavor.fid), amount: cartItem.amount}));
                            
                            let ccard = null; 
                            
                            // if credit data is available add it to ccard to include it in post
                            if (data.cc_number && data.cc_cvv) ccard = {cc_number: data.cc_number, cc_cvv: data.cc_cvv, cc_expdate: data.cc_expdate};
                            
                            await this.props.postCart({cart:cart, ccard:ccard, del_address: data.del_address, phone_number: data.phone_number});
                            // Add code to keep cart from being posted multiple times.

                        }}
                    >
                        <b>Complete order</b>
                    </button>
                </div>

            </Container>
        )    
    }
}
 
// map redux store state to this.props
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    cart: state.entities.cart,
  });
  
// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getFlavors: () => dispatch(getFlavors()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    clearCart: () => dispatch(clearCart()),
    postCart: (cart) => dispatch(postCart(cart))
  });

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(Cart);