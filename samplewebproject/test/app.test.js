const { italic } = require('chalk');

const assert = require('assert');

//* Check for input
it('has a text input', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');

  assert(input);
});
