import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.modules.scss";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = () => {
    localStorage.token = "123";
    navigate("/monaco-editor");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <div className="g-bg">
        <div className="g-polygon g-polygon-1"></div>
        <div className="g-polygon g-polygon-2"></div>
        <div className="g-polygon g-polygon-3"></div>
      </div>
      <div className="g-login">
        <h3>登录</h3>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 0 }}
          initialValues={{
            username: "admin",
            password: "admin",
          }}
          style={{ width: "80%" }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
