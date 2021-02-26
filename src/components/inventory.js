import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";

import {getFlavors} from "../store/flavors";
import {getProducts} from "../store/products";
import {getCurrentUser} from "../store/auth";
import { connect } from "react-redux";

class Inventory extends Component {
    state = { 
        product:{pid: "", name:"", price:""},
        flavor:{fid:"", name:"", price:""}
    };

    render() { 
        return ( 
            <Container>
                <h3>Inventory</h3>
                <ColoredLine color="grey" height={1} />

                <Row>
                    <Col>
                        <Container className="border rounded shadow p-4 mb-4"> 
                            <h4 className="mb-4">Update Products</h4>

                            <input className="rounded mb-2" 
                                type="number" 
                                style={{width:100}} 
                                value={this.state.product.pid} 
                                placeholder="Product id"
                                readOnly/>
                            <br/>


                            <input className="w-100 rounded mb-2"
                                value={this.state.product.name}
                                placeholder="Name"
                                onChange={(e)=>{
                                    const product = {...this.state.product};
                                    product.name = e.target.value;
                                    this.setState({product});
                                }}
                            />
                            <br/>

                            <input className="rounded mb-2"
                                placeholder="$Price"
                                style={{width:100}}
                                value={this.state.product.price}
                                type="number"
                                onChange={(e)=>{
                                    const product = {...this.state.product};
                                    product.price = e.target.value;
                                    this.setState({product});
                                }}
                            />

                            <br/>

                            <div className="mb-2">
                                <button className="btn btn-primary mb-2 mr-2" 
                                    onClick = {()=>{}}>
                                    Add
                                </button>

                                <button className="btn btn-primary mb-2 mr-2" 
                                    onClick = {()=>{}}>
                                    Update
                                </button>

                                <button className="btn btn-danger mb-2" 
                                    onClick = {()=>{}}>
                                    Delete
                                </button>
                            </div>

                            {this.props.products.map(product => 
                                <div className="w-100 border rounded mb-2 p-1" 
                                    type="button"
                                    key={product.pid}
                                    onClick = {()=>{
                                        const selectedProduct = {pid: product.pid, name: product.name, price: product.price};
                                        this.setState({product: selectedProduct});
                                    }}
                                >
                                    <h6>
                                        {product.pid + " - " + product.name + ": $" + product.price}
                                    </h6>
                                </div>
                            )}

                            

                        </Container>
                    </Col>
                    <Col>
                        <Container className="border rounded shadow p-4 mb-4"> 
                            <h4 className="mb-4">Update Flavors</h4>

                            <input className="rounded mb-2" 
                                placeholder="Flavor id"
                                type="number" 
                                style={{width:100}} 
                                value={this.state.flavor.fid} 
                                readOnly
                            />                                
                            <br/>

                            <input className="w-100 rounded mb-2"
                                placeholder="Name"
                                value={this.state.flavor.name}
                                onChange={(e)=>{
                                    const flavor = {...this.state.flavor};
                                    flavor.name = e.target.value;
                                    this.setState({flavor});
                                }}
                            />
                            <br/>

                            <input className="rounded mb-2"
                                placeholder="$Price"
                                style={{width:100}}
                                value={this.state.flavor.price}
                                type="number"
                                onChange={(e)=>{
                                    const flavor = {...this.state.flavor};
                                    flavor.price = e.target.value;
                                    this.setState({flavor});
                                }}
                            />

                            <br/>

                            <div className="mb-2">

                                <button className="btn btn-primary mb-2 mr-2" 
                                    onClick = {()=>{}}>
                                    Add
                                </button>

                                <button className="btn btn-primary mb-2 mr-2" 
                                    onClick = {()=>{}}>
                                    Update
                                </button>
                                
                                <button className="btn btn-danger mb-2" 
                                    onClick = {()=>{}}>
                                    Delete
                                </button>
                            </div>

                            {this.props.flavors.map(flavor => 
                                <div className="w-100 border rounded mb-2 p-1" 
                                    key={flavor.fid} 
                                    type="button"
                                    onClick={()=>{
                                        const selectedFlavor = {fid: flavor.fid, name: flavor.name, price: flavor.price};
                                        this.setState({flavor: selectedFlavor});
                                    }}
                                >
                                    <h6>{flavor.fid + " - " + flavor.name + ": $" + flavor.price}</h6>
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
    getFlavors: () => dispatch(getFlavors()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);