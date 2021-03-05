import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import TableList from './table';

const { TextArea } = Input;
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            record: [],
            counter: 0
        }
    }
    handleChange = (fieldName) => (event) => {
        if (event && event.target) {
            this.setState({ [fieldName]: event.target.value })
        }
    }
    addTask = () => {
        const {
            record, title, description, counter
        } = this.state;
        const tempStack = record;
        tempStack.push({
            title,
            description,
            key: counter
        })
        this.setState({ record: tempStack, title: '', description: '', counter: counter+1 })
    }
    render() {
        const {
            title, description, record
        } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        console.log("record", record);
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
            <>
                <h2>Add Item</h2>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form {...layout}>
                        <Form.Item label="Title">
                            <Input
                                value={title}
                                onChange={this.handleChange('title')}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea
                                value={description}
                                onChange={this.handleChange('description')}
                            />
                        </Form.Item>
                    </Form>
                </div>
                <Button
                    type="primary"
                    onClick={this.addTask}
                >
                    Add
                </Button>
                <TableList record={record}/>
            </>
        )
    }
}