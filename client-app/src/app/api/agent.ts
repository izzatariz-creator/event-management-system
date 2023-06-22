import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

// * Pass response, get response.data
const responseBody = (response: AxiosResponse) => response.data;

// * HTTP REQUEST METHOD
const requests = {
   get: (url: string) => axios.get(url).then(responseBody),
   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
   put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
   del: (url: string) => axios.delete(url).then(responseBody),
};

// ! Object that will store request of activities
const Activities = {
   list: () => requests.get("/activities"),
};

const agent = {
   Activities,
};

export default agent;