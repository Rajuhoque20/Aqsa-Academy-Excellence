import axios from "axios";
import React, { useState } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  deleteParam: { name: string; id: string };
  getAlarm: () => void;
};

export default function DeleteAlarm  ({
  open,
  setOpen,
  deleteParam,
  getAlarm,
}: Props)  {
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.delete(`/api/alarm?id=${deleteParam.id}`);
      getAlarm();
      setOpen(false);
      Notification.success(`Alarm has been deleted.`)
    } catch (err) {
      console.error("Error deleting alarm:", err);
      Notification.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      width="40vw"
      title="Delete Alarm"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={deleteHandler}
      okButtonProps={{ disabled: loading }}
      okText={loading?'Deleting':"Confirm"}
      footer
    >
      <p className="text-center">
        Are you sure you want to delete the alarm{" "}
        <b>{deleteParam?.name}</b>?
      </p>
    </Modal>
  );
};
