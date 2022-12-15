import { Id, toast } from "react-toastify";

export const showToast = (msg: string): Id => {
  toast.dismiss();
  return toast(msg);
};
