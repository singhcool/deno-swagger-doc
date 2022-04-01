import jsYaml from 'https://dev.jspm.io/js-yaml';
import doctrine from 'https://dev.jspm.io/doctrine';


/**
 * Parse the provided API file content.
 *
 * @function
 * @param {string} fileContent - Content of the file
 * @param {string} ext - File format ('.yaml', '.yml', '.js', etc.)
 * @returns {{jsdoc: array, yaml: array}} JSDoc comments and Yaml files
 * @requires doctrine
 */
export function parseApiFileContent(fileContent: any, ext: any) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//gm;
  const yaml = [];
  const jsDocComments = [];

  if (ext === '.yaml' || ext === '.yml') {
    yaml.push(jsYaml.load(fileContent));
  } else {
    const regexResults = fileContent.match(jsDocRegex);
    if (regexResults) {
      for (let i = 0; i < regexResults.length; i += 1) {
        if (regexResults[i].indexOf('@swagger-enum') !== -1) {
          const endOfJsDocComment = fileContent.indexOf(regexResults[i]) + regexResults[i].length;
          fileContent = fileContent.substring(endOfJsDocComment);
          const [all, enumName, enumDef] = fileContent.match(/enum\s([^\s]*)\s{([^}]*)}/m);
          if (enumName && enumDef) {
            const enumItems = enumDef.split(/[\r\n]+/).filter((i: string) => i.trim() !== '');
            if (enumItems.length) {
              let itemsString = '';
              let type = 'number';
              enumItems.forEach((item: string) => {
                if (item.indexOf('=') === -1) {
                  itemsString += '*         - ' + item.trim().replace(/,$/, '') + '\n';
                } else {
                  const itemParts = item.split('=');
                  if (Number.isNaN(Number(itemParts[1].trim().replace(/,$/, '')))) {
                    type = 'string';
                  }
                  itemsString += ' *         - ' + itemParts[1].trim().replace(/,$/, '') + '\n';
                }
              });
              regexResults[i] = `/**
 * @swagger
 * components:
 *   schemas:
 *     ${enumName}:
 *       type: ${type}
 *       enum:
${itemsString} */`;
            }
          }
        }
        const jsDocComment = doctrine.parse(regexResults[i], { unwrap: true });
        jsDocComments.push(jsDocComment);
      }
    }
  }

  return {
    yaml,
    jsdoc: jsDocComments,
  };
}