import React, {Component} from "react";
import moment from "moment";

class OrderCard extends Component{

    render(){
        const order = this.props.order;

        return (
            <div className="card mt-3 mb-3">
                <h6 className="card-header"> {`Order #${order.uoid} @${moment(order.date_time).local().format("YYYY/MM/DD HH:mm:ss")}`} </h6>
                
                <div className="card-body">
                    {Object.keys(order.order_lines).map((key, index)=>{
                        const orderLines = order.order_lines;
                        
                        let price = orderLines[key].price;
                        orderLines[key].flavors.forEach((flavor) => price += flavor.price);
                        price *= orderLines[key].amount;
                        

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
                                {orderLines[key].amount + " x " + name + " = $" + price.toFixed(2)}
                                
                                <br/>
                            </span>
                        );
                    })}

                    <br/>
                    <h6>{`Total = $${order.total_price.toFixed(2)}`}</h6>
                    <h6>{order.phone_number}</h6>
                    <h6>{order.del_address}</h6>
                </div>

            </div>
        );
    }
}

export default OrderCard;
