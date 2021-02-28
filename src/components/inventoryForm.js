import React, {Component} from "react";
import {Container} from "react-bootstrap";

class InventoryForm extends Component {

    render() { 
        const {value, entity, idField} = this.props;
        
        return ( 
            <div> 
                <h4 className="mb-4">{this.props.header}</h4>

                <input className="rounded mb-2" 
                    type="number" 
                    style={{width:100}} 
                    value={value[idField]} 
                    placeholder="ID"
                    readOnly/>
                <br/>


                <input className="w-100 rounded mb-2"
                    value={value.name}
                    placeholder="Name"
                    onChange={(e) => this.props.handleChange(this.props.entity, "name", e.target.value)}
                />
                <br/>

                <input className="rounded mb-2"
                    placeholder="$Price"
                    style={{width:100}}
                    value={value.price}
                    type="number"
                    onChange={(e) => this.props.handleChange(this.props.entity, "price", e.target.value)}
                />

                <br/>

                <div className="mb-2">
                    {value[idField]===""?<button className="btn btn-primary mb-2 mr-2" 
                        disabled = {
                            value.name==="" ||
                            value.price===""? true: false
                        }
                        onClick = {async ()=>{
                            await this.props.post({name: value.name, price: value.price});
                            this.props.handleClear(entity, idField);
                        }}>
                        Add
                    </button>:null}

                    {value[idField]?<button className="btn btn-primary mb-2 mr-2" 
                        onClick = {async ()=>{
                            await this.props.edit(value);
                        }}>
                        Update
                    </button>:null}

                    {value[idField]?<button className="btn btn-danger mb-2 mr-2" 
                        onClick = {async ()=>{
                            await this.props.delete(value);
                            this.props.handleClear(entity, idField);
                        }}>
                        {value.active?"Delete":"Restore"}
                    </button>:null}
                    
                    <button className="btn btn-danger mb-2" 
                        onClick = {()=>this.props.handleClear(entity, idField)}>
                        Clear
                    </button>
                </div>

            </div> 
        );
    }
}
 
export default InventoryForm;