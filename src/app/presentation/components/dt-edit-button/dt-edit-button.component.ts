import { Component,Output,Input} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';
@Component({
  selector: 'app-dt-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-edit-button.component.html',
  styleUrl: './dt-edit-button.component.scss'
})
export class DtEditButtonComponent {
  @Output() emitter = new Subject<DataTableEventType> ();
  @Input() data = {};

  edit(){
    this.emitter.next({
      cmd:'edit',
      data:this.data
    })
  }
}
