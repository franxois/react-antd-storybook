import { notification } from "antd";
import { NotificationInstance } from "antd/lib/notification";
import React, { createContext, useContext } from "react";

const Ctx = createContext<string>("ctx0");

const DisplayMessageFromCtx = () => {
  const value = useContext(Ctx);
  return <p>{`All is good ${value}`}</p>;
};

const MyConsumer = ({ api }: { api: NotificationInstance }) => {
  const value = useContext(Ctx);

  return (
    <div>
      <button
        onClick={() => {
          console.log("I want a new notif from context", value);
          api.success({ message: <DisplayMessageFromCtx /> });
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default function Notify() {
  const [api1, contextHolder1] = notification.useNotification();
  const [api2, contextHolder2] = notification.useNotification();
  return (
    <div>
      <Ctx.Provider value="ctx root">
        <Ctx.Provider value="ctx 1">
          {contextHolder1}
          <MyConsumer api={api1} />
        </Ctx.Provider>
      </Ctx.Provider>
      <Ctx.Provider value="ctx 2">
        {contextHolder2}
        <MyConsumer api={api2} />
      </Ctx.Provider>
    </div>
  );
}
