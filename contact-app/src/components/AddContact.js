import React from "react";


class AddContact extends React.Component{
    
    state={
        name:"",
        email:"",
        phone:"",
        address:""
    }
   
    add=(e)=>{
        e.preventDefault();
        if(this.state.name==="" && this.state.email==="" && this.state.phone==="" && this.state.address===""){
            alert("All the fields are mandatory");
            return;
        }
        this.props.addContactHandler(this.state);
        //after sybmitting the form automatically clear the field values
        this.setState({name:"" ,email:"", phone:"" ,address:""})
        console.log(this.state);
        this.props.navigate("/");
        //this.props.history.push("/");
        
    };
    render(){
        return(
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name}
                          onChange={(e)=>this.setState({name:e.target.value})}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email"
                         value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}
                        />
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input type="number" name="phone" placeholder="Phone"
                        value={this.state.phone}
                        onChange={(e)=>this.setState({phone:e.target.value})}
                          />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address"
                        value={this.setState.address}
                        onChange={(e)=>this.setState({address:e.target.value})}
                        />
                    </div>
                    <button className="ui button blue">Add</button> 
                </form>
            </div>
        );
    }
}
export default AddContact;