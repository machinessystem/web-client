import { Component, Input, ElementRef, Attribute, OnInit } from "@angular/core";


@Component({
    selector: 'ngp-icon',
    template: `
            <svg class="icon">
                <use [attr.xlink:href]="href"/>
            </svg>
            `,
    exportAs: 'ngpIcon',
    styleUrls: ['icon.scss'],
    host: {
        'role': 'img',
        'class': 'ngp-icon'
    }
})
export class NgpIcon implements OnInit {
    href: string;
    @Input('icon') icon: string;
    @Input('mode') mode: 'light' | 'regular' | 'solid' | 'duotone' | 'brands' = 'light';
    ngOnInit() {
        this.href = `assets/icons/${this.mode}.svg#${this.icon}`;
    }
}