import React, { ReactNode, useState } from "react";
import { Layout } from "antd";

/**
 *
 * @description Inspired by https://epicreact.dev/one-react-mistake-thats-slowing-you-down/
 */

export const MainLayout: React.FC<{
  menu: ReactNode;
  header: ReactNode;
}> = ({ menu, header, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100%" }} className="ui-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo" />
        {menu}
      </Sider>
      <Layout className="site-layout">
        {header}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};
