import { createClient } from "@sanity/client";

const isServer = typeof window === "undefined";

export const getContentSource = (): "local" | "sanity" => {
  return import.meta.env.PUBLIC_CONTENT_SOURCE === "sanity" ? "sanity" : "local";
};

export const getCmsContentMode = (): "draft" | "published" => {
  return import.meta.env.PUBLIC_CONTENT_MODE === "published" ? "published" : "draft";
};

export const hasSanityConfig = (): boolean => {
  return Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID && import.meta.env.PUBLIC_SANITY_DATASET);
};

export const assertSanityConfig = (): void => {
  if (getContentSource() !== "sanity") {
    return;
  }

  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Sanity content source is enabled, but PUBLIC_SANITY_PROJECT_ID is missing.");
  }

  if (!import.meta.env.PUBLIC_SANITY_DATASET) {
    throw new Error("Sanity content source is enabled, but PUBLIC_SANITY_DATASET is missing.");
  }
};

export const createSanityClient = () => {
  assertSanityConfig();

  if (!hasSanityConfig()) {
    return undefined;
  }

  const usePreviewToken = isServer && getCmsContentMode() === "draft";
  const token = usePreviewToken ? import.meta.env.SANITY_PREVIEW_TOKEN : undefined;

  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    apiVersion: import.meta.env.SANITY_API_VERSION || "2026-06-27",
    useCdn: getCmsContentMode() === "published",
    token,
    perspective: token ? "drafts" : "published",
  });
};
