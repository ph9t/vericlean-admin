import axios from "axios";

const API_HEAD = "/api/heads/";

const register = async (headData) => {
  const response = await axios.post(API_HEAD + "register", headData);

  if (response.data) {
    localStorage.setItem("head", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (headData) => {
  const response = await axios.post(API_HEAD + "login", headData);

  if (response.data) {
    localStorage.setItem("head", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("head");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
