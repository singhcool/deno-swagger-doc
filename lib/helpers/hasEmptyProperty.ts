/**
 * Checks if there is any properties of @obj that is a empty object
 * @function
 * @param {object} obj - the object to check
 */
export function hasEmptyProperty(obj : any) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .every(
      (keyObject) =>
        typeof keyObject === 'object' &&
        Object.keys(keyObject).every((key) => !(key in keyObject))
    );
}