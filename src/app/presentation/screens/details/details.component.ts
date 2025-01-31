import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { Detailszservice } from '../../../services/Details.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe, NgClass } from '@angular/common';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { QuestionLevel } from '../../../core/enums/question-level.enum';
import { RightOption } from '../../../core/enums/RightOption.enum';
import { QuestionTypeEnum } from '../../../core/enums/question-type.enum';
import { detailsModel } from '../../../core/domain/details/details.model';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DataTableComponent,
    AsyncPipe,
    CkeditorComponent,
    MatTabsModule,
    NgClass,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() set summaryId(questionId: string) {
    if (this.detailForm) {
      this.detailForm.patchValue({
        questionMasterId: questionId,
      });
    }
  }

  @Input() questionType: QuestionTypeEnum = QuestionTypeEnum.Multiple;
  QuestionTypeEnum = QuestionTypeEnum;

  isUpdateMode: boolean = false;
  detailForm: FormGroup = new FormGroup({
    questionMasterId: new FormControl('', [Validators.required]),
    ques: new FormControl('', [Validators.required]),
    quesHin: new FormControl('', []),
    level: new FormControl('', [Validators.required]),
    optRight: new FormControl('', [Validators.required]),
    explanation: new FormControl('', [Validators.required]),
    optAEng: new FormControl('', [Validators.required]),
    optAHin: new FormControl('', []),
    optBEng: new FormControl('', [Validators.required]),
    optBHin: new FormControl('', []),
    optCEng: new FormControl('', []),
    optCHin: new FormControl('', []),
    optDEng: new FormControl('', []),
    optDHin: new FormControl('', []),
    optEEng: new FormControl('', []),
    optEHin: new FormControl('', []),
  });

  @Output() onDirectQuesionCreate = new EventEmitter<detailsModel>();

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editdetailsId: string = '';

  QuestionLevelEnum = QuestionLevel;
  RightOptionEnum = RightOption;

  activeTab: number = 0;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  @ViewChild('ques') qEnglishcomp: CkeditorComponent | undefined;

  @ViewChild('quesHin') qhindicomp: CkeditorComponent | undefined;

  @ViewChild('explanation') experEngcomp: CkeditorComponent | undefined;

  @ViewChild('optAEng') optAEngcomp: CkeditorComponent | undefined;

  @ViewChild('optAHin') optAhindicomp: CkeditorComponent | undefined;

  @ViewChild('optBEng') optBengcomp: CkeditorComponent | undefined;

  @ViewChild('optBHin') optBHindicomp: CkeditorComponent | undefined;

  @ViewChild('optCEng') optcEngcomp: CkeditorComponent | undefined;

  @ViewChild('optCHin') optChindicomp: CkeditorComponent | undefined;

  @ViewChild('optDEng') optDengcomp: CkeditorComponent | undefined;

  @ViewChild('optDHin') optDhindicomp: CkeditorComponent | undefined;

  @ViewChild('optEEng') optEenglishcomp: CkeditorComponent | undefined;

  @ViewChild('optEHin') optEhindicomp: CkeditorComponent | undefined;

  constructor(
    private detailsService: Detailszservice,
    private toastrService: ToastrService,
    private formsUtils: FormsUtilsService
  ) {}

  ngOnInit(): void {
    // this.dataObs = this.detailsService.getDetailsList();
    // this.tableCols = [
    // {title : 'Question Eng',data:'qEng',type : 'text'},
    // {title : 'Question Level', data : 'qLevel', type :'text'},
    // {title : 'Right Option' , data : 'rOpt', type : 'text' },
    // {title : 'Option Flow' ,data :'optFlow', type : 'text'},
    // {title : 'Experience English', data : 'expEng', type : 'text'},
    // {title : 'User Name', data : 'userName', type : 'text'},
    // {title : 'Option A English', data : 'optAEng', type : 'text'},
    // {title : 'Optipon B English', data : 'optBEng',type :'text'},
    // {title : 'Option C English', data : 'optCEng', type : 'text'},
    // {title : 'Option D English', data : 'optDEng', type : 'text'},
    // {title : 'Option E English', data : 'optEEng', type : 'text'}
    // ];
  }

  get QuestionMasterId() {
    return this.detailForm.get('questionMasterId');
  }

  get QuestionEng() {
    return this.detailForm.get('ques');
  }

  get QuestionHindi() {
    return this.detailForm.get('quesHin');
  }

  get QuestionLevel() {
    return this.detailForm.get('level');
  }

  get rightOption() {
    return this.detailForm.get('optRight');
  }

  get Explanation() {
    return this.detailForm.get('explanation');
  }

  get OptionAEng() {
    return this.detailForm.get('optAEng');
  }

  get OptionAHindi() {
    return this.detailForm.get('optAHin');
  }

  get OptionBEng() {
    return this.detailForm.get('optBEng');
  }

  get OptionBHindi() {
    return this.detailForm.get('optBHin');
  }

  get OptionCEng() {
    return this.detailForm.get('optCEng');
  }

  get OptionCHindi() {
    return this.detailForm.get('optCHin');
  }

  get OptionDEng() {
    return this.detailForm.get('optDEng');
  }
  get OptionDHindi() {
    return this.detailForm.get('optDHin');
  }

  get OptionEEng() {
    return this.detailForm.get('optEEng');
  }

  get OptionEHindi() {
    return this.detailForm.get('optEHin');
  }

  setDataFormFromCkeditor() {
    const ckInputs = [
      { comp: this.qEnglishcomp, FormControlName: 'ques' },
      { comp: this.qhindicomp, FormControlName: 'quesHin' },
      { comp: this.experEngcomp, FormControlName: 'explanation' },
      { comp: this.optAEngcomp, FormControlName: 'optAEng' },
      { comp: this.optAhindicomp, FormControlName: 'optAHin' },
      { comp: this.optBengcomp, FormControlName: 'optBEng' },
      { comp: this.optBHindicomp, FormControlName: 'optBHin' },
      { comp: this.optcEngcomp, FormControlName: 'optCEng' },
      { comp: this.optChindicomp, FormControlName: 'optCHin' },
      { comp: this.optDengcomp, FormControlName: 'optDEng' },
      { comp: this.optDhindicomp, FormControlName: 'optDHin' },
      { comp: this.optEenglishcomp, FormControlName: 'optEEng' },
      { comp: this.optEhindicomp, FormControlName: 'optEHin' },
    ];

    // console.log(ckInputs);

    this.formsUtils.setDataFormCkEditorToForm(ckInputs, this.detailForm);
  }

  setFormData(data: detailsModel, questionId:string) {
    this.editdetailsId = questionId;
    this.isUpdateMode = true;

    this.detailForm.patchValue({
      questionMasterId: data.quesMasterId,
      ques: data.ques,
      quesHin: data.quesHin,
      level: data.level,
      optRight: data.optRight,
      explanation: data.explanation,
      optAEng: data.optAEng,
      optAHin: data.optAHin,
      optBEng: data.optBEng,
      optBHin: data.optBHin,
      optCEng: data.optCEng,
      optCHin: data.optCHin,
      optDEng: data.optDEng,
      optDHin: data.optDHin,
      optEEng: data.optEEng,
      optEHin: data.optCEng,
    });
  }

  getFormData(id?:string) {
    this.setDataFormFromCkeditor();
    if (
      this.formsUtils.checkValidationErrors(this.detailForm, {
        questionMasterId: 'Summary Id',
        ques: 'Question',
        quesHin: 'Question Hindi',
        level: 'Level',
        optAEng: 'Option A',
        optBEng: 'Option B',
        optRight: 'Right Option',
        explanation: 'Explanation',
      })
    ) {
      throw new Error('Question Form is not valid');
    }

    const quesMasterId = this.QuestionMasterId?.value;
    const ques = this.QuestionEng?.value;
    const quesHin = this.QuestionHindi?.value;
    const level = this.QuestionLevel?.value;
    const optRight = this.rightOption?.value;
    const explanation = this.Explanation?.value;
    const optAEng = this.OptionAEng?.value;
    const optAHin = this.OptionAHindi?.value;
    const optBEng = this.OptionBEng?.value;
    const optBHin = this.OptionBHindi?.value;
    const optCEng = this.OptionCEng?.value;
    const optCHin = this.OptionCHindi?.value;
    const optDEng = this.OptionDEng?.value;
    const optDHin = this.OptionDHindi?.value;
    const optEEng = this.OptionEEng?.value;
    const optEHin = this.OptionEHindi?.value;

    const model: detailsModel = {
      id:id,
      quesMasterId: quesMasterId,
      ques: ques,
      quesHin: quesHin,
      level: level,
      optRight: optRight,
      explanation: explanation,
      optAEng: optAEng,
      optAHin: optAHin,
      optBEng: optBEng,
      optBHin: optBHin,
      optCEng: optCEng,
      optCHin: optCHin,
      optDEng: optDEng,
      optDHin: optDHin,
      optEEng: optEEng,
      optEHin: optEHin,
    };

    return model;
  }

  createDetails() {
    const model = this.getFormData();

    this.detailsService.createDetails(model).subscribe({
      next: (response) => {
        this.toastrService.success(
          'Created Details Successsfully !!',
          'Create Details'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  createDirectQuestion() {
    const data = this.getFormData();
    this.onDirectQuesionCreate.emit(data);
  }

  updateDetails(detailsID: string) {
    const model = this.getFormData(detailsID);

    this.detailsService.updateDetails(model).subscribe({
      next: (response) => {
        this.toastrService.success(
          'Update Details Successsfully !!',
          'Update Details'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteDetails(data: any) {
    const id = data.id;

    this.detailsService.removeDetails(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Deleted Successfully Details !!',
          'Delete details'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  editDetails(data: any) {
    // const id = data.id;
    // this.detailsService.getDetails(id).subscribe({
    //   next : (response =>{
    //     this.isUpdateMode = true;
    //     this.editdetailsId = id ;
    //   this.detailForm.patchValue({
    //     id :response.id,
    //     qEng:response.ques,
    //     quesHin : response.quesHin,
    //     questionId : response.questionId,
    //     level: response.level,
    //     optRight: response.optRight,
    //     explanation : response.explanation,
    //     optAEng : response.optAEng,
    //     optAHin : response.optAHin,
    //     optBEng : response.optBEng,
    //     optBHin : response.optBHin,
    //     optCEng : response.optCEng,
    //     optCHin : response.optCHin,
    //     optDEng : response.optDEng,
    //     optDHin : response.optDHin,
    //     optEEng : response.optEEng,
    //     optEHin : response.optEHin
    //     });
    //   }),
    //   error : (error =>{
    //     this.toastrService.error(error.message);
    //   })
    // })
  }

  clearForm() {
    this.editdetailsId = '';
    this.isUpdateMode = false;
    this.detailForm.reset();
  }
}
