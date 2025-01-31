import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ActionType } from '../../../core/enums/Action-Type.enum';
import { ShowPlace } from '../../../core/enums/Show-place.enum';
import { ExamGroup } from '../../../core/enums/ExamGroups.enum';

@Component({
  selector: 'app-app-slider',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './app-slider.component.html',
  styleUrl: './app-slider.component.scss',
})

export class AppSliderComponent implements OnInit {

  isUpdateMode: boolean = false;
  AppSliderForm: FormGroup = new FormGroup({
    showinPlace : new FormControl('',[]),
    examGroup : new FormControl('',[]),
    actionType : new FormControl('',[]),
    image : new FormControl('',[]),
    isActive : new FormControl('No',[])
  });


  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];

  ShowingPlace = ShowPlace; // Enum For ShowPlace 
  examGroup = ExamGroup; // Enum For ExamGroup
  actionType = ActionType; // Enum For ActionType

  previewImage: string = ''; // Property For Preview Image

    ngOnInit(): void {
     this.dataObs = of([]); 
    }


  //  Method For Image Upload
  onUploadImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.AppSliderForm.patchValue({
        image: file, //Replace this image Formconrol name its temporary..
      });

      const reader = new FileReader();
      reader.onload = (e) => (this.previewImage = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  deleteApp($event: any) {
    throw new Error('Method not implemented.');
  }
  deleteAppSlider($event: any) {
    throw new Error('Method not implemented.');
  }
  editAppSlider($event: any) {
    throw new Error('Method not implemented.');
  }
  clearForm() {
    throw new Error('Method not implemented.');
  }
  editAppSliderId: any;
  updateAppSlider(arg0: any) {
    throw new Error('Method not implemented.');
  }
  createAppSlider() {
    throw new Error('Method not implemented.');
  }

}
