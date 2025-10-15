import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "src/components/Button";
import Notification from "src/components/Notification/Notifcation";
const Modal=React.lazy(()=>import("src/components/modal/Modal"));

type AlarmParam = {
  _id?: string;
  time?: string;
  type?: string;
};

type Props = {
  open: boolean;
  type: "add" | "edit";
  setOpen: (val: boolean) => void;
  getAlarm: () => void;
  editParam?: AlarmParam;
};

const alarm_types=[
  "Select",
  "bell",
  "caller",
  "lunch_break"
];

export default function AddAlarmModal  ({
  open,
  type,
  setOpen,
  getAlarm,
  editParam,
}: Props){
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
     const data =  Object.fromEntries(formData.entries());
    try {
      const url =
        type === "add"
          ? "/api/alarm"
          : `/api/alarm?id=${editParam?._id}`;
      const method = type === "add" ? "post" : "patch";

      await axios({ method, url, data: data });
      getAlarm();
      setOpen(false);
      Notification.success(`Alarm has been ${type==='add'?'added':'updated'}`);
    } catch (err) {
      console.error("Error saving alarm:", err);
      Notification.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "text-gray-700 border border-gray-500 px-5 py-2 rounded-md";

  return (
    <Modal
      width="40vw"
      title={type === "edit" ? "Edit Alarm" : "Add Alarm"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >
        {/* Title */}
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-gray-700">
            Alarm Time
          </label>
          <input
            required
            name="time"
            defaultValue={type === "edit" ? editParam?.time : ""}
            type="time"
            placeholder="Enter title"
            className={inputClass}
          />
        </div>

        {/* Date */}
         <div className="flex flex-col gap-3">
                    <label className="text-gray-700" htmlFor="phone">Select Alarm Type </label>
                    <select required name="type"
                     defaultValue={type === 'edit' ? editParam?.type : ''}
                     className="text-gray-700 border-1 border-gray-500 px-5 py-2">
                        {alarm_types?.map(item=>(
                            <option key={item} value={item==='Select'?'':item}>{item}</option>
                        ))}
                    </select>
                </div>

       

        {/* Actions */}
        <div className="flex justify-center gap-5 items-center">
          <button
            disabled={loading}
            className="bg-blue-600 px-5 py-2 text-white rounded-md transition hover:scale-105 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : type === "edit"
              ? "Save"
              : "Submit"}
          </button>
          <Button
            type="secondary"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
        </div>
      </form>
    </Modal>
  );
};
