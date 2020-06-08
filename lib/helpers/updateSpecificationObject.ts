import { addDataToSwaggerObject } from './specification.ts';
import  { filterJsDocComments }  from './filterJsDocComments.ts';

/**
 * Given an api file parsed for its jsdoc comments and yaml files, update the
 * specification.
 *
 * @param {object} parsedFile - Parsed API file.
 * @param {object} specification - Specification accumulator.
 */
export function updateSpecificationObject(parsedFile :any, specification: any) {
  addDataToSwaggerObject(specification, parsedFile.yaml);

  addDataToSwaggerObject(
    specification,
    filterJsDocComments(parsedFile.jsdoc)
  );
}