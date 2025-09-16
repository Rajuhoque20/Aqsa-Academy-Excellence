import axios from "axios";
import React, { useState } from "react";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  deleteParam: { name: string; id: string };
  getEvents: () => void;
};

export default function DeleteEvents ({
  open,
  setOpen,
  deleteParam,
  getEvents,
}: Props)  {
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (!deleteParam?.id) return;

    try {
      setLoading(true);
      await axios.delete(`/api/event?id=${deleteParam.id}`);
      getEvents();
      setOpen(false);
       Notification.success('Event has been deleted.');
    } catch (error) {
      console.error("Error deleting event:", error);
       Notification.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      width="40vw"
      title="Delete Event"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={deleteHandler}
      okText={loading ? "Deleting..." : "Delete"}
      okButtonProps={{ disabled: loading }}
      footer
    >
      <p className="text-center">
        Are you sure you want to delete the event{" "}
        <b>{deleteParam?.name}</b>?
      </p>
    </Modal>
  );
};
