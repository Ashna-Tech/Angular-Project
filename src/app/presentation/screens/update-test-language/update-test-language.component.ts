import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { examMasterService } from '../../../services/exam-master.service';

import { ToastrService } from 'ngx-toastr';
import { TestMasterService } from '../../../services/testmaster.service';
import { Language } from '../../../core/enums/Language.enum';

@Component({
  selector: 'app-update-test-language',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-test-language.component.html',
  styleUrl: './update-test-language.component.scss'
})

export class UpdateTestLanguageComponent {

  isUpdateMode: boolean = false;
  UpdateTestLanguageForm: FormGroup = new FormGroup({
    testid: new FormControl('', []),
    language: new FormControl('hindi', []),
    // isActive: new FormControl('Yes', []),
  });


  editUpdateTestLanguageId: string = "";


  //  Language Enum
  language = Language;

  constructor(private testMasterService: TestMasterService,
    private toastrService: ToastrService
  ) { }

  get TestID() {
    return this.UpdateTestLanguageForm.get('testid');
  }

  get Language() {
    return this.UpdateTestLanguageForm.get('language');
  }

  get IsActive() {
    return this.UpdateTestLanguageForm.get('isActive');
  }

  updateTestLanguage() {
    const testId = this.TestID?.value;
    const language = this.Language?.value;
    const isactive = this.IsActive?.value;

    this.testMasterService.UpdateTestLanguageTestMaster(testId, language).subscribe({
      next: (response => {
        this.toastrService.success('Update Test Language Updated Successfully !', 'Update Test Language');
      })
    })

  }


  clearForm() {
    this.isUpdateMode = false;
    this.UpdateTestLanguageForm.reset();
    //  this.clearForm();
  }

}
