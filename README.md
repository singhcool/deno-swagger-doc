# deno-swagger-doc

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/deno_swagger_doc/mod.ts)

Document your code and keep a live and reusable OpenAPI (Swagger) specification. This specification can be the core of your API-driven project: generate
documentation, servers, clients, tests and much more based on the rich [OpenAPI ecosystem of tools](http://swagger.io/).

## Supported versions

- OpenAPI 3.x
- Swagger 2.0

To make sure your end specification is valid, do read the most up-to date official [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification).

## Useage

**swagger-jsdoc** enables you to integrate [Swagger](http://swagger.io)
using [`JSDoc`](https://jsdoc.app/) comments in your code. Just add `@swagger` on top of your DocBlock and declare the meaning of your code in YAML complying to the OpenAPI specification.

```ts
import { swaggerDoc } from "https://deno.land/x/deno_swagger_doc/mod.ts";

const swaggerDefinition = {
  info: {
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8000`, // Host (optional)
  basePath: '/', // Base path (optional)
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./example/v2/routes.ts', './example/v2/parameters.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerDoc(options);

app.use(async (context, next) => {
  if(context.request.url.pathname === '/swagger.json'){
    context.response.headers.set('Content-Type', 'application/json');
    context.response.status = 200;
    context.response.body = swaggerSpec
  }else{
    await next();
  } 
});
```
## Note

Run the App with --unstable

`denon run --allow-net --allow-read  --unstable ./example/v2/app.ts`

If you facing any issue due to TypeScript type checking

`denon run --no-check --allow-net --allow-read  --unstable ./example/v2/app.ts`

## Stay in touch

* Author - [Raja SIngh](https://www.linkedin.com/in/raja-singh-a097458a/)
* Medium - [@singhcoolish](https://medium.com/@singhcoolish)
* LinkedIn - [raja-singh-a097458a](https://www.linkedin.com/in/raja-singh-a097458a/)

