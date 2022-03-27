import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { swaggerDoc } from "../mod.ts";
import { SwaggerJson } from './testData.ts';

const swaggerDefinition = {
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'A sample API',
    },
    host: `localhost:8000`,
    basePath: '/',
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./example/v2/routes.ts', './example/v2/**/*.yaml'],
  };

  Deno.test('swaggerDoc()', async () => {
    const swaggerSpec = swaggerDoc(options);
    assertEquals(swaggerSpec, JSON.parse(SwaggerJson));
  });
