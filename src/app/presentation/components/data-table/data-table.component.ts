import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { DtActiveInactiveButtonComponent } from '../dt-active-inactive-button/dt-active-inactive-button.component';
import { DtEditButtonComponent } from '../dt-edit-button/dt-edit-button.component';
import { DtDeleteButtonComponent } from '../dt-delete-button/dt-delete-button.component';
import { Router, UrlTree, PRIMARY_OUTLET } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { DataTableEventType } from '../../../core/domain/datatable/DataTableEventType.model';
import { assetsPath } from '../../../../environement';
import { DtViewButtonComponent } from '../dt-view-button/dt-view-button.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [DataTablesModule,DtActiveInactiveButtonComponent,DtEditButtonComponent,DtDeleteButtonComponent, DtViewButtonComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective | undefined;

  @Input() tableCols: TableColType[] = [];

  @Input() dataObs: Observable<any> | undefined;

  @Input() activeFlag:string  = '';

  @Input() deactiveFlag:string  = '';
  
  @Input() flagColIndex: number = 0; 

  @Input() isEditNotNeeded:boolean = false;

  @Input() isDeleteNotNeeded:boolean = false;

  @Input() isAddButtonNeeded:boolean = false;

  @Input() assetsImgPath:string = assetsPath;

  @Input() lengthMenu = [10,20,50,100];

  @Output() Edit: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Remove: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Add: EventEmitter<any> = new EventEmitter<any> ();

  @Output() ToggleActive: EventEmitter<any> = new EventEmitter<any> ();

  @Output() onMarkAsDelivered: EventEmitter<any> = new EventEmitter<any> ();

  @Output() Show: EventEmitter<any> = new EventEmitter<any> ();

  @Output() View: EventEmitter<any> = new EventEmitter<any> ();


  permissionSubscription: Subscription | undefined;
  dataObsSubscription: Subscription | undefined;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  toggleDeleteType: string = 'A';

  @ViewChild('edit') editNg: TemplateRef<DtEditButtonComponent> | undefined;
  @ViewChild('removeNg') removeNg: TemplateRef<DtDeleteButtonComponent> | undefined;
  @ViewChild('viewNg') viewNg: TemplateRef<DtViewButtonComponent> | undefined;
  @ViewChild('activeToinactiveNg') activeToinactiveNg: TemplateRef<DtActiveInactiveButtonComponent> | undefined;
  
  

  hasData:boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtOptions = {
        processing: true,
        ajax: (dataTablesParameters: any, callback: any) => {
          if (this.dataObs) {
            this.dataObsSubscription =  this.dataObs.subscribe({
                next: resp => {
                  callback({
                    recordsTotal: resp.length,
                    data: resp
                  });
                },
                error: (error) => {
                  callback({
                    recordsTotal: 0,
                    data:[]
                  });
                }
            })
          }
        },
        columns: this.colums(),
        responsive: true,
        autoWidth: false,
        lengthMenu: this.lengthMenu,
      };
      this.dtTrigger.next(this.dtOptions);
      this.hasData = true;
    }, 200);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }

    if(this.dataObsSubscription){
      this.dataObsSubscription.unsubscribe();
    }
  }

  getLastRouteString() {
    const url = this.router.url;
    const tree: UrlTree = this.router.parseUrl(url);
    const segments = tree.root.children[PRIMARY_OUTLET].segments;
    const lastSegment = segments.at(segments.length - 1);
    if (lastSegment !== undefined) {
      return lastSegment.path;
    }

    return '';
  }

  colums() {
    const colums: any = [];
    if(!this.isEditNotNeeded){
      colums.push({
        title:'Edit',
        width:'40px',
        name: 'edit',
        data: '_id',
        className: 'dt-center editor-edit',
        defaultContent: '',
        ngTemplateRef: {
          ref: this.editNg,
          context: {
            captureEvents: this.onEdit.bind(this),
          }
        }
      })
    }
  
    this.tableCols.forEach(col => {
      if(col.type === 'text'){
        colums.push({ title: col.title, data: col.data, width: col.width});
      }
      
      else if(col.type === "active-inactive"){
        colums.push({
          title: col.title,
          name: col.title,
          data: null,
          className: 'dt-center editor-edit',
          render: function (data: any, type: any, row: any) {
            return data[col.data] ? '<span style="color:green;">Active</span>' : '<span style="color:red;">InActive</span>';
          },
          orderable: false
        })
      }

      else if(col.type === "toggle"){
        colums.push({
          title:'IsActive',
          name: 'IsActive',
          width:'80px',
          data: 'isActive',
          className: 'dt-center editor-edit',
          defaultContent: '',
          ngTemplateRef: {
            ref: this.activeToinactiveNg,
            context: {
              captureEvents: this.onToggleActive.bind(this),
            }
          }
        })
      }

      else if(col.type === "view"){
        colums.push({
          title:'View',
          name: 'View',
          width:'80px',
          data: col.data,
          className: 'dt-center editor-edit',
          defaultContent: '',
          ngTemplateRef: {
            ref: this.viewNg,
            context: {
              captureEvents: this.onView.bind(this),
            }
          }
        })
      }

      else if(col.type === "custom"){
        colums.push({
          title: col.title,
          name: col.title,
          width: col.width,
          data: '',
          className: 'dt-center editor-edit',
          defaultContent: '',
          ngTemplateRef: {
            ref:col.ref,
            context:col.context
          }
        })
      }

      else if(col.type === "renderF"){
        colums.push({
          title: col.title,
          name: col.title,
          width: col.width,
          data: col.data,
          className: 'dt-center editor-edit',
          render: col.renderF,
          orderable: false
        })
      }
  
      else if(col.type === 'img'){
        colums.push({
          title: col.title,
          name: col.title,
          data: null,
          className: 'dt-center editor-edit',
          render: function (data: any, type: any, row: any) {
            const url = assetsPath + data[col.data];
            if(url){
              return '<img style="width:150px;height:100%;" src="' + url +'" class="img-data" >';
            }else{
              return 'null';
            }
          },
          orderable: false
        })
      }
      else if(col.type === 'toggle2'){
        colums.push({
          title:col.title,
          name: 'IsActive',
          width:'150px',
          data: col.data,
          className: 'dt-center editor-edit',
          defaultContent: '',
          ngTemplateRef: {
            ref: this.activeToinactiveNg,
            context: {
              fieldName:'isShowInApp',
              captureEvents: col.method,
            }
          }
        })
      }
      else if(col.type === 'array'){
        colums.push({
          title: col.title,
          name: col.title,
          data: col.data,
          className: 'dt-center editor-edit',
          render: function (data: any[], type: any, row: any) {
            return data ? data.toString() : '';
          },
          orderable: false
        })
      }
    });

    if(!this.isDeleteNotNeeded){
      colums.push({
        title:'Delete',
        name: 'Delete',
        width:'40px',
        data: '_id',
        className: 'dt-center editor-edit',
        defaultContent: '',
        ngTemplateRef: {
          ref: this.removeNg,
          context: {
            captureEvents: this.onDelete.bind(this),
          }
        }
      })
    }
    
    return colums;
  }

  reloadTable() {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.ajax.reload();
      });
    }
  }

  onEdit(event: DataTableEventType) {
    this.Edit.emit(event.data);
  }

  onDelete(event: DataTableEventType) {
    this.Remove.emit(event.data);
  }

  onAdd(event: DataTableEventType) {
    this.Add.emit(event.data);
  }

  onShow(event: DataTableEventType) {
    this.Show.emit(event.data);
  }

  onToggleActive(event: DataTableEventType){
    this.ToggleActive.emit(event.data);
  }

  onDelivered(event: DataTableEventType){
    this.onMarkAsDelivered.emit(event.data);
  }

  onView(event: DataTableEventType){
    this.View.emit(event.data);
  }
}
