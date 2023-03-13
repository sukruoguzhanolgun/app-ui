// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosRequestConfig, Method } from "axios";
import { getEnv } from "@/core/util";
import { createResponse, Response } from "@/core/api/response";

const REST_URL = getEnv("REST_URL");

const TIMEOUT_MS = parseInt(getEnv("TIMEOUT_MS"), 10);
export async function apiCall(method: Method, endpoint: string, body?: any, params?: any): Promise<Response> {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    baseURL: REST_URL,
    timeout: TIMEOUT_MS,
    data: body,
    validateStatus: () => true,
    params,
  };

  let response: Readonly<Response>;

  try {
    const axiosResponse = await axios.request(config);
    response = createResponse(axiosResponse);
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw err;
    }
    response = createResponse(err);
  }

  return response;
}
