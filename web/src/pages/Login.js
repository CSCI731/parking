import React from 'react';
import store from 'store';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import loginMutation from '../gql/mutation/login';
import { Form, Icon, Input, Button, Alert } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  render() {
    const { history, form: { getFieldDecorator } } = this.props;
    return (
      <Mutation mutation={loginMutation}>
        {(login, { loading, error }) => (
          <div className="login-page">
            {error &&
            <Alert
              type="error"
              closable
              description={(error.graphQLErrors.length > 0 && error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))) || error.message}
            />
            }
            <Form onSubmit={(e) => {
              e.preventDefault();
              const { form } = this.props;
              form.validateFields(async (err, values) => {
                if (!err) {
                  const result = await login({ variables: { email: values.email, password: values.password } });
                  store.set('token', result.data.login.token);
                  history.push('/admin');
                }
              })
            }} className="login-form">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email address.' },
                    { type: 'email', message: 'The input is not valid E-mail.' }
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                         placeholder="Email Address" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password.' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                         placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
                  Log in
                </Button>
              </FormItem>
            </Form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Form.create()(withRouter(LoginForm));