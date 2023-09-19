import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menus from "./components/Menus.jsx";
import MyHeader from "./components/Header.jsx";
const { Header, Sider, Content } = Layout;

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", {
        replace: true,
      });
    } else {
      navigate("/monaco-editor", {
        replace: true,
      });
    }
  }, []);
  return (
    <Layout>
      <Header style={{ backgroundColor: "#fff" }}>
        <MyHeader />
      </Header>
      <Layout hasSider>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menus />
        </Sider>
        <Content style={{ padding: "10px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
