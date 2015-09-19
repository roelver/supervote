'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Your votes please!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/stats.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('Voting is fun');
  });
});
