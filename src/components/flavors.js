import React, {Component} from "react";
import form from "./common/form";
import {connect} from "react-redux";
import {getFlavors} from "../store/flavors";
import {getProducts} from "../store/products";
import {getCurrentUser} from "../store/auth";
import {addToCart} from "../store/cart";
import {Switch} from "antd";
import {Row, Col, Container} from "react-bootstrap";
import sortList from "./common/sortList";
import ColoredLine from "./common/coloredLine";

const CUSTOMIZED_ID = 0;

class Flavors extends Component {
    state = {addedFlavors:[], amount: 1}

    async componentDidMount(){
        await this.props.getFlavors();
    }

    handleAddToCart(custom, flavors){
        
        const flavorsSorted = sortList(flavors, false, "name");

        const price = custom.price + flavors.map(flavor => flavor.price).reduce((a,b)=>a+b, 0);

        this.props.addToCart({...custom, flavors: flavorsSorted, amount:this.state.amount, price:price});
        this.setState({amount: 1});

    }

    render() { 
        const custom = this.props.products.find(product => product.pid===CUSTOMIZED_ID);
        let totalPrice = custom.price;
        totalPrice += this.state.addedFlavors.map(flavor => flavor.price).reduce((a,b) => a+b, 0);
        totalPrice *= this.state.amount;   
        return ( 
            <Container style={{maxWidth:600}}>

                <h3>Customize</h3>
                <ColoredLine color="grey" height={1} />

                <div>
                    <img className="card-img-top"
                        style={{maxWidth:600}} 
                        src="/images/product_default_image.jpg" 
                        alt="Card image cap" 
                    />
                    <h3 className="mt-3">{`Customize ($${totalPrice.toFixed(2)})`}</h3>
                    
                    {this.props.loading? <h4 className="text-center">Loading...</h4>:null}
                    
                    <Row className="pl-3 mt-3">
                        {this.props.flavors.map((flavor) => {   
                            return (
                                flavor.active? <div key={flavor.fid} className="mr-3">
                                                        
                                    <Switch 
                                    
                                        name={flavor.name}
                                        checked={this.state.addedFlavors.map(flavor=>flavor.fid).includes(flavor.fid)}
                                        onChange={(checked, event) => {
                                            let updatedAddedFlavors = [...this.state.addedFlavors]
                                            
                                            if(checked) {
                                                if(!updatedAddedFlavors.map(flavor=>flavor.fid).includes(flavor.fid)) updatedAddedFlavors.push(flavor);   
                                            }
                                            else {
                                                updatedAddedFlavors = updatedAddedFlavors.filter(f=>f.fid !== flavor.fid);
                                            }
                                            this.setState({addedFlavors: updatedAddedFlavors});
                                        }}
                                    />

                                    {" "}
                                    <label htmlFor={flavor.name}>{`${flavor.name}($${flavor.price})`}</label>
                                    {" "}
                                    
                                </div>: null
                            );   
                        })}
                    </Row>
                </div>    
                        
                <div className="card-body">
                    <Row>
                        <input className="rounded mr-3 mb-2" 
                            type="number" 
                            style={{width:60}} 
                            value={this.state.amount} 
                            onChange={({ currentTarget:input }) => {
                                if (input.value >= 1) return this.setState({amount: parseInt(input.value)})
                            }} />                    

                        <button className="btn btn-primary mb-2" 
                                onClick = {()=>this.handleAddToCart(custom, this.state.addedFlavors)}>
                            Add to cart
                        </button>
                    </Row>   

                </div>    

            </Container>  );
    }
}
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    products: state.entities.products.list,
    loading: state.entities.flavors.loading,
    flavors: state.entities.flavors.list,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getFlavors: () => dispatch(getFlavors()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    addToCart: (product) => dispatch(addToCart(product))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Flavors);