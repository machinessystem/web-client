import { Instance } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';
import { ProcessService } from './../../../services/process.service';

@Component({
  selector: 'app-instance-select',
  templateUrl: './instance-select.component.html',
  styleUrls: ['./instance-select.component.scss'],
})
export class InstanceSelectComponent implements OnInit, OnDestroy {

  viewCreationFlow: boolean = false;
  instancesSubscription: Subscription;
  instances: Instance[]
  constructor(private instanceService: InstanceService,
    private metaService: MetaService,
    private process: ProcessService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.process.startProgress()
    this.metaService.setTitle('Select or create an instance to work with');
    this.populateInstances();
  }

  ngOnDestroy() {
    if (this.instancesSubscription)
      this.instancesSubscription.unsubscribe();
  }

  populateInstances() {
    this.instancesSubscription = this.instanceService.getUserInstances()
      .pipe(map(res => {
        this.process.stopProgress();
        return res;
      }), catchError(err => {
        this.process.stopProgress();
        return of(null);
      })).subscribe(res => this.instances = res);
  }

  navigateToCreateInstance() {
    this.viewCreationFlow = true;
  }
  navigateToSelectInstance() {
    this.viewCreationFlow = false;
  }

  navigateToInstance(instanceId: string) {
    if (!instanceId) return;
    this.router.navigate([instanceId], { relativeTo: this.route });
  }

  onInstanceCreate(event: any) {
    this.router.navigate(['i', event?.instanceId]);
  }
}
