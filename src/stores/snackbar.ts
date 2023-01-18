import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = reactive({
    isOpen: false,
    text: "",
    color: "",
    timeout: 2000,
  });
  interface Snackbar {
    text: string;
    color?: string;
    timeout?: number;
  }
  const openSnackbar = ({ text, color, timeout }: Snackbar) => {
    snackbar.isOpen = true;
    snackbar.text = text;
    if (color) {
      snackbar.color = color;
    }
    if (timeout) {
      snackbar.timeout = timeout;
    }
  };
  const closeSnackbar = () => {
    snackbar.isOpen = false;
    snackbar.text = "";
    snackbar.color = "";
    snackbar.timeout = 2000;
  };
  return {
    snackbar,
    openSnackbar,
    closeSnackbar,
  };
});
