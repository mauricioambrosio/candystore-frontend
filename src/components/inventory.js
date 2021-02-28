import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";

import {isEmployee} from "../store/auth";

import {getFlavors, postFlavor, editFlavor, deleteFlavor} from "../store/flavors";
import {getProducts, postProduct, editProduct, deleteProduct} from "../store/products";

import {getCurrentUser} from "../store/auth";
import InventoryForm from "./inventoryForm";

import { connect } from "react-redux";


class Inventory extends Component {
    state = { 
        product:{pid:"", name:"", price:"", active:""},
        flavor:{fid:"", name:"", price:"", active:""}
    };

    async componentDidMount() {
        try{
            await this.props.getProducts();
            await this.props.getFlavors();

        } catch(err){
            console.log(err.message)
        }
    }

    handleChange(entity, field, value){
        const newState = {...this.state};
        newState[entity][field] = value;
        this.setState(newState);
    }

    handleClear(entity, idField){
        const newState = {...this.state};
        newState[entity][idField] = "";
        newState[entity].name = "";
        newState[entity].price = "";
        newState[entity].active = "";
        this.setState(newState);
    }

    render() { 
        if (!isEmployee()) return (window.location = "/");

        return ( 
            <Container>
                <h3>Inventory</h3>
                <ColoredLine color="grey" height={1} />

                <Row>
                    <Col>
                        <Container className="border rounded p-4 mb-4">
                            <InventoryForm 
                                entity="product"
                                header="Update Products"
                                idField="pid"
                                value={this.state.product}
                                post={this.props.postProduct}
                                edit={this.props.editProduct}
                                delete={this.props.deleteProduct}
                                handleChange={(entity, field, value) => this.handleChange(entity, field, value)}
                                handleClear={(entity, idField) => this.handleClear(entity, idField)}
                            />

                            {this.props.products.map(product => 
                                <div className="w-100 border rounded mb-3 pl-2 pt-2" 
                                    type="button"
                                    key={product.pid}
                                    onClick = {()=>{
                                        
                                        this.setState({product: {pid: product.pid, name: product.name, price: product.price, active: product.active}});
                                    }}
                                >
                                    <h6>
                                        {product.pid + " - " + product.name + ": $" + product.price + " (" + (product.active?"active":"deleted") + ")"}
                                    </h6>
                                </div>
                            )}

                        </Container>
                    </Col>
                    <Col>
                        <Container className="border rounded p-4 mb-4"> 
                            <InventoryForm 
                                entity="flavor"
                                header="Update Flavors"
                                idField="fid"
                                value={this.state.flavor}
                                post={this.props.postFlavor}
                                edit={this.props.editFlavor}
                                delete={this.props.deleteFlavor}
                                handleChange={(entity, field, value) => this.handleChange(entity, field, value)}
                                handleClear={(entity, idField) => this.handleClear(entity, idField)}
                            />

                            {this.props.flavors.map(flavor => 
                                <div className="w-100 border rounded mb-3 pl-2 pt-2" 
                                    key={flavor.fid} 
                                    type="button"
                                    onClick={()=>{
                                        
                                        this.setState({flavor: {fid: flavor.fid, name: flavor.name, price: flavor.price, active: flavor.active}});
                                    }}
                                >
                                    <h6>{flavor.fid + " - " + flavor.name + ": $" + flavor.price + " (" + (flavor.active?"active":"deleted") + ")"}</h6>
                                </div>
                            )}

                        </Container>                            
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    products: state.entities.products.list,
    flavors: state.entities.flavors.list,
    productsLoading: state.entities.products.loading,
    flavorsLoading: state.entities.flavors.loading,
    // ingredientsLoading: state.entities.ingredients.loading,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    postProduct: (product) => dispatch(postProduct(product)),
    editProduct: (product) => dispatch(editProduct(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    
    getFlavors: () => dispatch(getFlavors()),
    postFlavor: (flavor) => dispatch(postFlavor(flavor)),
    editFlavor: (flavor) => dispatch(editFlavor(flavor)),
    deleteFlavor: (flavor) => dispatch(deleteFlavor(flavor)),
    
    getCurrentUser: () => dispatch(getCurrentUser()),

  });

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);