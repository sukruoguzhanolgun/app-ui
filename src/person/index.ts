import { RouteRecordRaw } from "vue-router";
import { addRoutes } from "@/core/router";
import { NavItem, registerNavMenu } from "@/core/layout/navigation";

export interface Person {
  id: string,
  firstName: string,
  lastName: string,
  streetAddress: string,
  houseNumber: string,
  zip: string,
  city: string,
  country: string,
  extensionFields: any
}

const contactListRoute: RouteRecordRaw = {
  path: "/person-list",
  name: "personList",
  component: () => import("@/person/pages/PersonList.vue"),
};

const createContactRoute: RouteRecordRaw = {
  path: "/person/create",
  name: "createPerson",
  component: () => import("@/person/pages/EditPerson.vue"),
};

const editContactRoute: RouteRecordRaw = {
  path: "/person/edit/:id",
  name: "editPerson",
  component: () => import("@/person/pages/EditPerson.vue"),
};

addRoutes([contactListRoute, createContactRoute, editContactRoute]);

const contactItem: NavItem = {
  name: "Person",
  routeName: "personList",
  to: "/person-list",
  rank: 10,
};

registerNavMenu(contactItem);
