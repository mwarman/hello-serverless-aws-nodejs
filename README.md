# Hello World - Serverless Framework

## Summary
A sample project for the [Serverless Framework](https://serverless.com) using [AWS](https://aws.amazon.com/) and [Node.js](https://nodejs.org).

See the [Serverless Guide for AWS](https://serverless.com/framework/docs/providers/aws/guide/intro/).

### Features

Use the Serverless Framework with AWS to:

* Create Node.js Lambda Functions implementing CRUD functionality for a single DynamoDB Table
* Develop locally
* Implement Unit Tests with Mocks and Spies where appropriate
* Implement source code style conformity via JavaScript Linter rules
* Deploy to AWS _dev_ from local
* Create API Gateway Methods forming a RESTful API for each of the Lambda Functions
* CORS support on API
* Use Cognito User Pools to Secure API <sup>1</sup>

<sup>1</sup> Feature in Future Release

## Setup
### Languages

* ES6 JavaScript
* YAML
* JSON

### Editor

You may use any plain text editor. The recommended editor is [Atom](https://atom.io) with the `linter-eslint` package for code style rule feedback.

### Install

Fork the [hello-serverless-aws-nodejs](https://github.com/mwarman/hello-serverless-aws-nodejs) GitHub repository. Clone the project to your local machine.

The following packages must be installed on a development machine:

* Node 6.11.x
* npm 3.10.x
* serverless >=1.23.0 <2.0.0

After installing the dependencies listed above, open a terminal navigate to the project base directory, and run:
```

npm install

```

### Running

The project uses **npm** and **serverless** command line interface (CLI) commands to perform tasks. The following sections describe how to perform the most common activities.

#### Run Tests

To run the project's unit and integration tests, issue the following command.

```

npm test

```

#### Lint the Source Code

To ensure the source code complies with style rules, run the ESLint linter by issueing the following command.

```

npm run lint

```

**Note:** The ESLint utility integrates with many text editors including Atom. If you use Atom, install the `linter` and `linter-eslint` packages to lint code changes in real-time.

#### Create Custom Domain

Each stage of the project (dev, qa, prod) has a uniquely named custom domain under which the RESTful API is hosted. To create the custom domains in API Gateway, run command for the *dev* stage below. If you wish, you may run the commands for all stages.

```

# Development
serverless create_domain

# Test
serverless create_domain --stage qa

# Production
serverless create_domain --stage prod

```

#### Deploy to AWS

To create all AWS resources and deploy the application, run the following command. Use the `--stage` option to deploy to `qa` or `prod`.

```

serverless deploy -v

```

**Note:** The `-v` option is short for `--verbose`. This optional flag instructs serverless to provide detailed, real-time progress from AWS as the deployment operation is executed.

#### Cleanup

To remove all AWS resources, run the following command. Use the `--stage` option to cleanup the `qa` or `prod` environments.

```

serverless remove -v

```

## Technology Stack

### Production

#### Application

* [AWS SDK](https://aws.amazon.com/sdk-for-node-js/)
* [uuid](https://www.npmjs.com/package/uuid)
* [Lodash](https://lodash.com/)

### Development

#### Operational

* [Serverless Domain Manager](https://www.npmjs.com/package/serverless-domain-manager)

#### Testing

* [Mocha](http://mochajs.org/)
* [Expect](https://facebook.github.io/jest/docs/en/expect.html)
* [rewire](https://www.npmjs.com/package/rewire)
* [Sinon](http://sinonjs.org/)

#### Linting

* [ESLint](https://eslint.org/)
