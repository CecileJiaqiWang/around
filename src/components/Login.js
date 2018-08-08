import React from 'react';
import $ from'jquery';
import { Link } from 'react-router-dom';
import {API_ROOT} from "../Constants";
import { Form, Icon, Input, Button, message} from 'antd';

const FormItem = Form.Item;

class HorizontalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/login`,
                    method: 'POST',
                    data: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                }).then((response) => {
                    this.props.handleLogin(response);
                }, (error) => {
                    message.error(error.responseText);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Log in
                    </Button>
                    Or <Link to={"/register"}> register now! </Link>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create()(HorizontalLoginForm);