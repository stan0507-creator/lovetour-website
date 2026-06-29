import type { BaseComponentContract } from "./types";

export interface NavbarItemContract {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface NavbarContract extends BaseComponentContract {
  brandLabel: string;
  brandHref: string;
  items: NavbarItemContract[];
  action?: NavbarItemContract;
}
