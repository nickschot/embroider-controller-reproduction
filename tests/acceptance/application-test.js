import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'embroider-controller-reproduction/tests/helpers';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    await click('[data-test-button]');
    assert.dom('[data-test-result]').hasText('called my action');
  });
});
