import axios from "axios";

// export const BaseIP = 'localhost';
export const BaseIP = "35.232.195.188";

const GQL = axios.create({
  baseURL: `http://${BaseIP}/graphql/?`,
  timeout: 60000
});

const DIR = axios.create({
  baseURL: `http://${BaseIP}:3001/`,
  timeout: 60000 
});

DIR.interceptors.request.use(function(config) {
  config.headers["Authorization"] = "Bearer " + localStorage.token;
  config.headers["Content-Type"] = "application/json";
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

export default GQL;
export { DIR };
