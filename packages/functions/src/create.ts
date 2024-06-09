import handler from "@notes2/core/handler";
import dynamodb from "@notes2/core/dynamodb";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v1 } from "uuid";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
  if (!event.body) {
    throw new Error("Bad request");
  }

  const data: any = JSON.parse(event.body);

  const params: DocumentClient.PutItemInput = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: v1(),
      content: data.content,
      attachement: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamodb.put(params);

  return JSON.stringify(params.Item);
});
