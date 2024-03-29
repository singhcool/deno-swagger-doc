import { createSpecification } from './createSpecification.ts';
import { parseApiFile } from './parseApiFile.ts';
import { finalizeSpecificationObject } from './finalizeSpecificationObject.ts';
import { updateSpecificationObject } from './updateSpecificationObject.ts';


export function getSpecificationObject(options: any) {
  // Get input definition and prepare the specification's skeleton
  const definition = options.swaggerDefinition || options.definition;
  const specification = createSpecification(definition);

  // Parse the documentation containing information about APIs.
  const apiPaths = options.apis;

  for (let i = 0; i < apiPaths.length; i += 1) {
    const parsedFiles = parseApiFile(apiPaths[i]);
    parsedFiles.forEach(parsedFile => {
      updateSpecificationObject(parsedFile, specification);
    });
  }

  return finalizeSpecificationObject(specification);
}