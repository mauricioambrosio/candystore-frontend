import React, {Component} from "react";
import moment from "moment";
import {connect} from "react-redux";

import {updateOrderStatus} from "../store/orders";
import {cancelOrder} from "../store/myOrders";

class OrderCard extends Component{

    render() {
        // get orders from redux store
        const order = this.props.order;
        
        return (
            <div className="card mt-3 mb-3">
                {/* show order id along with timestamp and status */}
                <h6 className="card-header"> {`Order #${order.uoid} @${moment(order.date_time).local().format("YYYY/MM/DD HH:mm:ss")} (${order.status})`} </h6>
                
                <div className="card-body">
                    
                    {/* render order lines in order */}
                    {Object.keys(order.order_lines).map((key, index)=>{
                        const orderLines = order.order_lines;
                        
                        // get flavors in order lines
                        let name = orderLines[key].name;
                        let flavors = "(";
                        for(let i=0; i<orderLines[key].flavors.length; i++){
                            flavors += orderLines[key].flavors[i].name;
                            if (i < orderLines[key].flavors.length-1) flavors += ", ";      
                        }
                        flavors += ")";
                        
                        if(orderLines[key].flavors.length) name += " " + flavors;

                        return (
                            // show amount, product name, and price of order line
                            <span key={orderLines[key].uolid}>
                                {orderLines[key].amount + " x " + name + " = $" + orderLines[key].price.toFixed(2)}
                                
                                <br/>
                            </span>
                        );
                    })}

                    <br/>
                    {/* total price */}
                    <h6>{`Total = $${order.total_price.toFixed(2)}`}</h6>

                    <span>{order.firstname + " " + order.lastname}</span>
                    {order.firstname || order.lastname?<br/>:null}

                    <span><i>{order.phone_number}</i></span>
                    {order.phone_number?<br/>:null}

                    <span><i>{order.del_address}</i></span>
                    {order.del_address?<br/>:null}

                    {/* if order is open and employee is authenticated, show process button */}
                    {this.props.employeeOps && order.status==="Open"
                    ? <button className="btn btn-primary mt-2 mr-2"
                        // process order using redux dispatch action function 
                        onClick={() => this.props.updateOrderStatus(order.uoid, "Processed")}    
                    >
                        Process
                    </button> 
                    : null}

                    {/* if order is open, show cancel button */}
                    {order.status==="Open" 
                    ? <button className="btn btn-danger mt-2 mr-2"
                        onClick = {() => this.props.employeeOps ? this.props.updateOrderStatus(order.uoid, "Cancelled") : this.props.cancelOrder(order.uoid)}
                    >
                        Cancel
                    </button> 
                    : null}
                    
                    {/* if order is cancelled or processed and employee is authenticated, show open button */}
                    {this.props.employeeOps && ["Cancelled", "Processed"].includes(order.status) 
                    ? <button className="btn btn-primary mt-2 mr-2"
                        onClick = {() => this.props.updateOrderStatus(order.uoid, "Open")}
                    >
                        Open
                    </button> 
                    : null}

                </div>
            </div>
        );
    }
}

// map redux store state to this.props
const mapStateToProps = (state) => ({
    // orders: state.entities.myOrders.list,
});
  
// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    updateOrderStatus: (id, status) => dispatch(updateOrderStatus(id, status)),
    cancelOrder: (id) => dispatch(cancelOrder(id))
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
