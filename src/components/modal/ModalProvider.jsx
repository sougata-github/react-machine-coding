/* eslint-disable react/prop-types */
import { X } from "lucide-react";

import { createPortal } from "react-dom";
import { useOutsideClick } from "./useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const onClose = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, setOpenName, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({ children, openName }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setOpenName(openName) });
}

function Window({ children, opens }) {
  const { openName, onClose } = useContext(ModalContext);

  const ref = useOutsideClick(onClose);

  if (opens !== openName) {
    return null;
  }

  return createPortal(
    <div className="h-screen w-screen fixed bg-transparent backdrop-blur-[3px] transition-all z-[1000] top-0 left-0 flex items-center justify-center">
      <div
        ref={ref}
        className="relative bg-white h-[320px] w-full max-w-[400px] flex items-center justify-center rounded-lg transition-all border-[0.5px] border-neutral-200 shadow-md animate-modal"
      >
        <button
          className="bg-transparent border-none p-2 absolute right-[20px] top-[20px]"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-black" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

ModalProvider.Open = Open;
ModalProvider.Window = Window;

export default ModalProvider;
