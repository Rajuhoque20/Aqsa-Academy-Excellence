import axios from "axios";
import { FormEvent, useState } from "react";
import { Button } from "src/components/Button";
import { Modal } from "src/components/modal/Modal";

type EventParam = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  date?: string;
};

type Props = {
  open: boolean;
  type: "add" | "edit";
  setOpen: (val: boolean) => void;
  getEvents: () => void;
  editParam: EventParam;
};

export const AddEventModal = ({
  open,
  type,
  setOpen,
  getEvents,
  editParam,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const url =
        type === "add"
          ? "/api/event"
          : `/api/event?id=${editParam?._id}`;
      const method = type === "add" ? "post" : "patch";

      await axios({ method, url, data: formData });

      getEvents();
      setOpen(false);
    } catch (err) {
      console.error("Failed to submit event:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "text-gray-700 border border-gray-500 px-5 py-2 rounded-md";

  return (
    <Modal
      width="40vw"
      title={type === "edit" ? "Edit Event" : "Add Event"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Title */}
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-gray-700">
            Title
          </label>
          <input
            required
            name="title"
            defaultValue={type === "edit" ? editParam?.title : ""}
            type="text"
            placeholder="Enter title"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <label htmlFor="description" className="text-gray-700">
            Description
          </label>
          <input
            required
            name="description"
            defaultValue={type === "edit" ? editParam?.description : ""}
            type="text"
            placeholder="Enter description"
            className={inputClass}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-3">
          <label htmlFor="image" className="text-gray-700">
            Image
          </label>
          <input
            name="image"
            accept=".pdf,.jpg,.jpeg,.png"
            type="file"
            className={inputClass}
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-3">
          <label htmlFor="date" className="text-gray-700">
            Date
          </label>
          <input
            required
            name="date"
            defaultValue={type === "edit" ? editParam?.date : ""}
            type="date"
            className={inputClass}
          />
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
