import { Directive, Input } from "@angular/core";

@Directive({
    selector: `appButton, app-button, [appButton]`,
    host: {
        'class': 'btn',
        '[class.btn-primary]': `color==="primary"`,
        '[class.btn-secondary]': `color==="secondary"`,
        '[class.btn-tertiary]': `color==="tertiary"`,
    }
})
export class AppButton {
    @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
}