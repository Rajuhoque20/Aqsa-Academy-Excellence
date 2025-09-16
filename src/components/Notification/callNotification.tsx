import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AiOutlineClose } from "react-icons/ai";
export const callNotification = (type: string, message: string) => {
  // Create a container dynamically
  const container = document.createElement("div");
  document.body.appendChild(container);

  // Create root and render notification
  const onClose=()=>{
     root.unmount();
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  const root = createRoot(container);
  root.render(<NotificationPopup type={type} message={message} onClose={onClose}/>);

  // Auto cleanup after 3 seconds
  setTimeout(() => {
   onClose();
  }, 3000);
};

const NotificationPopup = ({ type, message, onClose }: { type: string; message: string, onClose:()=>void }) => {
  useEffect(() => {
    // optional mount animation
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 w-1/3 ${type==="Success!"?'bg-green-600':'bg-red-600'} text-white p-5 rounded shadow-lg z-[123456]`}
    >
        <div className="flex items-center justify-between">
            <h3 className="font-bold">{type}</h3>
            <AiOutlineClose size={20} className="cursor-pointer"
            onClick={onClose}
            />
        </div>
      
      <p>{message}</p>
    </div>
  );
};
