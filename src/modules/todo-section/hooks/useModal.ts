import { useState, useCallback } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
  };
};

export default useModal;
