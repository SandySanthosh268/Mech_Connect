// small helper to decode JWT (no external lib)
export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch (e) {
    return null;
  }
}

export const getUserFromStorage = () =>
  JSON.parse(localStorage.getItem("user") || "{}");

export const isLoggedIn = () => !!localStorage.getItem("token");

export const hasRole = (role) => {
  const user = getUserFromStorage();
  if (!user || !user.role) return false;
  return user.role.toUpperCase() === role.toUpperCase();
};
