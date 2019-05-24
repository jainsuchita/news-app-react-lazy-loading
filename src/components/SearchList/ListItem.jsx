import React from 'react'

// Antd components
import { List, Skeleton } from 'antd';

// Local components
import IconText from "../../controls/Icon/IconText";
import ImageWrapper from "../../controls/Image/ImageWrapper"

const ListItem = (props) => {

    const { date, item } = props;

    return (
        <List.Item
            className="app-list-item"
            key={item.title}
            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            extra={
                <ImageWrapper imgSrc={item.multimedia[1] && item.multimedia[1].url} />

            }
        >
            <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                    title={<a target="_blank" href={item.short_url}>{item.title}</a>}
                    description={item.abstract}
                />
                <div>{item.des_facet[0]}</div>
                <div>{date} : {new Date(item.published_date).toLocaleDateString()} {new Date(item.published_date).toLocaleTimeString()}</div>
            </Skeleton>
        </List.Item>

    );
}

export default ListItem;
