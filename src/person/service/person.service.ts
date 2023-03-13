import { Person } from "@/person";
import { apiCall, getResponseType } from "@/core/api";
import { showAlert } from "@/core/popup/alert";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TYPE } from "vue-toastification";

const API_URL = "/person";

export async function createPerson(person: Person): Promise<any> {
  const response = await apiCall("POST", API_URL, person);
  if (getResponseType(response.code) === "SUCCESS") {
    showAlert(TYPE.SUCCESS, "Person successfully created.");
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}

export async function getPersonList(page?: number, size?: number): Promise<any> {
  const response = await apiCall(
    "GET",
    API_URL,
    undefined,
    {
      page,
      size,
    },
  );
  if (getResponseType(response.code) === "SUCCESS") {
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}

export async function updatePerson(person: Person): Promise<any> {
  const url = `${API_URL}/${person.id}`;
  const response = await apiCall("PUT", url, person);
  if (getResponseType(response.code) === "SUCCESS") {
    showAlert(TYPE.SUCCESS, "Person successfully updated.");
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}

export async function deltaUpdatePerson(person: Person): Promise<any> {
  const url = `${API_URL}/${person.id}`;
  const response = await apiCall("PATCH", url, person);
  if (getResponseType(response.code) === "SUCCESS") {
    showAlert(TYPE.SUCCESS, "Person successfully updated.");
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}

export async function getPerson(id: string): Promise<any> {
  const url = `${API_URL}/${id}`;
  const response = await apiCall("GET", url);
  if (getResponseType(response.code) === "SUCCESS") {
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}

export async function deletePersonById(id: string): Promise<boolean> {
  const url = `${API_URL}/${id}`;
  const response = await apiCall("DELETE", url);
  if (getResponseType(response.code) === "SUCCESS") {
    showAlert(TYPE.SUCCESS, "Person successfully deleted.");
    return true;
  }
  showAlert(TYPE.ERROR, response.message);
  return false;
}

export async function searchPerson(person: Person, page: number, size: number): Promise<any> {
  const url = `${API_URL}/search`;
  const response = await apiCall(
    "POST",
    url,
    person,
    {
      page,
      size,
    },
  );
  if (getResponseType(response.code) === "SUCCESS") {
    return response.result;
  }
  showAlert(TYPE.ERROR, response.message);
  return undefined;
}
