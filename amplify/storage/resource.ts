import { defineStorage } from '@aws-amplify/backend';

export const muelBucket = defineStorage({
  name: 'samueeel',
  access: (allow) => ({
    'test/*': [
      allow.groups(['muel']).to(['read', 'write', 'delete'])
    ],
    'test2/*': [
      allow.groups(['muel']).to(['read', 'write', 'delete'])
    ],
  })
});
