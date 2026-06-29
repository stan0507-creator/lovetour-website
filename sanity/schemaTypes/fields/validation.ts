const unsafeTerms = ["待確認", "後台測試", "sample", "placeholder"];
const fakeUrlTerms = ["example.com", "example.test", "localhost", "replace-with", "placeholder"];
const sensitivePolicyCategories = ["payment", "cancellation", "pet-visitor"];

type ValidationContext = {
  document?: Record<string, unknown>;
  parent?: Record<string, unknown>;
};

const asText = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map(asText).join(" ");
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).map(asText).join(" ");
  }

  return typeof value === "string" ? value : "";
};

const isPublishedDocument = (context: ValidationContext) =>
  context.document?.contentStatus === "published";

const includesUnsafeTerm = (value: unknown) => {
  const text = asText(value).toLowerCase();
  return unsafeTerms.some((term) => text.includes(term.toLowerCase()));
};

const includesFakeUrl = (value: unknown) => {
  const text = asText(value).toLowerCase();
  return fakeUrlTerms.some((term) => text.includes(term));
};

export const textSafetyValidation = (rule: any) => [
  rule
    .custom((value: unknown) =>
      includesUnsafeTerm(value)
        ? "內容含有待確認、後台測試、sample 或 placeholder。草稿可暫存，發布前必須移除。"
        : true,
    )
    .warning(),
  rule.custom((value: unknown, context: ValidationContext) =>
    isPublishedDocument(context) && includesUnsafeTerm(value)
      ? "內容含有待確認、後台測試、sample 或 placeholder，不能設為 published。"
      : true,
  ),
];

export const requiredWhenPublished = (rule: any, label: string) =>
  rule.custom((value: unknown, context: ValidationContext) => {
    if (!isPublishedDocument(context)) {
      return true;
    }

    const text = asText(value).trim();
    return text.length > 0 ? true : `內容狀態為 published 時，「${label}」必須填寫。`;
  });

export const urlSafetyValidation = (rule: any) => [
  rule
    .custom((value: unknown) =>
      includesFakeUrl(value)
        ? "網址看起來像示範或本機網址。未確認正式網址時請留空，不要填假網址。"
        : true,
    )
    .warning(),
  rule.custom((value: unknown, context: ValidationContext) =>
    isPublishedDocument(context) && includesFakeUrl(value)
      ? "published 內容不可使用示範、本機或 placeholder 網址。"
      : true,
  ),
];

export const imageAltWarning = (rule: any) =>
  rule
    .custom((value: unknown, context: ValidationContext) => {
      const parent = context.parent;
      const hasImage = Boolean(parent?.asset);
      return hasImage && !asText(value).trim()
        ? "圖片已上傳，建議補上圖片替代文字，方便搜尋與無障礙閱讀。"
        : true;
    })
    .warning();

export const sensitivePolicyWarning = (rule: any) =>
  rule
    .custom((value: unknown, context: ValidationContext) => {
      const category = asText(context.document?.category || value);
      return sensitivePolicyCategories.includes(category)
        ? "此分類可能涉及付款、訂金、取消、押金、寵物、訪客或費用。未完全確認前請保持 draft 或 verified，不要發布。"
        : true;
    })
    .warning();
