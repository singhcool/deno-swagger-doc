import * as path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import { parseApiFileContent } from "./parseApiFileContent.ts";
/**
 * Parses the provided API file for JSDoc comments.
 * @function
 * @param {string} file - File to be parsed
 * @returns {{jsdoc: array, yaml: array}} JSDoc comments and Yaml files
 */
export function parseApiFile(file: any) {
  return Array.from(expandGlobSync(file)).map(
    f => parseApiFileContent(
      Deno.readTextFileSync(f.path),
      path.extname(f.path)
    )
  );
}
