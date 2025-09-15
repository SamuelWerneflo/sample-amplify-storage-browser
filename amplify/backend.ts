import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { muelBucket } from "./storage/resource";
import { Policy, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  muelBucket
});
