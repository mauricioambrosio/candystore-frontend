import React, {Component} from "react";
import cart from "./cart";

import {Container, Row, Col} from "react-bootstrap";

import {getProducts} from "../store/products";
import {getFlavors} from "../store/flavors";
import {getCurrentUser} from "../store/auth";
import {removeFromCart, editInCart} from "../store/cart"; 
import {connect} from "react-redux";


class CartItemCard extends Component {
    state = { }


    handleRemoveFromCart(cartItem){
        this.props.removeFromCart(cartItem);
    }

    handleEditInCart(cartItem){
        this.props.editInCart(cartItem);
    }

    render() { 
        const cartItem = this.props.cartItem;
        return ( 
            <div className="card mt-3 mb-3" >
                <h5 className="card-header"> {cartItem.name} <span className="badge badge-secondary">{"$"+cartItem.price.toFixed(2)} </span></h5>
                <div className="card-body">
                    {/* <h6 class="card-title">Special title treatment</h6> */}
                    
                    <h5>{cartItem.flavors.map(flavor=><span className="badge badge-primary p-2 mr-1" key={flavor.fid}>{flavor.name}</span>)}</h5>

                    <div className="d-flex">
                        {/* <a href="#" class="btn btn-danger">Delete</a> */}

                        <div className="mr-auto pr-2 pl-2">
                            <input className="rounded" 
                                type="number" 
                                style={{width:60}} 
                                value={cartItem.amount} 
                                onChange={({ currentTarget:input }) => {
                                    if (input.value >= 1) {
                                        const value = input.value;
                                        this.handleEditInCart({...cartItem, amount:value});
                                        this.setState({amount: parseInt(value)})
                                    }
                                }} />  
                            
                            
                        </div>

                        
                        <div className="p-2">
                            <h5 className="card-text">{"$" + (cartItem.amount * cartItem.price).toFixed(2)}</h5>
                        </div>

                        <div className="p-2">
                            <i className="fa fa-2x text-danger fa-times-circle" 
                                role="button" 
                                aria-hidden="true" 
                                onClick={()=>this.handleRemoveFromCart(cartItem)}/>
                        </div>
                        
                    </div>
                </div>
            </div>

         );
    }
}

const mapStateToProps = (state) => ({
    cart: state.entities.cart,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getFlavors: () => dispatch(getFlavors()),
    removeFromCart: (cartItem) => dispatch(removeFromCart(cartItem)),
    editInCart: (cartItem) => dispatch(editInCart(cartItem))
  });
 
export default connect(mapStateToProps, mapDispatchToProps)(CartItemCard);