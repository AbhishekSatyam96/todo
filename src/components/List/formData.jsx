import React, { Component } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { addTodo, editTodo } from '../../redux/action';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { TextArea } = Input;

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',
            description: '',
            amount: null,
            date: ''
        }
    }

    componentDidMount = () => {
        this.setState({ visible: this.props.visible })
        if (this.props.operation === 'Edit') {
            const {
                title, description
            } = this.props.editData;
            this.setState({
                title,
                description,
            })
        }
    }

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value })
    }

    handleCancel = async () => {
        this.setState({ visible: false });
        await this.props.closeModal();
    }
    handleSubmit = async () => {
        const {
            description, title
        } = this.state;
        if (!title) {
            message.error("Please enter title to continue...");
            return;
        }
        if (!description) {
            message.error("Please enter description to continue...");
            return;
        }
        if (this.props.operation === 'Edit') {
            const payload = {
                id: this.props.editData.id,
                description,
                title,
            }
            await this.props.editTodo(payload);
            message.success("Updated successfully..!")
        } else {
            const payload = {
                id: this.props.todoData.length + 1,
                description,
                title,
            }
            await this.props.addTodo(payload);
            message.success("Created...!");
        }
        this.handleCancel();
    }

    render() {
        const {
            visible, title, description
        } = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        return (
            <Modal
                visible={visible}
                title={`${this.props.operation} Bill`}
                onCancel={this.handleCancel}
                footer={[
                    <Button
                        key="back"
                        onClick={this.handleCancel}
                    >
                        Close
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                ]}
            >
                <Form {...layout}>
                    <Form.Item label="title">
                        <Input
                            placeholder="Enter title"
                            value={title}
                            onChange={this.handleChange('title')}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea
                            placeholder="Enter Description"
                            value={description}
                            onChange={this.handleChange('description')}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
FormData.propTypes = {
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
            editTodo
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FormData);