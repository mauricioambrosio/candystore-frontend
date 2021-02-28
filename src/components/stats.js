import React, {Component} from "react";

import {Container, Row, Col} from "react-bootstrap";
import ColoredLine from "./common/coloredLine";

import {connect} from "react-redux";
import {getStats} from "../store/orders";

import products from "../store/products";

import Chart from "react-google-charts"; 

class Stats extends Component {
    
    state = {};

    async componentDidMount(){
        await this.props.getStats();
    }

    render() { 
        
        let productStats = [
            ['Product', 'Sold'], 
        ];

        if (this.props.stats && this.props.stats.products) 
            productStats = [...productStats, ...this.props.stats.products.map(product => [product.name, product.n_sold])];
        
        let flavorStats = [
            ['Flavor', 'Sold'], 
        ];

        if (this.props.stats && this.props.stats.flavors) 
            flavorStats = [...flavorStats, ...this.props.stats.flavors.map(flavor => ([flavor.name, flavor.n_sold]))];


        let orderStatsMonth = [['Date', 'Count']];

        if (this.props.stats && this.props.stats.orders_month) 
            orderStatsMonth = [...orderStatsMonth, ...this.props.stats.orders_month.map(order => ([order.date, order.count]))];  
        
        let orderStatsYear = [['Date', 'Count']];
        
        if (this.props.stats && this.props.stats.orders_year) 
            orderStatsYear = [...orderStatsYear, ...this.props.stats.orders_year.map(order => ([order.date, order.count]))];  

        return ( 
            <Container className="w-100">
                <h3>Statistics</h3>
                <ColoredLine color="grey" height={1} />
                
                <Row>
                    <Col>
                        <Container className="border rounded p-4 mb-4">
                           
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
                        <Container className="border rounded p-4 mb-4">
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
                        <Container className="border rounded p-4 mb-4">
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={orderStatsMonth}
                                options={{
                                    title: 'Orders Last Month Daily',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container className="border rounded p-4 mb-4">
                            <Chart
                                // width={'500px'}
                                height={'300px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={orderStatsYear}
                                options={{
                                    title: 'Orders Last Year Monthly',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Container>
                    </Col>
                </Row>
                <div className="w-100 text-center">
                    <ColoredLine color="grey" height={1} />
                    <h5>{`Total Revenue = $${this.props.stats.total_revenue.toFixed(2)}
                    | Total Number of Orders = ${this.props.stats.n_orders}
                    | Average Order = $${this.props.stats.average_order.toFixed(2)}`}</h5> 
                    <ColoredLine color="grey" height={1} />
                    <br/>
                </div>
            </Container>
        );
    }
}
 
const mapStateToProps = (state) => ({
    stats: state.entities.orders.stats,
  });
  
const mapDispatchToProps = (dispatch) => ({
    getStats: () => dispatch(getStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);