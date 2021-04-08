import React, {Component} from "react";

import {Container, Row, Col} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";

import {connect} from "react-redux";
import {getStats} from "../store/orders";

import products from "../store/products";
import {isEmployee} from "../store/auth";


import Chart from "react-google-charts"; 

// component for displaying charts with order statistics 
class Stats extends Component {
    
    state = {};

    async componentDidMount(){
        // call dispatch action function to get order statistics from database
        await this.props.getStats();
    }

    render() { 
        // if user is not employee in go back to home page
        if (!isEmployee()) return (window.location = "/");

        // prepare data for products pie chart
        let productStats = [
            ['Product', 'Sold'], 
        ];
        if (this.props.stats && this.props.stats.products) 
            productStats = [...productStats, ...this.props.stats.products.map(product => [product.name, product.n_sold])];
        
        // prepare data for flavors pie chart
        let flavorStats = [
            ['Flavor', 'Sold'], 
        ];
        if (this.props.stats && this.props.stats.flavors) 
            flavorStats = [...flavorStats, ...this.props.stats.flavors.map(flavor => ([flavor.name, flavor.n_sold]))];

        // prepare data for line chart of daily number of orders of last month
        let orderStatsMonth = [['Date', 'Count']];
        if (this.props.stats && this.props.stats.orders_month) 
            orderStatsMonth = [...orderStatsMonth, ...this.props.stats.orders_month.map(order => ([order.date, order.count]))];  

        // add dummy data if empty
        if (orderStatsMonth.length === 1) orderStatsMonth = [...orderStatsMonth, [(new Date()).toString(), 0]]

        // prepare data for line chart of monthly number of orders of last year
        let orderStatsYear = [['Date', 'Count']];
        if (this.props.stats && this.props.stats.orders_year) 
            orderStatsYear = [...orderStatsYear, ...this.props.stats.orders_year.map(order => ([order.date, order.count]))];  

        // add dummy data if empty
        if (orderStatsYear.length === 1) orderStatsYear = [...orderStatsYear, [(new Date()).toString(), 0]]
        
        return ( 
            <Container className="w-100">
                <h3>Statistics</h3>
                <ColoredLine color="grey" height={1} />
                

                <Row>
                    <Col>
                        {/* products pie  chart */}
                        <Container className="border rounded p-4 mb-4" style={{minWidth: 400}}>
                           
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={productStats}
                                options={{
                                    title: 'Products Sold',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />        

                        </Container>
                    </Col>

                    <Col>
                        {/* flavors pie chart */}
                        <Container className="border rounded p-4 mb-4" style={{minWidth: 400}}>
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={flavorStats}
                                options={{
                                    title: 'Flavors Sold',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* line chart of daily number of orders of last month */}
                        <Container className="border rounded p-4 mb-4">
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={orderStatsMonth}
                                options={{
                                    title: 'Orders Last Month, Daily',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* line chart of monthly number of orders of last year */}
                        <Container className="border rounded p-4 mb-4">
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={orderStatsYear}
                                options={{
                                    title: 'Orders Last Year, Monthly',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Container>
                    </Col>
                </Row>

                {/* show total revenue, total number of orders, and average order price */}
                {this.props.stats.total_revenue && this.props.stats.average_order
                    ? <div className="w-100 text-center">
                        <ColoredLine color="grey" height={1} />
                        <h5>{`Total Revenue = $${this.props.stats.total_revenue.toFixed(2)}
                        | Total Number of Orders = ${this.props.stats.n_orders}
                        | Average Order = $${this.props.stats.average_order.toFixed(2)}`}</h5> 
                        <ColoredLine color="grey" height={1} />
                        <br/>
                    </div>
                    : null}
            </Container>
        );
    }
}
 
// map redux store state to this.props
const mapStateToProps = (state) => ({
    stats: state.entities.orders.stats,
});

// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
    getStats: () => dispatch(getStats())
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(Stats);