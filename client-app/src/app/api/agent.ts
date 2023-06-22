import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

// * adding loading indicator
const sleep = (delay: number) => {
   return new Promise((resolve) => setTimeout(resolve, delay));
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
   try {
      await sleep(1000);
      return response;
   } catch (error) {
      console.log(error);
      return await Promise.reject(error);
   }
});

// * Pass response, get response.data
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// ! <T> is type, use to make request generic

// * HTTP REQUEST METHOD
const requests = {
   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
   post: <T>(url: string, body: {}) =>
      axios.post<T>(url, body).then(responseBody),
   put: <T>(url: string, body: {}) =>
      axios.put<T>(url, body).then(responseBody),
   del: <T>(url: string) => axios.delete(url).then<T>(responseBody),
};

// ! Object that will store request of activities
const Activities = {
   list: () => requests.get<Activity[]>("/activities"),
   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
   create: (activity: Activity) => axios.post(`/activities`, activity),
   update: (activity: Activity) =>
      requests.put(`/activities/${activity.id}`, activity),
   delete: (id: string) => requests.del(`/activities/${id}`),
};

const agent = {
   Activities,
};

export default agent;
