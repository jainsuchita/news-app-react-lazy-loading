import React from 'react'
import axios from "axios";

// Styles
import './List.css';

// Antd components
import { List } from 'antd';

// Local components
import HeaderFilter from "../HeaderFilter/HeaderFilter";
import ListItem from "./ListItem";

const Footer = () => {
    return (
        <div><b>ant design</b> Powered by nytimes</div>
    );
};

class SearchedList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchedList: [],
            date: "pulished_date"
        }

        this.API_KEY = "3UiqpoK1IbAXFeEGbJsfwRoc6zilXJhp"; // put it in .env file
        this.handleSectionChange = this.handleSectionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        // Get all the users with their information
        let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.API_KEY}`;
        axios
            .get(url)
            .then(response => {
                const data = response.data.results;

                this.setState({
                    data: data,
                    searchedList: data,
                });

                this.handleDateChange("published_date");
            })
            .catch(err => {
                console.log("Opps", err.message);
            });

    }

    handleDateChange(value) {
        const { data } = this.state;
        data.sort((a, b) => {
            return new Date(b[value]) - new Date(a[value]);
        });

        this.setState({
            ...this.state,
            date: value,
            searchedList: data
        });
    }

    handleSectionChange(value) {

        // filter the list based on value
        const { data } = this.state;
        let newList = [];

        if (value === "all") {
            newList = data;
        }

        else {
            newList = data.filter((item) => {
                return value.toLowerCase() === item.section.toLowerCase();
            });
        }

        this.setState({
            ...this.state,
            searchedList: newList
        });
    }

    getOptionList() {
        const { data } = this.state;

        let optionList = [];

        optionList = data.map((item) => {
            return item.section;
        });

        optionList = [...new Set(optionList)];

        return optionList;
    }

    render() {

        const { searchedList, date } = this.state;

        const optionList = this.getOptionList();

        return (

            <List
                header={<HeaderFilter handleSectionChange={this.handleSectionChange} optionList={optionList} handleDateChange={this.handleDateChange} />}
                grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                dataSource={searchedList}
                size="large"
                itemLayout="vertical"
                className="list-container"
                footer={<Footer />}
                renderItem={item => (
                    item && <ListItem item={item} date={date} />
                )}
            />
        );
    }
}

export default SearchedList
