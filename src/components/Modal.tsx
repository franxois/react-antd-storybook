import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal as ModalAntd } from "antd";
import { useNavigate } from "react-router-dom";

export const ModalLayout: React.FC = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const navigate = useNavigate();
  return (
    <ModalAntd
      visible={isVisible}
      onOk={() => {
        setVisible(false);
        navigate(-1);
      }}
      onCancel={() => {
        setVisible(false);
        navigate(-1);
      }}
    >
      {children}
    </ModalAntd>
  );
};

export const Modal: React.FC = ({ children }) => {
  const div = document.getElementById("modal_root");
  return div ? createPortal(<ModalLayout>{children}</ModalLayout>, div) : null;
};
