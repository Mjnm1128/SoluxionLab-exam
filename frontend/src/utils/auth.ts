// utils/auth.ts

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpiry",
    (Date.now() + 24 * 60 * 60 * 1000).toString() // 24 hours expiry
  );
};

export const getToken = (): string | null => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (expiry && Date.now() > parseInt(expiry)) {
    clearToken();
    return null;
  }
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};
