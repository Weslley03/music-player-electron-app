import { createContext, useContext, useState } from "react";
import type { ToastifyTypes } from "../components/Toastify/Toastify";
import Toastify from "../components/Toastify/Toastify";

type Toast = { id: string; message: string; type: ToastifyTypes };

type ToastContextType = {
  createToastify: (message: string, type: ToastifyTypes) => void;
};

const ToastContext = createContext<ToastContextType>({
  createToastify: () => { },
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToastify = (message: string, type: ToastifyTypes) => {
    const id = crypto.randomUUID();
    setToasts([{ id, message, type }]);
  };

  return (
    <ToastContext.Provider value={{ createToastify }}>
      {toasts.map((t) => (
        <Toastify key={t.id} message={t.message} type={t.type}
          onClose={() => setToasts([])} />
      ))}
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);