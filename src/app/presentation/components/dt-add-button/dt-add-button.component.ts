import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';

@Component({
  selector: 'app-dt-add-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-add-button.component.html',
  styleUrl: './dt-add-button.component.scss'
})
export class DtAddButtonComponent {
  @Output() emitter = new Subject<DataTableEventType> ();
  @Input() data = {};

  add(){
    this.emitter.next({
      cmd:'edit',
      data:this.data
    })
  }
}
