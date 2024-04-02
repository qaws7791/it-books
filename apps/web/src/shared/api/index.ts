import {
  errorResponseHandler,
  normalResponseHandler,
} from "@web/src/shared/api/interceptors";
import { ErrorResponse } from "@web/src/shared/type/api";
import axios from "axios";

export class ApiError extends Error {
  statusCode: number;
  name: string;
  message: string;

  constructor(error: ErrorResponse) {
    super(error.message);
    this.statusCode = error.statusCode;
    this.name = error.name;
    this.message = error.message;
  }
}

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 3000,
  withCredentials: true,
});

api.interceptors.response.use(normalResponseHandler, errorResponseHandler);

export default api;
