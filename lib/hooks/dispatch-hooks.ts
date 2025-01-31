import { useMemo } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  hideError,
  hideModal,
  hideSuccess,
  showError,
  showModal,
  showSuccess,
} from "../redux/states/messageSlice";
import { POPUPTIME } from "@/constants/constants";

export const useDisplayMessage = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      displayError(errMsg: string) {
        dispatch(showError(errMsg));
        setTimeout(() => dispatch(hideError()), POPUPTIME);
      },

      displaySuccess(successMsg: string) {
        dispatch(showSuccess(successMsg));
        setTimeout(() => dispatch(hideSuccess()), POPUPTIME);
      },

      hideModal() {
        dispatch(hideModal());
      },

      displayModal(modalId: string) {
        dispatch(showModal(modalId));
      },
    }),
    [dispatch]
  );

  return actions;
};

export default useDisplayMessage;
