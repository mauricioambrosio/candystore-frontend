import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";
import {getMyOrders} from "../store/myOrders";
import {getCurrentUser, isEmployee, isLoggedIn} from "../store/auth";
import OrderCard from "./orderCard";
import {connect} from "react-redux";

// the dispatch functions call respective redux dispatch actions
class MyOrders extends Component {
    state = {  }

    async componentDidMount() {
        window.scrollTo(0, 0);

        try {
            // call dispatch action function
            await this.props.getMyOrders();
        } catch (err) {    
            console.log(err);
            return (window.location = "/");
        }
    }

    render() { 
        // if user is not logged in or user is employee go back to home
        if (!isLoggedIn() || isEmployee()) return (window.location = "/");
        return (             
            <Container style={{maxWidth:600}}>
                <h3>My Orders</h3>
                <ColoredLine color="grey" height={1} />
                
                {this.props.myOrders.map((order) => {
                    // return (<h3> {this.props.myOrders[key].uoid} </h3>);
                    return (<OrderCard key={order.uoid} order={order} employeeOps={false}/>);
                })}

            </Container>
        );
    }
}
 
// map redux store state to this.props
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    myOrders: state.entities.myOrders.list,
    loading: state.entities.myOrders.loading,
});
  
// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    getMyOrders: () => dispatch(getMyOrders()),
    getCurrentUser: () => dispatch(getCurrentUser()),
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
