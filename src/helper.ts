export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
  
export const getToken = () => localStorage.getItem("user");
export const setToken = (user: string) => localStorage.setItem("user", user);
export const removeToken = () => localStorage.removeItem("user");
