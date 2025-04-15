import { useState } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast
  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
  };

  // Function to remove a toast by ID
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};