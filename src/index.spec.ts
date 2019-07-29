import anyTest, { ExecutionContext, TestInterface } from 'ava';
import sinon from 'sinon';
import Serverless from 'serverless';

import Plugin from './index';

const test = anyTest as TestInterface;

let sandbox: sinon.SinonSandbox;
test.beforeEach((): void => {
  sandbox = sinon.createSandbox();
});

test.afterEach((): void => {
  sandbox.restore();
});

test('can instantiate the plugin', (t: ExecutionContext): void => {
  const sls = sandbox.createStubInstance(Serverless);
  sls.variables = {
    getValueFromSource: sandbox.stub(),
  };

  t.log('sls:', sls);

  const plugin = new Plugin(sls);

  t.truthy(plugin instanceof Plugin);
});
