import axios from "axios";
import { useState } from "react";
import { Modal } from "src/components/modal/Modal";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  deleteParam: { name: string; id: string };
  getNotice: () => void;
};

export const DeleteNotice = ({
  open,
  setOpen,
  deleteParam,
  getNotice,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.delete(`/api/notice?id=${deleteParam.id}`);
      getNotice();
      setOpen(false);
    } catch (err) {
      console.error("Error deleting notice:", err);
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
