import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dt-active-inactive-button',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './dt-active-inactive-button.component.html',
  styleUrl: './dt-active-inactive-button.component.scss'
})
export class DtActiveInactiveButtonComponent {
  FieldName:string = 'isActive';

  @Output() emitter = new Subject<DataTableEventType> ();
  @Input() set fieldName(value:string){
    if(value){
      this.FieldName = value;
    }  
  }

  @Input() data:any = {};

  toggle(){
    this.emitter.next({
      cmd:'edit',
      data:this.data
    })
  }
}
