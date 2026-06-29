import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

declare const process: {
  env: Record<string, string | undefined>;
};

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID. Add it to sanity/.env before starting Sanity Studio.");
}

export default defineConfig({
  name: "lovetour-poc",
  title: "樂圖漫遊會館 CMS PoC",
  projectId,
  dataset,
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
