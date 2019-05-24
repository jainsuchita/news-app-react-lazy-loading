import React from 'react'

// Styles
import './NewsFeed.css';
import "antd/dist/antd.css";

// Local Components
import SearchList from "../SearchList/SearchList";

const NewsFeed = () => {
    return (
        <React.Fragment>
            <div className="appHeader">
                <div className="title">
                    <h1>News Feed</h1>
                </div>
            </div>

            <SearchList />
        </React.Fragment>
    );
}

export default NewsFeed;
