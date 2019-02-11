import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../../actions/index";
import Input from "../presentational/Input.jsx";

class ConnectedForm extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        const id = uuidv1();
        this.props.addArticle({ title, id });
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;

        return (
            <form className="form-element" onSubmit={this.handleSubmit}>
                <Input
                    label="Title"
                    text="Title:"
                    className="form-control"
                    type="text"
                    id="title"
                    value={title}
                    handleChange={this.handleChange}
                />
                <button type="submit" className="btn">
                    SAVE
                </button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
