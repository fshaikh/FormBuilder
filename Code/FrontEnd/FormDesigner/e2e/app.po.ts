import { browser, by, element } from 'protractor';

export class FormDesignerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fd-root h1')).getText();
  }
}
