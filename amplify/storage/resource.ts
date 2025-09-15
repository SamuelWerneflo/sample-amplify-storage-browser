import { defineStorage } from '@aws-amplify/backend';

export const dlBucket = defineStorage({
  name: 'dl.muel.nu',
  access: (allow) => ({
    '*': [
      allow.groups(['dl']).to(['read', 'write', 'delete'])
    ]
  })
});

export const muelBucket = defineStorage({
  name: 'muel.nu',
  access: (allow) => ({
    '*': [
      allow.groups(['muel']).to(['read', 'write', 'delete'])
    ]
  })
});
