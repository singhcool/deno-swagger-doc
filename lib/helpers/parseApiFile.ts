import * as path from "https://deno.land/std/path/mod.ts";
import { parseApiFileContent } from "./parseApiFileContent.ts";
/**
 * Parses the provided API file for JSDoc comments.
 * @function
 * @param {string} file - File to be parsed
 * @returns {{jsdoc: array, yaml: array}} JSDoc comments and Yaml files
 */
export function parseApiFile(file: any) {
  const fileContent = Deno.readTextFileSync(file);
  const ext = path.extname(file);

  return parseApiFileContent(fileContent, ext);
}
