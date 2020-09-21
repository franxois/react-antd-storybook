import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal as ModalAntd } from "antd";
import { useNavigate } from "react-router-dom";

export const ModalLayout: React.FC = (props) => {
  const [isVisible, setVisible] = useState(true);
  const navigate = useNavigate();
  const close_timeout = 200;
  return (
    <ModalAntd
      visible={isVisible}
      onOk={() => {
        setVisible(false);
        setTimeout(() => {
          navigate(-1);
        }, close_timeout);
      }}
      onCancel={() => {
        setVisible(false);
        setTimeout(() => {
          navigate(-1);
        }, close_timeout);
      }}
      {...props}
    ></ModalAntd>
  );
};

export const Modal: React.FC = ({ children }) => {
  const div = document.getElementById("modal_root");
  return div ? createPortal(<ModalLayout>{children}</ModalLayout>, div) : null;
};
