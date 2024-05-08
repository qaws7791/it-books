import api, { ApiError } from "@/src/shared/api";
import { renewAccessToken } from "@/src/shared/api/auth";
import { ErrorResponse } from "@/src/shared/type/api";
import { AxiosError, AxiosResponse } from "axios";

export const normalResponseHandler = (response: AxiosResponse) => {
  return response.data;
};

export const errorResponseHandler = async (
  error: AxiosError<ErrorResponse>
) => {
  const originalRequest = error.config;
  console.log("errorResponseHandler", error.config?.url);
  if (error.response?.status === 401) {
    console.log("errorResponseHandler 401");
  }
  return Promise.reject(error);
  // if (originalRequest && error.response?.status === 401) {
  //   try {
  //     await renewAccessToken();
  //     return api(originalRequest);
  //   } catch (error) {
  //     throw new ApiError({
  //       statusCode: 401,
  //       name: "UnauthorizedError",
  //       message: "로그인이 필요합니다.",
  //     });
  //   }
  // }

  // if (error.response) {
  //   throw new ApiError(error.response.data);
  // } else {
  //   throw new ApiError({
  //     statusCode: 500,
  //     name: "UnknownError",
  //     message: "알 수 없는 오류가 발생했습니다.",
  //   });
  // }
};
