import React, { Component } from 'react';
import { Table } from 'antd'

export default class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log("this.props.record", this.props.record);
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            }
        ]
        return (
            <Table
                dataSource={this.props.record}
                columns={columns}
            />
        )
    }
}