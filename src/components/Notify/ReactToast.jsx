import toast from "react-hot-toast";

export const showCustomToast = (message, type = "success") => {
  const customStyle = {
    borderRadius: "12px",
    background: "#F3F4F6",
    color: "#1F2937",
    padding: "12px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontWeight: "500",
    minWidth: 250,
  };

  const iconSize = { fontSize: "20px" };

  switch (type) {
    case "success":
      toast.success(message, {
        style: customStyle,
        icon: (
          <i
            className="fa fa-check-circle"
            style={{ ...iconSize, color: "#10B981" }}
          />
        ),
      });
      break;

    case "error":
      toast.error(message, {
        style: customStyle,
        icon: (
          <i
            className="fa fa-exclamation-circle"
            style={{ ...iconSize, color: "#EF4444" }}
          />
        ),
      });
      break;

    case "loading":
      toast.loading(message, {
        style: customStyle,
        icon: (
          <i
            className="fa fa-spinner fa-spin"
            style={{ ...iconSize, color: "#3B82F6" }}
          />
        ),
      });
      break;

    case "info":
      toast(message, {
        style: customStyle,
        icon: (
          <i
            className="fa fa-info-circle"
            style={{ ...iconSize, color: "#3B82F6" }}
          />
        ),
      });
      break;

    default:
      toast(message, {
        style: customStyle,
      });
  }
};
