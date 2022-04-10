/**
 * Parses jsDocs containing @swagger-enum to openapi definition of followed enum
 * 
 * @param content file content
 * @param jsDoc matched jsDoc
 * @returns {
 *  jsDoc: string - new jsDoc containing enum definition
 *  content: string - new content without processed enums
 * }
 */
export function swaggerEnumParser(content: string, jsDoc: string): {content: string, jsDoc: string} {
  if (jsDoc.indexOf('@swagger-enum') !== -1) {
    const endOfJsDocComment = content.indexOf(jsDoc) + jsDoc.length;
    content = content.substring(endOfJsDocComment);
    const [_all, enumName, enumDef] = content.match(/enum\s([^\s]*)\s{([^}]*)}/m) as RegExpMatchArray;
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
        return {
          content,
          jsDoc: `/**
 * @swagger
 * components:
 *   schemas:
 *     ${enumName}:
 *       type: ${type}
 *       enum:
${itemsString} */`
        };
      }
    }
  }
  // no swagger-enum present
  return { content, jsDoc };
}