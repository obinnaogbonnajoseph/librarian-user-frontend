import { ComponentCanDeactivate } from './component-can-deactivate';
import { FormGroup } from '@angular/forms';

export abstract class FormCanDeactivate extends ComponentCanDeactivate {

  abstract get form(): FormGroup;
  abstract get isSubmitSuccessful(): boolean;

  canDeactivate(): boolean {
    const isDirty = this.form.dirty;
    return !isDirty || this.isSubmitSuccessful;
  }
}
