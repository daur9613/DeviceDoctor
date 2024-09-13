import axios from "axios";

const API_URL = "http://localhost:5000/api/";
const config = {
  headers: {
    Authorization: localStorage.getItem("access_token"),
    "Content-Type": "application/json",
  },
};

const register = (username, phone, password) => {
  return axios.post(
    API_URL + "register",
    {
      username,
      phone,
      password,
    },
    config
  );
};
const login = (phone, password) => {
  return axios
    .post(API_URL + "login", {
      phone,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        var token = "Bearer " + String(response.data.token);
        localStorage.setItem("access_token", token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const createUser = (username, role, image, phone, password, address) => {
  return axios.post(
    API_URL + "register",
    {
      username,
      role,
      image,
      phone,
      password,
      address,
    },
    config
  );
};

const updateUser = (id, username, role, image, phone, password, address) => {
  return axios.put(
    API_URL + "users/" + id,
    {
      username,
      role,
      image,
      phone,
      password,
      address,
    },
    config
  );
};

const removeUser = (id) => {
  return axios.delete(API_URL + "users/" + id, {}, config);
};

const getUsers = async () => {
  return await axios.get(API_URL + "users", config);
};

const getOneUser = async (id) => {
  return await axios.get(API_URL + "users/" + id, config);
};

const getCategories = async () => {
  return await axios.get(API_URL + "Category", config);
};

const getOneCategory = async (id) => {
  return await axios.get(API_URL + "Category/" + id, config);
};

const createCategory = (name, image) => {
  return axios.post(
    API_URL + "Category",
    {
      name,
      image,
    },
    config
  );
};

const updateCategory = (id, name, image) => {
  return axios.put(
    API_URL + "Category/" + id,
    {
      name,
      image,
    },
    config
  );
};

const removeCategory = (id) => {
  return axios.delete(API_URL + "Category/" + id, {}, config);
};

const getServices = async () => {
  return await axios.get(API_URL + "Service", config);
};

const getOneService = async (id) => {
  return await axios.get(API_URL + "Service/" + id, config);
};

const createService = (
  name,
  userID,
  description,
  price,
  location,
  categories
) => {
  return axios.post(
    API_URL + "Service",
    {
      name,
      userID,
      description,
      price,
      location,
      categories,
    },
    config
  );
};

const updateService = (
  id,
  name,
  userID,
  description,
  price,
  location,
  categories
) => {
  return axios.put(
    API_URL + "Service/" + id,
    {
      name,
      userID,
      description,
      price,
      location,
      categories,
    },
    config
  );
};

const removeService = (id) => {
  return axios.delete(API_URL + "Service/" + id, {}, config);
};

const getServicesByCategory = async (categoryId) => {
  return await axios.get(`${API_URL}Category/${categoryId}/services`);
};

const getHelpers = async () => {
  return await axios.get(API_URL + "Helper", config);
};

const getOneHelper = async (id) => {
  return await axios.get(API_URL + "Helper/" + id, config);
};

const createHelper = (name, email, question) => {
  return axios.post(
    API_URL + "Helper",
    {
      name,
      email,
      question,
    },
    config
  );
};

const updateHelper = (id, name, email, question, answer) => {
  return axios.put(
    API_URL + "Helper/" + id,
    {
      name,
      email,
      question,
      answer,
    },
    config
  );
};

const removeHelper = (id) => {
  return axios.delete(API_URL + "Helper/" + id, {}, config);
};

const getApplications = async () => {
  return await axios.get(API_URL + "Application", config);
};

const getOneApplication = async (id) => {
  return await axios.get(API_URL + "Application/" + id, config);
};

const createApplication = (name, email, question) => {
  return axios.post(
    API_URL + "Application",
    {
      name,
      email,
      question,
    },
    config
  );
};

const updateApplication = (id, name, email, question, answer) => {
  return axios.put(
    API_URL + "Application/" + id,
    {
      name,
      email,
      question,
      answer,
    },
    config
  );
};

const removeApplication = (id) => {
  return axios.delete(API_URL + "Application/" + id, {}, config);
};

const apiservices = {
  register,
  login,
  logout,
  getCurrentUser,

  createUser,
  updateUser,
  removeUser,
  getUsers,
  getOneUser,

  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  removeCategory,

  getHelpers,
  getOneHelper,
  createHelper,
  updateHelper,
  removeHelper,

  getServices,
  getOneService,
  createService,
  updateService,
  removeService,

  getApplications,
  getOneApplication,
  createApplication,
  updateApplication,
  removeApplication,

  getServicesByCategory,
};

export default apiservices;
