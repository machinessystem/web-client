import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-progress-bar',
    templateUrl: 'progress-bar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppProgressBar {
    @Input() id = 'root';
    state$: Observable<{ active: boolean, transform: string }>;

}