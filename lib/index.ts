/** @module index */

import  { finalizeSpecificationObject }  from './helpers/finalizeSpecificationObject.ts';
import  { updateSpecificationObject }  from './helpers/updateSpecificationObject.ts';
import  { parseApiFileContent }  from './helpers/parseApiFileContent.ts';
import  { createSpecification }  from './helpers/createSpecification.ts';
import  { getSpecificationObject }  from './helpers/getSpecificationObject.ts';


/**
 * Generates the specification.
 * @function
 * @param {object} options - Configuration options
 * @returns {object} Output specification
 * @requires swagger-parser
 */
export function swaggerDoc (options : any) {
  if ((!options.swaggerDefinition || !options.definition) && !options.apis) {
    throw new Error('Provided options are incorrect.');
  }

  try {
    const specificationObject = getSpecificationObject(options);

    return specificationObject;
  } catch (err) {
    console.log(err);
    let msg = err.message;
    if (err.mark && err.mark.buffer && err.mark.line) {
      const { line } = err.mark;
      const bufferParts = err.mark.buffer.split('\n');
      bufferParts[
        line
      ] = `${bufferParts[line]} -------------- Pay attention at this place`;
      msg = bufferParts.join('\n');
    }
    console.warn(msg);
    throw new Error(err);
  }
}

export {
  createSpecification,
  parseApiFileContent,
  updateSpecificationObject,
  finalizeSpecificationObject,
}
