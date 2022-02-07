import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      toast(text);
    }
  }, []);
};

export default useMessage;
