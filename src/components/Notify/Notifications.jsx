import Swal from "sweetalert2";

const Toast = Swal.mixin({
  customClass: {
    popup: "rounded-4 shadow-lg",
    confirmButton: "btn btn-dark px-4 py-2 fw-bold mx-2",
    cancelButton: "btn btn-light px-4 py-2 fw-bold mx-2",
  },
  buttonsStyling: false,
});

export const showSuccessAlert = (title, text, confirmText = "Great!") => {
  return Toast.fire({
    icon: "success",
    title: `<span class="fw-bold fs-4">${title}</span>`,
    html: `<span class="text-muted">${text}</span>`,
    confirmButtonText: confirmText,
    showClass: {
      popup: "animate__animated animate__fadeInUp animate__faster",
    },
  });
};

export const showErrorAlert = (title, text) => {
  return Toast.fire({
    icon: "error",
    title: `<span class="fw-bold fs-4">${title}</span>`,
    html: `<span class="text-muted">${text}</span>`,
    confirmButtonText: "Try Again",
    confirmButtonColor: "#dc3545",
  });
};

// Dạng Toast (thông báo nhỏ góc màn hình)
export const showToast = (icon, title) => {
  const ToastSmall = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  ToastSmall.fire({
    icon: icon, // 'success', 'error', 'info', 'warning'
    title: title,
  });
};

export const confirmDialog = async (title, text, icon = "question") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  return result.isConfirmed;
};
