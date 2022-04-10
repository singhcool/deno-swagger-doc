import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routes.ts";
import { swaggerDoc } from "../../mod.ts";

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8000`, // Host (optional)
  basePath: '/', // Base path (optional)
  swagger: '2.0', // Swagger version (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./example/v2/routes.ts', './example/v2/**/*.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerDoc(options);


const app = new Application();
app.use(async (context, next) => {
  if(context.request.url.pathname === '/swagger.json'){
    context.response.headers.set('Content-Type', 'application/json');
    context.response.status = 200;
    context.response.body = swaggerSpec
  }else{
    await next();
  } 
});
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });