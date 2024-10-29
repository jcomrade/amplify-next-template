import type { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "$amplify/env/post-confirmation";

const client = new CognitoIdentityProviderClient({ region: 'ap-southeast-1' });

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log("THIS TRIGERRED", event);
  const command = new AdminAddUserToGroupCommand({
    GroupName: "EVERYONE",
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });
  const response = await client.send(command);
  console.log("processed", response.$metadata.requestId);
  return event;
};
