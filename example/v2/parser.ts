/**
 * @swagger-enum
 */
export enum TestingEnum {
  VALUE1,
  VALUE2,
  VALUE3
}

/**
 * @swagger-enum
 */
export enum TestingEnumWithCustomValues {
  VALUE1 = 'val1',
  VALUE2 = 'val2',
  VALUE3 = 'val3'
}

export type TestType = string | number;

export interface TestInterface {
  name: string;
  type: TestType;
  enum: TestingEnum;
}