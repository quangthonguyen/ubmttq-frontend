import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const onFinish = (values) => {
    dispatch({
      type: 'LOGIN',
      payload: { username: values.username, password: values.password },
    });
  };

  return (
    <>
      {userInfo.username && userInfo.username ? (
        <Redirect to="/DashBoard" />
      ) : null}
      <Card hoverable={true} className={style.card}>
        {console.log('render login')}
        <Title level={4} className={style.login_title}>
          LOGIN
        </Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* user name */}

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          {/* password */}

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* forgot password */}

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className={style['login-form-forgot']} href="dsd">
              Forgot password
            </a>
          </Form.Item>

          {/* submit */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={style['login-form-button']}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Login;
