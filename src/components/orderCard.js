import React, {Component} from "react";
import moment from "moment";
import {connect} from "react-redux";

import {updateOrderStatus} from "../store/orders";
import {cancelOrder} from "../store/myOrders";

class OrderCard extends Component{

    render(){
        const order = this.props.order;
        
        return (
            <div className="card mt-3 mb-3">
                <h6 className="card-header"> {`Order #${order.uoid} @${moment(order.date_time).local().format("YYYY/MM/DD HH:mm:ss")} (${order.status})`} </h6>
                
                <div className="card-body">
                    {Object.keys(order.order_lines).map((key, index)=>{
                        const orderLines = order.order_lines;
                        
                        let name = orderLines[key].name;
                        let flavors = "(";
                        for(let i=0; i<orderLines[key].flavors.length; i++){
                            flavors += orderLines[key].flavors[i].name;
                            if (i < orderLines[key].flavors.length-1) flavors += ", ";      
                        }
                        flavors += ")";
                        
                        if(orderLines[key].flavors.length) name += " " + flavors;

                        return (
                            <span key={orderLines[key].uolid}>
                                {orderLines[key].amount + " x " + name + " = $" + orderLines[key].price.toFixed(2)}
                                
                                <br/>
                            </span>
                        );
                    })}

                    <br/>
                    <h6>{`Total = $${order.total_price.toFixed(2)}`}</h6>
                    <span>{order.firstname + " " + order.lastname}</span>
                    
                    {order.firstname || order.lastname?<br/>:null}
                    <span><i>{order.phone_number}</i></span>

                    {order.phone_number?<br/>:null}
                    <span><i>{order.del_address}</i></span>
                    
                    {order.del_address?<br/>:null}

                    {this.props.employeeOps && order.status==="Open"
                    ? <button className="btn btn-primary mt-2 mr-2"
                        onClick={() => this.props.updateOrderStatus(order.uoid, "Processed")}    
                    >
                        Process
                    </button> 
                    : null}

                    {order.status==="Open" 
                    ? <button className="btn btn-danger mt-2 mr-2"
                        onClick = {() => this.props.employeeOps ? this.props.updateOrderStatus(order.uoid, "Cancelled") : this.props.cancelOrder(order.uoid)}
                    >
                        Cancel
                    </button> 
                    : null}
                    
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

const mapStateToProps = (state) => ({
    // orders: state.entities.myOrders.list,
  });
  
const mapDispatchToProps = (dispatch) => ({
    updateOrderStatus: (id, status) => dispatch(updateOrderStatus(id, status)),
    cancelOrder: (id) => dispatch(cancelOrder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
