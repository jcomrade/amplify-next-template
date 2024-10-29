import { defineFunction } from '@aws-amplify/backend';


console.log("this trigerred")

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  // optionally define an environment variable for your group name
  environment: {
    GROUP_NAME: 'EVERYONE'
  }
});