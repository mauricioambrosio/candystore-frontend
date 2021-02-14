import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";

class MyOrders extends Component {
    state = {  }
    render() { 
        return (             
            <Container className="border rounded shadow p-4" style={{maxWidth:600}}>
                <h1>My Orders</h1> 
            </Container>
        );
    }
}
 
export default MyOrders;