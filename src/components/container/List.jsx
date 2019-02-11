import React from "react";
import { connect } from "react-redux";


const ConnectedList = ({ articles }) => (
    <ul className="list-group list-group-flush">
        {articles && articles.length > 0 && articles.map(el => (
            <li className="list-group-item" key={el.id}>
                {el.title}
            </li>
        ))}
    </ul>
);

const mapStateToProps = state => {
    return { articles: state.articles };
};

const List = connect(mapStateToProps)(ConnectedList);
export default List;
