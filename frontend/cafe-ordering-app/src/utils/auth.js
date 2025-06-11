export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch {
    return null;
  }
};

export const isKasir = () => {
  const user = getUser();
  return user?.role === "kasir";
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const isLoggedIn = () => {
  return !!getToken();
};
