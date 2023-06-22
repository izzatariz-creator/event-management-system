import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

// * Pass response, get response.data
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// ! <T> is type, use to make request generic

// * HTTP REQUEST METHOD
const requests = {
   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
   put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
   del: (url: string) => axios.delete(url).then(responseBody),
};

// ! Object that will store request of activities
const Activities = {
   list: () => requests.get<Activity[]>("/activities"),
};

const agent = {
   Activities,
};

export default agent;
