import {
  errorResponseHandler,
  normalResponseHandler,
} from "@/src/feature/shared/api/interceptors";
import { ErrorResponse } from "@/src/feature/shared/type/api";
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
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}/api`,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(normalResponseHandler, errorResponseHandler);

export default api;
