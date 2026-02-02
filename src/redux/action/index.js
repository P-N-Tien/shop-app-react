// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const clearCard = () => {
  return {
    type: "CLEARCART",
  };
};

// Login
export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS",
  };
};

// Login
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
