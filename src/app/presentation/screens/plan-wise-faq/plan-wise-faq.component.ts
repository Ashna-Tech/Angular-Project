import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { PlanwiseFaqService } from '../../../services/PlanwiseFaQ.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-plan-wise-faq',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './plan-wise-faq.component.html',
  styleUrl: './plan-wise-faq.component.scss',
})
export class PlanWiseFaqComponent implements OnInit {
  isUpdateMode: boolean = false;
  PlanwisefaQForm: FormGroup = new FormGroup({
    faqId: new FormControl('', [Validators.required]),
    planId: new FormControl('', [Validators.required]),
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    orderNo: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editPlanwisefaQId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  faQListDropdown$: Observable<any[]> | undefined;

  planListDropdown$: Observable<any[]> | undefined;

  constructor(
    private planwiseFaqService: PlanwiseFaqService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.planwiseFaqService.GetPlanwisefaqList();

    this.tableCols = [
      { title: 'Question', data: 'question', type: 'text' },
      { title: 'Answer', data: 'answer', type: 'text' },
      { title: 'Order Number', data: 'orderNo', type: 'text' },
    ];
  }

  get FaQId() {
    return this.PlanwisefaQForm.get('faqId');
  }

  get PlanId() {
    return this.PlanwisefaQForm.get('planId');
  }

  get Question() {
    return this.PlanwisefaQForm.get('question');
  }

  get Answer() {
    return this.PlanwisefaQForm.get('answer');
  }

  get OrderNumber() {
    return this.PlanwisefaQForm.get('orderNo');
  }

  createPlanwisefaQ() {
    const faqId = this.FaQId?.value;
    const planId = this.PlanId?.value;
    const question = this.Question?.value;
    const answer = this.Answer?.value;
    const orderNo = this.OrderNumber?.value;

    this.planwiseFaqService
      .CreatePlanwiseFaq(faqId, planId, question, answer, orderNo)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Wise FAQ Created Successfully',
            'Plan Wise FAQ Created'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updatePlanwisefaQ(UpdatePlanWiseFAQID: any) {
    const id = UpdatePlanWiseFAQID;
    const faqId = this.FaQId?.value;
    const planId = this.PlanId?.value;
    const question = this.Question?.value;
    const answer = this.Answer?.value;
    const orderNo = this.OrderNumber?.value;

    this.planwiseFaqService
      .UpdatePlanwiseFaq(id, faqId, planId, question, answer, orderNo)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Wise FAQ Updated Successfully',
            'Plan Wise FAQ Updated'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deletePlanwisefaQ(data: any) {
    const id = data.id;

    this.planwiseFaqService.DeletePlanwiseFaq(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Plan Wise FAQ Deleted Successfully',
          'Plan Wise FAQ Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editPlanwisefaQ(data: any) {
    const id = data.id;

    this.planwiseFaqService.GetPlanwiseFaq(id).subscribe({
      next: (response) => {
        this.editPlanwisefaQId = id;
        this.isUpdateMode = true;

        this.PlanwisefaQForm.patchValue({
          id : response.id ,
          faqId: response.faqId,
          planId: response.planId,
          question: response.question,
          answer: response.answer,
          orderNo: response.orderNo,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    (this.editPlanwisefaQId = ''),
      (this.isUpdateMode = false),
      this.PlanwisefaQForm.reset();
  }
}
