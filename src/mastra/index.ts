import { Mastra } from '@mastra/core/mastra';
import { registerCopilotKit } from "@ag-ui/mastra";
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';

type WeatherRuntimeContext = {
  "user-id": string;
  "temperature-scale": "celsius" | "fahrenheit";
};

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  server: {
    cors: {
      origin: "*",
      allowMethods: ["*"],
      allowHeaders: ["*"]
    },
    apiRoutes: [
      registerCopilotKit<WeatherRuntimeContext>({
        path: "/copilotkit",
        resourceId: "weatherAgent",
        setContext: (c, runtimeContext) => {
          runtimeContext.set("user-id", c.req.header("X-User-ID") || "anonymous");
          runtimeContext.set("temperature-scale", "celsius");
        }
      })
    ]
  },
});
