import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';

@Component({
  selector: 'app-dt-view-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-view-button.component.html',
  styleUrl: './dt-view-button.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DtViewButtonComponent {
  @Output() emitter = new Subject<DataTableEventType> ();
  @Input() data = {};

  view(){
    this.emitter.next({
      cmd:'view',
      data:this.data
    })
  }
}
