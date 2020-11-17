import {
    Component, Input, Output, EventEmitter, QueryList, ContentChildren,
    AfterContentInit, ViewChild, TemplateRef, ContentChild, AfterViewInit
} from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'app-form-submit-button',
    templateUrl: './form-submit-button.html',

})
export class AppFormSubmitButton {
    @Input('formGroup') form: FormGroup;
    @Input('ngForm') ngForm: NgForm;
    @Input('appearance') className: string = "btn btn-primary";
    @Input('disabled') disabled: boolean = false;
    @ViewChild(TemplateRef) content: TemplateRef<any>;
}

@Component({
    selector: 'app-form-field',
    templateUrl: './form-field.html'
})
export class AppFormField {
    @Input('name') name: string;
    @Input('type') type: string;
    @Input('placeholder') placeholder: string;
    @Input('label') label: string;
    @Input('appearance') appearance: string;
    @Input('formGroup') form: FormGroup;
    @Input('ngForm') ngForm: NgForm;
}


@Component({
    selector: 'app-form',
    templateUrl: 'form.html'
})
export class AppForm implements AfterContentInit, AfterViewInit {

    @ContentChildren(AppFormField) formFields: QueryList<AppFormField>;
    @Input('formGroup') formGroup: FormGroup;
    @Output('onSubmit') onSubmit = new EventEmitter();
    @ViewChild('_form') ngFrom: NgForm;
    @ContentChild(AppFormSubmitButton) submitBtn: AppFormSubmitButton;

    constructor() {

    }

    ngAfterContentInit() {
        this.submitBtn.form = this.formGroup;

        this.formFields.forEach(field => {
            field.form = this.formGroup;
        })
    }

    ngAfterViewInit() {
        this.submitBtn.ngForm = this.ngFrom;
        this.formFields.forEach(field => {
            field.ngForm = this.ngFrom;
        })
    }

    handleSubmit(form: FormGroup) {
        this.onSubmit.emit(form);
    }
}
