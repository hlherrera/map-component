import { MapDemoPage } from './app.po';

describe('map-demo App', function() {
  let page: MapDemoPage;

  beforeEach(() => {
    page = new MapDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
