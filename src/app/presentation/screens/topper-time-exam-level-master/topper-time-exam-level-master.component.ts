import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { TopperTimeExamLevelService } from '../../../services/topper-time-exam-level-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-topper-time-exam-level-master',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './topper-time-exam-level-master.component.html',
  styleUrl: './topper-time-exam-level-master.component.scss'
})

export class TopperTimeExamLevelMasterComponent implements OnInit {

  isUpdateMode: boolean = false;
  TopperTimeExamMasterLevelForm: FormGroup = new FormGroup({
    name: new FormControl('', [])
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editTopperTimeExamLevelId: string = "";

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(private topperTimeExamLevelService: TopperTimeExamLevelService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataObs = this.topperTimeExamLevelService.GetTopperTimeExamLevelList();
    this.tableCols = [
      { title: 'Exam Level', data: 'name', type: 'text' },
    ];
  }


  get Name() {
    return this.TopperTimeExamMasterLevelForm.get('name');
  }

  createTopperTimeExamLevel() {
    const name = this.Name?.value;

    this.topperTimeExamLevelService.CreateTopperTimeExamLevel(name).subscribe({
      next: (response => {
        this.toastrService.success('Topper Time Exam Level Created Successfully !', 'Topper Time Exam Level Created');
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })

  }

  updateTopperTimeExamLevel(topperTimeExamLevelUpdateID: string) {
    const id = topperTimeExamLevelUpdateID;
    const name = this.Name?.value;

    this.topperTimeExamLevelService.UpdateTopperTimeExamLevel(id, name).subscribe({
      next: (response => {
        this.toastrService.success('Topper Time Exam Level Update Successfully !', 'Topper Time Exam Level Updated');
      }),
      error: ((error) => {
        this.toastrService.error(error.message);
      })
    })


  }


  editTopperTimeExamLevel(data: any) {
    const id = data.id;

    this.topperTimeExamLevelService.GetTopperTimeExamLevel(id).subscribe({
      next: (response => {

        this.editTopperTimeExamLevelId = id;
        this.isUpdateMode = true;
  
        this.TopperTimeExamMasterLevelForm.patchValue({
          id : response.id,
           name : response.name,
        })

      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })
  }



  deleteTopperTimeExamLevel($event: any) { }

  clearForm() {
    this.editTopperTimeExamLevelId = '';
    this.isUpdateMode = false;
    this.TopperTimeExamMasterLevelForm.reset();
  }


}


