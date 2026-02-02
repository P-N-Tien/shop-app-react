// Check the init status from localStorage
const getInitialUser = () => {
  // const storedUser = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return {
    isLoggedIn: isLoggedIn,
    // userData: storedUser ? JSON.parse(storedUser) : null,
  };
};

const userReducer = (state = getInitialUser(), action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        isLoggedIn: true,
        // userData: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("isLoggedIn");

      return {
        isLoggedIn: false,
        // userData: {},
      };

    default:
      return state;
  }
};

export default userReducer;
