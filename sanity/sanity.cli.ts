import { defineCliConfig } from "sanity/cli";

declare const process: {
  env: Record<string, string | undefined>;
};

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID. Add it to sanity/.env before running Sanity CLI commands.");
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
