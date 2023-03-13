// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosError, AxiosResponse } from "axios";

export type ResponseType =
  | "INFORMATIONAL"
  | "SUCCESS"
  | "REDIRECTION"
  | "CLIENT_ERROR"
  | "SERVER_ERROR"
  | "CONNECTION_ERROR"

export interface Response {
  type: ResponseType,
  code: number,
  message: string,
  result?: any,
  page?: any,
}

export function createResponse(axiosResponse: AxiosResponse | AxiosError): Readonly<Response> {
  let code: number;
  let message: string;
  let result: any;
  let page: any;

  if (axios.isAxiosError(axiosResponse)) {
    ({
      code,
      message,
    } = convertAxiosError(axiosResponse));
  } else {
    code = axiosResponse.status;
    message = axiosResponse.data.message;
    result = axiosResponse.data?.result ?? axiosResponse.data;
    page = axiosResponse.data?.page;
  }

  return Object.freeze({
    type: getResponseType(code),
    code,
    message,
    result,
    page,
  });
}

function convertAxiosError(err: AxiosError) {
  if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
    return {
      code: 901,
      message: err.message,
    };
  }

  return {
    code: 900,
    message: err.message,
  };
}

export function getResponseType(code: number): ResponseType {
  const hundredsDigit = Math.floor(code / 100);
  switch (hundredsDigit) {
    case 1:
      return "INFORMATIONAL";
    case 2:
      return "SUCCESS";
    case 3:
      return "REDIRECTION";
    case 4:
      return "CLIENT_ERROR";
    case 5:
      return "SERVER_ERROR";
    case 9:
      return "CONNECTION_ERROR";
    default:
      throw Error("Unexpected response error code is detected.");
  }
}
