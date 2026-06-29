import type { BaseComponentContract } from "./types";

export interface FAQCardContract extends BaseComponentContract {
  question: string;
  answer: string;
  category?: string;
  defaultOpen?: boolean;
}
