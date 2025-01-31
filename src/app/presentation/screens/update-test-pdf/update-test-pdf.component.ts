import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestMasterService } from '../../../services/testmaster.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-test-pdf',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-test-pdf.component.html',
  styleUrl: './update-test-pdf.component.scss'
})

export class UpdateTestPdfComponent implements OnInit {

  isUpdateMode: boolean = false;
  UpdateTestPDFForm: FormGroup = new FormGroup({
    testid: new FormControl('', []),
     englishPdfUrl: new FormControl('', []),
     hindiPdfUrl: new FormControl('', []),
     engPdfFile: new FormControl('', []),
     hindiPdfFile: new FormControl('', []),
  });

  editUpdateTestPdfId: string = "";   // Update Id 
  showEnglishPdfFile: string = "";  // Preview For English Pdf File 
  showHindiPDFFile: string = "";    // Preview For Hindi Pdf File

  constructor(private testmasterService: TestMasterService,
    private toastrService: ToastrService) { }  

  ngOnInit(): void {

  }

  get TestID() {
    return this.UpdateTestPDFForm.get('testid');
  }

  get EnglishPDFUrl() {
    return this.UpdateTestPDFForm.get('englishPdfUrl');
  }

  get HindiPDFUrl() {
    return this.UpdateTestPDFForm.get('hindiPdfUrl');
  }

  get EnglishPDFFile() {
    return this.UpdateTestPDFForm.get('engPdfFile');
  }

  get HindiPDFFile() {
    return this.UpdateTestPDFForm.get('hindiPdfFile')
  }


  updateTestPdf() {
    const TestId = this.TestID?.value;
    const englishPdfUrl = this.EnglishPDFUrl?.value;
    const hindiPdfUrl = this.HindiPDFUrl?.value;
    const englishPdfFile = this.EnglishPDFFile?.value;
    const hindiPdfFile = this.HindiPDFFile?.value;

    this.testmasterService.UpdateTestPdfTestMaster(TestId, englishPdfUrl, hindiPdfUrl, englishPdfFile, hindiPdfFile).subscribe({
      next: (response => {
        this.toastrService.success('Update Test PDF Successfully in Test Master'!, 'Update Test PDF');
      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })
  }


  onEngPdfUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];
      this.UpdateTestPDFForm.patchValue({
        'engPdfFile': file
      });

      const reader = new FileReader();
      reader.onload = e => this.showEnglishPdfFile = reader.result as string;

      reader.readAsDataURL(file);
    }
  }


  onHindiPdfUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];
      this.UpdateTestPDFForm.patchValue({
        'hindiPdfFile': file
      });

      const reader = new FileReader();
      reader.onload = e => this.showHindiPDFFile = reader.result as string;

      reader.readAsDataURL(file);

    }
  }

  clearForm() {
    this.isUpdateMode = false;
    this.UpdateTestPDFForm.reset();
  }

}
