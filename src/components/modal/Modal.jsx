import ModalProvider from "./ModalProvider";

const Modal = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-lg">Click to open Modal</p>

      <ModalProvider>
        <ModalProvider.Open openName="modal">
          <button className="text-base p-4 bg-black text-white rounded-lg">
            Open
          </button>
        </ModalProvider.Open>

        {/* Modal */}
        <ModalProvider.Window opens="modal">
          <h1 className="text-center text-xl font-medium">
            This is a React Modal
          </h1>
        </ModalProvider.Window>
      </ModalProvider>
    </div>
  );
};

export default Modal;
