import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppUserAvatar } from './user-avatar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppUserAvatar
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        AppUserAvatar
    ],
})
export class AppUserAvatarModule { }
