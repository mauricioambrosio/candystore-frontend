import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";

import Joi from "joi-browser";

import CartItemCard from "./cartItemCard";

import {getProducts} from "../store/products";
import {getFlavors} from "../store/flavors";
import {getCurrentUser} from "../store/auth";
import {clearCart} from "../store/cart";
import {connect} from "react-redux";

import Form from "./common/form";

import FormDatePicker from "./common/formDatePicker";

const DELIVERY_ADDRESS = "Delivery address";
const PHONE_NUMBER = "Phone number";
const CREDICT_CARD_NUMBER = "Credit card number"
const EXPIRATION_DAtE = "Expiration date";
const CVV = "CVV"

class Cart extends Form {
    state = { data:{ 
                del_address:"", 
                phone_number:"", 
                cc_number: "", 
                cc_expdate:new Date(), 
                cc_cvv: "" 
            }, errors:{} }
    
    schema = {
        cc_number: Joi.string().min(8).max(32).required(),
        cc_cvv: Joi.string().min(2).max(7).required(),
        cc_expdate: Joi.date().min(new Date().setDate(new Date().getDate())).required(),        
        del_address: Joi.string().max(256).required(),
        phone_number: Joi.string().max(32).required()
    };

    componentDidMount(){
        const currentUser = this.props.currentUser;
        if (currentUser){
            const newState={};
            newState.data={...this.state.data, del_address:currentUser.address,phone_number:currentUser.phone_number}
            this.setState(newState);
        }
    }

    render() { 
        const cart = this.props.cart;
        
        if (cart.length < 1) return (window.location = "/");
        
        const totalPrice = cart.map(cartItem => cartItem.price * cartItem.amount).reduce((a,b)=>a+b); 
        return ( 
            <Container className="border rounded shadow">
                {/* <ul className="list-inline mx-auto justify-content-center"> */}

                    {cart.map((cartItem)=>(
                            <CartItemCard 
                                key={cartItem.pid+cartItem.flavors.toString()} 
                                cartItem={cartItem}
                            />                        
                        )
                    )}

                <div className="card mt-3 mb-5" >
                    <h5 className="card-header"> {"Total ="} <span> {"$"+totalPrice.toFixed(2)} </span></h5>
                </div>




                    {this.renderInput("del_address", DELIVERY_ADDRESS, false)}
                    {this.renderInput("phone_number", PHONE_NUMBER, false)}

                    {this.renderInput("cc_number", CREDICT_CARD_NUMBER, false )}
                                     

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


                    {this.renderInput("cc_cvv", CVV, false)}
                                    
                    <div className="card mt-5 mb-3">
                        <button className="btn-danger rounded p-3"
                            onClick={()=>this.props.clearCart()}
                        >
                            <b>Clear cart</b>
                        </button>
                    </div>

                    <div className="card mt-3 mb-3">
                        <button className="btn-primary rounded p-3"><b>Complete order</b></button>
                    </div>

                {/* </ul> */}
            </Container>
        )    
    }
}
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    cart: state.entities.cart,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getFlavors: () => dispatch(getFlavors()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    clearCart: () => dispatch(clearCart())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Cart);