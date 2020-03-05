import { FormGroup, FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class FormUtils {
  constructor(private translate: TranslateService) { }

  static getAllControlErrors(
    form: FormGroup,
    formControlName: string
  ): Array<string> {
    if (
      !form ||
      !form.get(formControlName) ||
      !form.get(formControlName).errors
    ) {
      return;
    }

    return Object.keys(form.get(formControlName).errors);
  }

  getControlErrorMessages(form: FormGroup, formControlName: string) {

    if (!FormUtils.getAllControlErrors(form, formControlName)) {
      return;
    }
    const items = this.translate.instant(
      FormUtils.getAllControlErrors(form, formControlName).map(error => `errorMessages.${error}`)
    );

    return Object.keys(items).map(item => items[item]);
  }


  displayControlErrors(form: FormGroup, formControlName: string) {
    const control = form.get(formControlName);
    if (!form || !control) {
      return;
    }
    return control.invalid && control.dirty;
  }


  static markFormAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls)
      .map((formControlName: string) => formGroup.controls[formControlName])
      .forEach((control: FormGroup) => {
        control.markAsDirty();
        if (control.controls) {
          this.markFormAsDirty(control);
        }
      });
  }
}
