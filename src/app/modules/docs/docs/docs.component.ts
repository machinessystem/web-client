import { Component, OnInit } from '@angular/core';
import { DocService } from './../../../services/doc.service';
import { Doc } from './../../../models/doc.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  docs$: Observable<Doc[]>;
  constructor(private docService: DocService) { }

  ngOnInit(): void {
    this.docs$ = this.docService.getDocumentations()
  }
}
