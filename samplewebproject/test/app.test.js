const { italic } = require('chalk');

const assert = require('assert');
const render = require('../../render');

//* Check for input
it('has a text input', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');

  assert(input);
});

//* Shows a valid email message
it('shows a success message with a valid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'adsfadfasd@sdf.com';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Looks good!')
});

//* Shows a invalid email message
it('shows a success message with a valid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'adsfadfasdsdf.com';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Invalid email')
});
