import React from 'react'

// Styles
import './HeaderFilter.css';

// Antd components
import { Select } from 'antd';

const Option = Select.Option;

const HeaderFilter = ({ handleSectionChange, optionList, handleDateChange }) => {
    return (
        <div className="app-header-filters">
            <span> Sort By </span>
            <Select defaultValue="published_date" style={{ width: 200 }} onChange={handleDateChange}>
                <Option value="published_date">published_date</Option>
                <Option value="updated_date">updated_date</Option>
                <Option value="created_date">created_date</Option>
            </Select>
            <span>Filter By</span>
            <Select defaultValue="all" style={{ width: 150 }} onChange={handleSectionChange}>
                <Option value="all">All</Option>
                {
                    optionList.map((item) => {
                        return (
                            <Option key={item} value={item}>{item}</Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default HeaderFilter;
