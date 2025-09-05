import axios from "axios";
import { FormEvent, useState, } from "react";
import { Button } from "src/components/Button";
import { Modal } from "src/components/modal/Modal";

type Props = {
  open: boolean;
  type: "add" | "edit";
setOpen: (value: boolean) => void;
  getToppers: () => void;
  editParam?: {
    _id?: string;
    name?: string;
    marks?: string;
    class?: string;
    description?: string;
  };
};

export const AddTopperModal = ({
  open,
  type,
  setOpen,
  getToppers,
  editParam,
}: Props) => {
    const [loading, setLoading]=useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (loading) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const url =
        type === "add"
          ? "/api/topper"
          : `/api/topper?id=${editParam?._id}`;

      const method = type === "add" ? "post" : "patch";
      await axios({ method, url, data: formData });

      getToppers();
      setOpen(false);
    } catch (err) {
      console.error("Error saving topper:", err);
    }
    finally{
        setLoading(false);
    }
  };

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      defaultValue: editParam?.name || "",
      placeholder: "Enter name",
    },
    {
      label: "Marks",
      name: "marks",
      type: "text",
      defaultValue: editParam?.marks || "",
      placeholder: "Enter marks",
    },
    {
      label: "Class",
      name: "class",
      type: "select",
      defaultValue: editParam?.class || "",
      options: ["Select Class", "X", "XII"],
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      defaultValue: editParam?.description || "",
      placeholder: "Enter description",
    },
    {
      label: "Image",
      name: "image",
      type: "file",
      placeholder: "Upload image",
      accept: ".pdf,.jpg,.jpeg,.png",
    },
  ];

  return (
    <Modal
      width="40vw"
      title={type === "edit" ? "Edit Topper" : "Add Topper"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      onOk={()=>{ setOpen(false); }}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-3">
            <label className="text-gray-700" htmlFor={field.name}>
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                required
                name={field.name}
                defaultValue={field.defaultValue}
                className="text-gray-700 border border-gray-500 px-5 py-2"
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt === "Select Class" ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                required={field.type !== "file"} // don't force image in edit mode
                name={field.name}
                defaultValue={field.defaultValue}
                type={field.type}
                placeholder={field.placeholder}
                accept={field.accept}
                className="text-gray-700 border border-gray-500 px-5 py-2"
              />
            )}
          </div>
        ))}

        <div className="flex justify-center gap-5 items-center">
          <button
            className="bg-blue-600 px-5 py-2 text-white transition hover:scale-105 cursor-pointer rounded-md"
            type="submit"
            disabled={loading}
          >
            {type === "edit" ?(loading?"Saving...":"Save") : (loading?"Submiting...":"Submit")}
          </button>
          <Button type="secondary" title="Cancel" onClick={() => setOpen(false)} />
        </div>
      </form>
    </Modal>
  );
};
