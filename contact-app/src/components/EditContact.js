import React from "react";
import { useParams } from "react-router-dom";

class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: ""
        };
    }

    componentDidMount() {
        const { id } = this.props.params; // Get the ID from params
        const contact = this.props.contacts.find((contact) => contact.id === id);

        if (contact) {
            this.setState({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            });
        }
    }

    update = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.email || !this.state.phone || !this.state.address) {
            alert("All fields are mandatory");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({ name: "", email: "", phone: "", address: "" });
        this.props.navigated("/"); // Corrected from `navigated` to `navigate`
    };

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={this.state.phone}
                            onChange={(e) => this.setState({ phone: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={this.state.address}
                            onChange={(e) => this.setState({ address: e.target.value })}
                        />
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        );
    }
}

// Wrap EditContact to inject params as props
export default (props) => <EditContact {...props} params={useParams()} />;
