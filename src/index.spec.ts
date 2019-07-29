import test, { ExecutionContext } from 'ava';

// Basic Poking
const fn = (): string => 'foo';

test('fn() returns foo', (t: ExecutionContext): void => {
  t.is(fn(), 'foo');
  t.log(`${1 + 1}: test`);
});

test.todo('can instantiate the plugin');
