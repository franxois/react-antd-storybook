import React, { ReactNode, useState } from "react";
import { Layout } from "antd";

export const MainLayout: React.FC<{
  menu: ReactNode;
  headerContent: ReactNode;
}> = ({ menu, headerContent, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;

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
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {headerContent}
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};
