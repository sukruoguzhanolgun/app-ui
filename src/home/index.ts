import { NavItem, registerNavMenu } from "@/core/layout/navigation";

const homeItem: NavItem = {
  name: "Home",
  routeName: "home",
  to: "/",
  rank: 5,
};

registerNavMenu(homeItem);
