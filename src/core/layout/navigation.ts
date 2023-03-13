/**
 * @param name The name shown in navigation menu.
 * @param routeName The name of path to be matched.
 * @param rank Determines the position of the element we want to add in the list.
 * @to Determines page to be routed.
 */
export interface NavItem {
  name: string,
  routeName: string,
  rank: number,
  to: string
}

export const navItems: NavItem[] = [];

export function registerNavMenu(navItem: NavItem): void {
  navItems.push(navItem);
}
