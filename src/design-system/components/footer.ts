import type { BaseComponentContract } from "./types";

export interface FooterLinkContract {
  label: string;
  href: string;
}

export interface FooterGroupContract {
  title: string;
  links: FooterLinkContract[];
}

export interface FooterContract extends BaseComponentContract {
  brandLabel: string;
  summary?: string;
  groups?: FooterGroupContract[];
  legalText?: string;
}
