import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { blogPDFService } from '../../../services/blogPDF.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-pdf',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './blog-pdf.component.html',
  styleUrl: './blog-pdf.component.scss',
})
export class BlogPdfComponent implements OnInit {
  isUpdateMode: boolean = false;

  blogPdfForm: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    pdfName: new FormControl('',[Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editBlogPdfId: string = '';

  showpdfNameFile: string = "";


  @ViewChild('dttable') dttable: DataTableComponent | undefined;
  

  constructor(
    private blogPdFservice: blogPDFService,
    private toatrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.blogPdFservice.getblogPDFList();
    this.tableCols = [
      { title: 'title', data: 'title', type: 'text' },
      { title: 'PDF Name', data: 'pdfName', type: 'text' },
    ];
  }

  get blogPdfTitle() {
    return this.blogPdfForm.get('title');
  }
  get blogPdfName() {
    return this.blogPdfForm.get('pdfName');
  }

  
  onPdfFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];
      this.blogPdfForm.patchValue({
        'pdfName' : file
      });

      const reader = new FileReader();
      reader.onload = e =>this.showpdfNameFile = reader.result as string ;

      reader.readAsDataURL(file)
    }
  }

  createBlogPdf() {
    const blogPdfTitle = this.blogPdfTitle?.value;
    const blogPdfName = this.blogPdfName?.value;

    this.blogPdFservice.createBlogPdf(blogPdfTitle, blogPdfName).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toatrService.success(
          'created Successfully Blog Pdf !!',
          'Blog PDF Create '
        );
      },
      error: (error) => {
        this.toatrService.error(error.message);
      },
    });
  }

  updateBlogPdf(blogPdfID: string) {
    const id = blogPdfID;
    const title = this.blogPdfTitle?.value;
    const pdfName = this.blogPdfName?.value;

    this.blogPdFservice.updateBlogPDF(id, title, pdfName).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toatrService.success(
          'Updated Blog Pdf Successfully !!',
          ' Update Blog Pdf'
        );
      },
      error: (error) => {
        this.toatrService.error(error.message);
      },
    });
  }

  deleteBlogPdf(data: any) {
    const id = data.id;

    this.blogPdFservice.removeBlogPDF(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toatrService.success(
          'Deleted Blog pdf Successfully !!',
          'Delete Blog Pdf  '
        );
      },
    });
  }
  editBlogPdf(data: any) {
    const id = data.id;

    this.blogPdFservice.getBlogPDF(id).subscribe({
      next: (response) => {
        this.editBlogPdfId = id;
        this.isUpdateMode = true;

        this.blogPdfForm.patchValue({
          title: response.title,
          pdfName : null ,
        });
      },
      error: (error) => {
        this.toatrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.editBlogPdfId = '';
    this.isUpdateMode = false;
    this.blogPdfForm.reset();
  }
}
