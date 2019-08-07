import anyTest, { ExecutionContext, TestInterface } from 'ava';
import sinon, { SinonSandbox, SinonStubbedInstance } from 'sinon';
import Serverless from 'serverless';
import semver from 'semver';

import Plugin from './index';
import * as Package from '../package.json';

// note: https://github.com/avajs/ava/blob/master/docs/recipes/typescript.md
const test = anyTest as TestInterface;

interface SinonContext {
  sandbox: SinonSandbox;
}

interface KnownServerlessVariables {
  getValueFromSource?(variable: string): string;
}

interface ServerlessWithVariables extends Serverless {
  // note: disabled because sls.variables is fluid.
  //// eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: KnownServerlessVariables;
}

interface ServerlessContext {
  sls: SinonStubbedInstance<ServerlessWithVariables>;
}

interface InstrumentationContext {
  plugin: Plugin;
  delegateStub: sinon.SinonStub;
}

interface TestContext extends SinonContext, ServerlessContext, InstrumentationContext {}

test.beforeEach((t: ExecutionContext<TestContext>): void => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sls = t.context.sandbox.createStubInstance(Serverless);

  t.context.delegateStub = t.context.sandbox.stub();

  t.context.sls.variables = {
    getValueFromSource: t.context.delegateStub,
  };

  t.context.sls.cli = {
    log: (...params): null => {
      t.log(params);
      return null;
    },
  };

  t.context.plugin = new Plugin(t.context.sls);
  t.not(t.context.plugin, null);

  t.log(t.context);
  t.log('sls:', t.context.sls);
  // t.fail('trigger fail');
});

test.afterEach((t: ExecutionContext<TestContext>): void => {
  t.context.sandbox.restore();
  // sandbox.restore();
});

test('delegates to the original method if not requesting a package variable', (t: ExecutionContext<
  TestContext
>): void => {
  const variable = t.context.sls.variables.getValueFromSource('notpackage');

  t.not(variable, undefined);
  t.falsy(t.context.delegateStub.calledWith('notpackage'));
});

test('returns an empty string if the variable does not exist', (t: ExecutionContext<
  TestContext
>): void => {
  const variable = t.context.sls.variables.getValueFromSource('package:something');

  // Gets a blank variable if the variable does not exist in package.json.
  t.is(variable, '');
});

test('returns the package version', (t: ExecutionContext<TestContext>): void => {
  const variable = t.context.sls.variables.getValueFromSource('package:version');

  t.is(variable, Package.version);
  t.falsy(t.context.delegateStub.called);
});

test('returns semver major version', (t: ExecutionContext<TestContext>): void => {
  const variable = t.context.sls.variables.getValueFromSource('package:semver.major');

  t.log(variable);
  t.is(variable, semver.major(Package.version));
});

test('returns a blank string the semver function does not exist', (t: ExecutionContext<
  TestContext
>): void => {
  const variable = t.context.sls.variables.getValueFromSource('package:semver.doesnotexist');

  t.is(variable, '');
});

test('returns a blank string if package.json version is empty', (t: ExecutionContext<
  TestContext
>): void => {
  sinon.stub((t.context.plugin as any).packageJson, 'version').value(undefined);
  const variable = t.context.sls.variables.getValueFromSource('package:semver.major');

  t.is(variable, '');
});
