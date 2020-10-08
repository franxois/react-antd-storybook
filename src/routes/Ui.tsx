import React from "react";
import { Dropdown, Layout } from "antd";

import { Menu, Breadcrumb, Avatar } from "antd";
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
import { MainLayout } from "../components/MainLayout";
import Users from "./Users";
import Notify from "./Notify";
import { sayHello } from "ui-library";

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
  const { dispatch } = useSession();

  const avatarMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          dispatch({ type: "logoff" });
        }}
      >
        <LogoutOutlined /> logout
      </Menu.Item>
    </Menu>
  );

  const menu = (
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
    </Menu>
  );
  const header = (
    <Layout.Header className="site-layout-background">
      <Dropdown overlay={avatarMenu} arrow>
        <Avatar size={32} icon={<UserOutlined />} />
      </Dropdown>
    </Layout.Header>
  );

  sayHello();

  return (
    <MainLayout menu={menu} header={header}>
      <MainPage />
    </MainLayout>
  );
};

export default Ui;
