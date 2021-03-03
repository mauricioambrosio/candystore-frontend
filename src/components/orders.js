import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";
// import {getOrders} from "../store/myOrders";
import {getCurrentUser} from "../store/auth";
import {getOrders} from "../store/orders";
import OrderCard from "./orderCard";
import {connect} from "react-redux";
import {isEmployee} from "../store/auth";

// list of orders
class Orders extends Component {
    state = {  }

    async componentDidMount() {
        window.scrollTo(0, 0);
        try {
            // call redux dispatch function action 
            await this.props.getOrders();
        } catch (err) {
            
            console.log(err);
            return (window.location = "/");
        }
    }

    render() { 
        // if no employee is authenticated, go to home page
        if (!isEmployee()) return (window.location = "/");
        
        return (             
            <Container style={{maxWidth:600}}>
                <h3>Orders</h3>
                <ColoredLine color="grey" height={1} />
                
                {/* render order card for each order */}
                {this.props.orders.map((order) => {
                    return (<OrderCard key={order.uoid} order={order} employeeOps={true}/>);
                })}

            </Container>
        );
    }
}
 
// map redux store state to this.props
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    orders: state.entities.orders.list,
    loading: state.entities.myOrders.loading,
  });

// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrders()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  });

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
