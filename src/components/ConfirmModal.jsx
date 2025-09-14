import { Button } from "flowbite-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 md:inset-0 ${isOpen ? "block" : "hidden"}`}
      id="popup-modal"
      tabIndex="-1"
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative m-2 rounded-lg bg-white">
          <Button
            data-modal-hide="popup-modal"
            onClick={onClose}
            type="button"
            className="absolute top-1 right-1 cursor-pointer rounded-xl border !bg-white px-1 py-1 hover:!bg-gray-100"
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 46 46"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.6569 17.3431L17.3431 28.6569M28.6569 28.6569L17.3431 17.3431"
                stroke="#111827"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </Button>
          <div className="flex flex-col items-center p-2 text-center md:p-5">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-200"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="mb-5 font-normal text-[var(--color-title)]">
              {message}
            </span>
            <div>
              <button
                className="inline-flex cursor-pointer items-center rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-700 hover:bg-[var(--color-tertiary)]"
                data-modal-hide="popup-modal"
                onClick={onConfirm}
                type="button"
              >
                Sim, entrar na comunidade
              </button>
              <button
                className="ms-3 cursor-pointer rounded-lg border border-[var(--color-secondary)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-secondary)] transition-colors duration-700 hover:bg-[var(--color-secondary)] hover:text-white"
                data-modal-hide="popup-modal"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
