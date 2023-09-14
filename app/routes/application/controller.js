import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked result;

  @action
  myAction() {
    this.result = this.result ? null : 'called my action';
  }
}
