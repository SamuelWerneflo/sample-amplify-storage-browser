import { defineStorage } from '@aws-amplify/backend';

export const muelBucket = defineStorage({
  name: 'samueeel',
  access: (allow) => ({
    'test/*': [
      allow.groups(['muel']).to(['read', 'write', 'delete'])
    ]
  })
});
