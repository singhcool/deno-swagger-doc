import { createRequire } from "https://deno.land/std/node/module.ts";
const require = createRequire(import.meta.url);
const fs = require("fs");

import * as path from "https://deno.land/std/path/mod.ts";
import { parseApiFileContent } from './parseApiFileContent.ts';
/**
 * Parses the provided API file for JSDoc comments.
 * @function
 * @param {string} file - File to be parsed
 * @returns {{jsdoc: array, yaml: array}} JSDoc comments and Yaml files
 */
export function parseApiFile(file : any) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8' });
  const ext = path.extname(file);

  return parseApiFileContent(fileContent, ext);
}