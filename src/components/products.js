import React, {Component} from "react";
import { getProducts, updateCurrentPage  } from "../store/products";
import { getFlavors} from "../store/flavors";

import { getCurrentUser } from "../store/auth";
import { connect } from "react-redux";
import ProductCard from "./productCard";

import {Container, Grid, Row, Col} from "react-bootstrap";

import ColoredLine from "./common/coloredLine";

import SideBar from "./sideBar";

const CUSTOMIZED_ID = 0;

class Products extends Component {
    state = { 
        currentUser: null,
        products: [],
        flavors:[],
        loading: false
     }

    async componentDidMount() {
        try{
            await this.props.getProducts();
            await this.props.getFlavors();
            await this.props.getCurrentUser();

        } catch(err){
            console.log(err.message)
        }

        this.setState({products: this.props.products});
    }

    render() { 
        
        return (
            <Container className="d-flex justify-content-center">
                <Col>
                    <h3>Menu</h3>

                    <ColoredLine color="grey" height={1} />

                    <Row>
                        {this.state.products
                            .filter(product=>product.pid!==CUSTOMIZED_ID)
                            .map(product => <ProductCard key={product.pid} product={product}/>)} 
                    </Row>
                </Col>
                    
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    products: state.entities.products.list,
    loading: state.entities.products.loading,
    flavors: state.entities.flavors.list,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getFlavors: () => dispatch(getFlavors()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Products);