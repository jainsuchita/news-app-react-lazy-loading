import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

class SearchForm extends Component {

    render() {
        const { handleSearch, handleChange, result } = this.props;

        return (
            <Form className="form__container" onSubmit={handleSearch}>
                <Form.Group controlId="searchedUser">
                    <Form.Control type="text" placeholder="User Name" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>

                <div className="search-result">
                    {
                        result.length > 0 ?
                            <Badge pill variant="success">
                                Found {result.length} User(s):
                            </Badge>
                            : null
                    }
                    <ListGroup>
                        {
                            result.map((user) => {
                                return (
                                    <ListGroup.Item
                                        key={user.id}
                                        action
                                        variant="info">
                                        {user.name}
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </div>
            </Form>
        );
    }
}

export default SearchForm;
