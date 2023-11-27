import SweetAlert from 'sweetalert2';

const Toast = SweetAlert.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', SweetAlert.stopTimer);
    toast.addEventListener('mouseleave', SweetAlert.resumeTimer);
  },
});

/* iconTypes = [
  "success",
  "error",
  "warning",
  "info",
  "question"
] */
const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default makeToast;
