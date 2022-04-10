import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { swaggerDoc } from "../mod.ts";
import { SwaggerJson } from './testData.ts';
import { SwaggerJsonV3 } from './testDataV3.ts';

  Deno.test('swaggerDoc() v2', async () => {
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

    const swaggerSpec = await swaggerDoc(options);
    assertEquals(swaggerSpec, JSON.parse(SwaggerJson));
  });

Deno.test('swaggerDoc() v3', async () => {
  const swaggerDefinition = {
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'A sample API',
    },
    openapi: '3.0.0',
  };

  const options = {
    swaggerDefinition,
    apis: ['./example/v3/routes.ts', './example/v3/enum.ts', './example/v3/**/*.yaml'],
  };

  const swaggerSpec = await swaggerDoc(options);
  assertEquals(swaggerSpec, JSON.parse(SwaggerJsonV3));
});
