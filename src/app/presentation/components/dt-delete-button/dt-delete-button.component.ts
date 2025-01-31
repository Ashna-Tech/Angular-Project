import { Component,Input,Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';

@Component({
  selector: 'app-dt-delete-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-delete-button.component.html',
  styleUrl: './dt-delete-button.component.scss'
})
export class DtDeleteButtonComponent {
  @Output() emitter = new Subject<DataTableEventType> ();
  @Input() data = {};

  delete(){
    this.emitter.next({
      cmd:'edit',
      data:this.data
    })
  }
}
