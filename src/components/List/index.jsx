import React, { Component } from 'react';
import { Button, Table, Popconfirm, message,} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTodo, deleteTodo } from '../../redux/action';
import './index.css';
import FormData from './formData';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: '',
            editData: []
        }
    }

    handleChange = (fieldName) => (event) => {
        if (event && event.target) {
            this.setState({ [fieldName]: event.target.value })
        }
    }

    handleDelete = async (description) => {
        await this.props.deleteTodo(description);
        message.success("Deleted...!");
    }

    closeModal = () => {
        this.setState({ operation: '' })
    }

    render() {
        const {
            operation, editData
        } = this.state;
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
            },
            {
                title: 'Action',
                width: '20%',
                render: (actionIndex) => (
                    <div className="action">
                        <Button
                            icon={<EditOutlined />}
                            style={{ marginRight: '10px', backgroundColor: '#e56f0a' }}
                            onClick={() => this.setState({ operation: 'Edit', editData: actionIndex })}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(actionIndex.description)}
                            onCancel={() => message.info("Operation terminated..!")}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                style={{ backgroundColor: '#ee0202' }}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        ]
        return (
            <div style={{
                margin: 20,
                padding: 20,
                backgroundColor: '#dcc5c5'
            }}>
                {operation ?
                    <FormData
                        visible={true}
                        closeModal={this.closeModal}
                        operation={operation}
                        editData={editData}
                    />
                    : null}
                <Button
                    type="primary"
                    style={{ float: 'left' }}
                    icon={<PlusOutlined />}
                    onClick={() => this.setState({ operation: 'Add' })}
                >
                    Add Bill
                </Button>
                <Table
                    style={{
                        margin: 20,
                        padding: 20
                    }}
                    dataSource={this.props.todoData}
                    columns={columns}
                    bordered
                />
            </div>
        )
    }
}

List.propTypes = {
    props: PropTypes
};

const mapStateToProps = state => {
    return {
        todoData: state.todoData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addTodo,
            deleteTodo
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);