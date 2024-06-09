import { ApiStack } from "./ApiStack";
import * as iam from "aws-cdk-lib/aws-iam";
import { StorageStack } from "./StorageStack";
import { Cognito, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  // cognito
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  // outputs
  stack.addOutputs({
    region: app.region,
    userPoolId: auth.userPoolId,
    userPoolClientId: auth.userPoolClientId,
    identityPoolId: auth.cognitoIdentityPoolId,
    createUser: `
        aws cognito-idp sign-up \
        --region ${app.region} \
        --client-id ${auth.userPoolClientId} \
        --username admin@example.com \
        --password Akoangsimula1!
    `,
    confirmUser: `
        aws cognito-idp admin-confirm-sign-up \
        --region ${app.region} \
        --user-pool-id ${auth.userPoolId} \
        --username admin@example.com
    `,
    createNote: `
        pnpm dlx aws-api-gateway-cli-test \
        --user-pool-id='${auth.userPoolId}' \
        --app-client-id='${auth.userPoolClientId}' \
        --cognito-region='${app.region}' \
        --identity-pool-id='${auth.cognitoIdentityPoolId}' \
        --invoke-url='${api.url}' \
        --api-gateway-region='${app.region}' \
        --username='admin@example.com' \
        --password='Akoangsimula1!' \
        --path-template='/notes' \
        --method='POST' \
        --body='{"content":"hello world","attachment":"hello.jpg"}'
    `
  });

  // return
  return {
    auth,
  };
}
