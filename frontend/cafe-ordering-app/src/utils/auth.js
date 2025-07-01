export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const getUser = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
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
