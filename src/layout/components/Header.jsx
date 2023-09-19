import { Col, Row, Avatar, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Row>
      <Col span={12}>
        <h1>Demo</h1>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <Space align="end">
          <Button type="link" onClick={logout}>
            退出登录
          </Button>
          <Avatar size={40}>USER</Avatar>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
