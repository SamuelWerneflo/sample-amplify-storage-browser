import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { muelBucket } from "./storage/resource";
import { Policy, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth
});

backend.addOutput({
  version: "1.3",
  storage: {
    aws_region: "eu-north-1",
    bucket_name: "samueeel",
    buckets: [
      {
      	name: "samueeel",
      	bucket_name: "samueeel",
      	aws_region: "eu-north-1",
      	paths: {
      		"*": {
      			groupsmuel: ["get", "list", "write", "delete"],
      		},
      	},
      },
      {
      	name: "samuel-glue-test",
      	bucket_name: "samuel-glue-test",
      	aws_region: "eu-north-1",
      	paths: {
      		"*": {
      			groupsdl: ["get", "list", "write", "delete"],
      		},
      	},
      }
    ],
  },
});



/**
 * Note: This code assumes the existence of an S3 bucket named 'my-existing-bucket'.
 * Replace 'my-existing-bucket' with your actual bucket name and adjust the paths and permissions as needed.
 * For more information on authorization access, visit: https://docs.amplify.aws/react/build-a-backend/storage/authorization/#available-actions
 *
 * Requirements for this sample:
 * 1. An S3 bucket named 'my-existing-bucket' must exist in your AWS account.
 * 2. The bucket should contain two folders:
 *    - 'public/' - Accessible by all authenticated and unauthenticated users.
 *    - 'admin/' - Accessible only by users in the admin group and authenticated users.
 *
 * Note: Ensure the bucket exists before deploying this code, as it only sets up IAM policies and does not create the S3 bucket.
 */


/**
 * Define an inline policy to attach to Admin user role
 * This policy defines how authenticated users can access your existing bucket
 */
const muelPolicy = new Policy(backend.stack, "customBucketMuelPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      resources: [`arn:aws:s3:::samueeel/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [
        `arn:aws:s3:::samueeel`,
        `arn:aws:s3:::samueeel/*`
      ],
    }),
  ],
});

const muelPolicy = new Policy(backend.stack, "customBucketDlPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      resources: [`arn:aws:s3:::samuel-glue-test/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [
        `arn:aws:s3:::samuel-glue-test`,
        `arn:aws:s3:::samuel-glue-test/*`
      ],
    }),
  ],
});

// Add the policies to the muel user role
backend.auth.resources.groups["muel"].role.attachInlinePolicy(muelPolicy);
backend.auth.resources.groups["dl"].role.attachInlinePolicy(dlPolicy);
