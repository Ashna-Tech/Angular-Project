import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-manage-test-result',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-test-result.component.html',
  styleUrl: './manage-test-result.component.scss'
})
export class ManageTestResultComponent implements OnInit {

  isUpdateMode : boolean = false ;

  manageTestResultForm ! : FormGroup ;
  AddNewTestResultForm2 ! : FormGroup ;

  dataObs: Observable<any>|undefined;
   tableCols: TableColType[] = [];
   editManageTestResultId : string = "";

constructor(){}

ngOnInit(): void { 
  this.manageTestResultForm = new FormGroup({   // Form One 
    testId : new FormControl('',[]),
     highlightMarks : new FormControl('',[]),
      resultFound : new FormControl('',[]),
       NoofUsers : new FormControl('',[]),
        newTestid : new FormControl('',[]),
  });
 
  this.AddNewTestResultForm2 = new FormGroup ({  // Form two 
    testId : new FormControl('',[]),
     excelFile : new FormControl('',[]),
  });
}
  
// Getters of Manage Test Result --->

  get TestID(){
    return this.manageTestResultForm.get('testId');
  }
    get HighLightMarks(){
       return this.manageTestResultForm.get('highlightMarks');
    }

    get ResultFound(){
      return this.manageTestResultForm.get('resultFound');
     } 

       get NumberOfUsers(){
        return this.manageTestResultForm.get('NoofUsers');
       }
    
        get NewTestID(){
          return this.manageTestResultForm.get('newTestid');
        }

        // Getters of Add New Test Result --->

         get TestId(){
           return this.AddNewTestResultForm2.get('testId');
         }

           get ExcelFile(){
            return this.AddNewTestResultForm2.get('excelFile');
           }


          onExcelFileUpload($event: Event){}

            createManageTestResult(){}

            updateManageTestResult(arg : string){}

              deleteManageTestResult($event: any) {
                throw new Error('Method not implemented.');
                }
              editManageTestResult($event: any) {
              throw new Error('Method not implemented.');
                }
              
                clearForm(){}

}
