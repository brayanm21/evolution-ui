import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../evolution-ui.js';

suite('EvolutionUi', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<evolution-ui></evolution-ui>`);
    await el.updateComplete;
  });

  test('instantiating the element with default properties works', () => {
    const element = el.shadowRoot.querySelector('p');
    assert.equal(element.innerText, 'Welcome to Cells');
  });

});
