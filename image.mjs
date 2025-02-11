import pathUtils from "node:path";
import process from "node:process";
import fs from "node:fs/promises";

const TYPE_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function getImageUrl(relative) {
  const fullPath = pathUtils.join(process.cwd(), relative);
  const content = await fs.readFile(fullPath, "base64");
  const ext = pathUtils.extname(fullPath);
  const type = TYPE_MAP[ext];
  if (!type) {
    throw new Error(`Unsupported image extension: ${ext}`);
  }
  return `data:${type};base64,${content}`;
}
