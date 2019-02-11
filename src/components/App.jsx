import React from "react";
import List from "./container/List";
import Form from "./container/Form";
import Post from "./container/Post";

const App = () => (
    <div className="main-container">
        <div className="row-element form">
            <h2>Add a new article</h2>
            <Form />
        </div>

        <div className="row-element list">
            <h2>Articles</h2>
            <List />
        </div>

        <div className="row-element post">
            <h2> API posts</h2>
            <Post />
        </div>
    </div>
);

export default App;
