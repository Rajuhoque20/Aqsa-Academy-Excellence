import axios from "axios";
import React, { useState } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  deleteParam: { name: string; id: string };
  getNotice: () => void;
};

export default function DeleteNotice  ({
  open,
  setOpen,
  deleteParam,
  getNotice,
}: Props)  {
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.delete(`/api/notice?id=${deleteParam.id}`);
      getNotice();
      setOpen(false);
      Notification.success(`Notice has been deleted.`)
    } catch (err) {
      console.error("Error deleting notice:", err);
      Notification.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      width="40vw"
      title="Delete Notice"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={deleteHandler}
      okButtonProps={{ disabled: loading }}
      okText={loading?'Deleting':"Confirm"}
      footer
    >
      <p className="text-center">
        Are you sure you want to delete the notice{" "}
        <b>{deleteParam?.name}</b>?
      </p>
    </Modal>
  );
};
