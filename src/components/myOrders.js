import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";
import {getMyOrders} from "../store/myOrders";
import {getCurrentUser} from "../store/auth";
import OrderCard from "./orderCard";
import {connect} from "react-redux";


class MyOrders extends Component {
    state = {  }

    async componentDidMount() {

        window.scrollTo(0, 0);

        try {
            await this.props.getMyOrders();
        } catch (err) {    
            console.log(err);
            return (window.location = "/");
        }
    }

    render() { 
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
 
const mapStateToProps = (state) => ({
    currentUser: state.auth.currentUser,
    myOrders: state.entities.myOrders.list,
    loading: state.entities.myOrders.loading,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getMyOrders: () => dispatch(getMyOrders()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
