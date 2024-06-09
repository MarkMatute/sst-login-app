import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // api
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
      authorizer: 'iam',
    },
    cors: true,
    routes: {
      "POST /notes": "packages/functions/src/create.main",
    },
  });

  // output
  stack.addOutputs({
    apiUrl: api.url,
  });

  // return
  return {
    api,
  };
}
