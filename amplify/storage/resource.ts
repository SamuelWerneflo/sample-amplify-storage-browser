import { defineStorage } from '@aws-amplify/backend';

export const muelBucket = defineStorage({
  name: 'samueeel',
  access: (allow) => ({
    '*': [
      allow.groups(['muel']).to(['read', 'write', 'delete'])
    ]
  })
});
