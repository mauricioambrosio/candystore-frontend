import React, {Component} from "react";
import form from "./common/form";
import {connect} from "react-redux";
import {getFlavors} from "../store/flavors";
import {getProducts} from "../store/products";
import {getCurrentUser} from "../store/auth";
import {addToCart} from "../store/cart";
import {Switch} from "antd";
import {Row, Col, Container} from "react-bootstrap";
import {sortList} from "./common/helpers";

const CUSTOMIZED_ID = 0;

class ProductPage extends Component {
    state = {amount: 1}


    handleAddToCart(product){
        this.props.addToCart({...product, flavors:[], amount:this.state.amount});
        this.setState({amount: 1});
    }

    render() { 
        const pid = this.props.match.params.id;
        const product = this.props.products.find(product => product.pid === parseInt(pid));

        if (!product) return (window.location = "/");

        let totalPrice = product.price * this.state.amount;
         
        return ( 
            <Container className="border rounded shadow p-4" style={{maxWidth:600}}>
                <div>
                    <img className="card-img-top"
                        style={{maxWidth:600}} 
                        src="/images/product_default_image.jpg" 
                        alt="Card image cap" 
                    />
                    <h3 className="mt-3">{`${product.name} ($${totalPrice.toFixed(2)})`}</h3>
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
                            
                <h1>Reviews</h1> 
                
            </Container>  );
    }
}
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    products: state.entities.products.list,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    addToCart: (product) => dispatch(addToCart(product))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);