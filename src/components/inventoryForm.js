import React, {Component} from "react";
import {Container} from "react-bootstrap";

// form to add, remove, and edit a single product or flavor
class InventoryForm extends Component {

    render() { 
        const {value, entity, idField} = this.props;
        
        return ( 
            <div> 
                <h4 className="mb-4">{this.props.header}</h4>

                {/* read only input for selected item id */}
                <input className="rounded mb-2" 
                    type="number" 
                    style={{width:100}} 
                    value={value[idField]} 
                    placeholder="ID"
                    readOnly/>
                <br/>

                {/* input for item name */}
                <input className="w-100 rounded mb-2"
                    value={value.name}
                    placeholder="Name"
                    onChange={(e) => this.props.handleChange(this.props.entity, "name", e.target.value)}
                />
                <br/>

                {/* input for item price */}
                <input className="rounded mb-2"
                    placeholder="$Price"
                    style={{width:100}}
                    value={value.price}
                    type="number"
                    onChange={(e) => this.props.handleChange(this.props.entity, "price", e.target.value)}
                />

                <br/>

                <div className="mb-2">

                    {/* if id field is empty, show the add button */}
                    {/* if name or price is empty, disable add button */}
                    {value[idField]===""?<button className="btn btn-primary mb-2 mr-2" 
                        disabled = { value.name==="" || value.price===""}
                        onClick = {async ()=>{
                            await this.props.post({name: value.name, price: value.price});
                            this.props.handleClear(entity, idField);
                        }}>
                        Add
                    </button>:null}

                    {/* if no item is selected (id field is empty), do not show update button  */}
                    {value[idField]?<button className="btn btn-primary mb-2 mr-2" 
                        onClick = {async ()=>{
                            await this.props.edit(value);
                        }}>
                        Update
                    </button>:null}

                    {/* if no item is selected (id field is empty), do not show remove button  */}
                    {value[idField]?<button className="btn btn-danger mb-2 mr-2" 
                        onClick = {async ()=>{
                            await this.props.delete(value);
                            this.props.handleClear(entity, idField);
                        }}>
                        {value.active?"Delete":"Restore"}
                    </button>:null}
                    
                    {/* clear all inputs */}
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