import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";
// import {getOrders} from "../store/myOrders";
import {getCurrentUser} from "../store/auth";
import {getOrders} from "../store/orders";
import OrderCard from "./orderCard";
import {connect} from "react-redux";
import {isEmployee} from "../store/auth";

class Orders extends Component {
    state = {  }

    async componentDidMount() {
        window.scrollTo(0, 0);
        try {
            await this.props.getOrders();
        } catch (err) {
            
            console.log(err);
            return (window.location = "/");
        }
    }

    render() { 
        if (!isEmployee()) return (window.location = "/");
        
        return (             
            <Container style={{maxWidth:600}}>
                <h3>Orders</h3>
                <ColoredLine color="grey" height={1} />
                
                {this.props.orders.map((order) => {
                    return (<OrderCard key={order.uoid} order={order} employeeOps={true}/>);
                })}

            </Container>
        );
    }
}
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    orders: state.entities.orders.list,
    loading: state.entities.myOrders.loading,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrders()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
