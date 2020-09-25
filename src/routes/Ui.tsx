import React, { useState } from "react";
import { Button } from "antd";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import "./Ui.less";
import { useSession } from "../contexts/Session";
import { Link, Routes, Route, useParams, Outlet } from "react-router-dom";
import { Modal, ModalLayout } from "../components/Modal";

import Users from "./Users";
import Notify from "./Notify";

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

const pages = [1, 2, 3];

const IdShow: React.FC = () => {
  const { id } = useParams();
  return <div>Show ID {JSON.stringify(id)}</div>;
};

const Modal1 = () => (
  <ModalLayout>
    modal directe
    <MainPage />
  </ModalLayout>
);
const Modal2 = () => (
  <Modal>
    modal dans un portal
    <MainPage />
  </Modal>
);

const Home = () => (
  <>
    <nav>
      <ul>
        {pages.map((p) => (
          <li key={p}>
            <Link to={`${p}`}>{p}</Link>
          </li>
        ))}
        <li key="modal1">
          <Link to="modal1">modal</Link>
        </li>
        <li key="modal2">
          <Link to="modal2">modal dans portal</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
);

const MainPage = () => (
  <>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
    </Breadcrumb>
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 360 }}
    >
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="modal1/*" element={<Modal1 />}></Route>
          <Route path="modal2/*" element={<Modal2 />}></Route>
          <Route path=":id" element={<IdShow />}></Route>
        </Route>
        <Route path="users/*" element={<Users />}></Route>
        <Route path="notify/*" element={<Notify />}></Route>
      </Routes>
    </div>
  </>
);

const Ui: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { dispatch } = useSession();

  return (
    <Layout style={{ minHeight: "100vh" }} className="ui-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />}>
            <Link to="notify">Notify</Link>
          </Menu.Item>
          {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} /> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            style={{ float: "right", margin: "1rem 1rem" }}
            type="primary"
            onClick={() => {
              dispatch({ type: "logoff" });
            }}
          >
            <LogoutOutlined /> logout
          </Button>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <MainPage />
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default Ui;
