// eslint-disable-next-line import/no-extraneous-dependencies
import { TYPE, useToast } from "vue-toastification";

const toast = useToast();

export function showAlert(type:TYPE, message: string):void {
  toast(
    message,
    {
      type,
      timeout: 1000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
    },
  );
}
