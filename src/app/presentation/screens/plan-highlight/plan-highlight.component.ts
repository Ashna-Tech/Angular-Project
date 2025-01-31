import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { PlanHighlightService } from '../../../services/planHighlight.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-plan-highlight',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './plan-highlight.component.html',
  styleUrl: './plan-highlight.component.scss',
})
export class PlanHighlightComponent implements OnInit {
  isUpdateMode: boolean = false;
  PlanHighlightForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    heading: new FormControl('', [Validators.required]),
    highlight: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editPlanHighlightId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private planhighlighService: PlanHighlightService,

    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.planhighlighService.GetPlanHighlightList();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Heading', data: 'heading', type: 'text' },
      { title: 'Highlight', data: 'highlight', type: 'text' },
    ];
  }

  get Name() {
    return this.PlanHighlightForm.get('name');
  }

  get Heading() {
    return this.PlanHighlightForm.get('heading');
  }

  get Highlight() {
    return this.PlanHighlightForm.get('highlight');
  }

  createPlanHighlight() {
    const name = this.Name?.value;
    const heading = this.Heading?.value;
    const highlight = this.Highlight?.value;

    this.planhighlighService
      .CreatePlanHighlight(name, heading, highlight)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Highlight Created Successfully !!',
            'Create Plan Highlight'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updatePlanHighlight(PlanHighlightId: string) {
    const id = PlanHighlightId;
    const name = this.Name?.value;
    const heading = this.Heading?.value;
    const highlight = this.Highlight?.value;

    this.planhighlighService
      .UpdatePlanHighlight(id, name, heading, highlight)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Highlight Update Successfully !!',
            'Update Plan Highlight'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deletePlanHighlight(data: any) {
    const id = data.id;

    this.planhighlighService.DeletePlanHighlight(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Plan Highlight Deleted Successfully !!',
          'Delete Plan Highlight'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editPlanHighlight(data: any) {
    const id = data.id;

    this.planhighlighService.GetPlanHighlight(id).subscribe({
      next: (response) => {
        this.editPlanHighlightId = id;
        this.isUpdateMode = true;

        this.PlanHighlightForm.patchValue({
          id: response.id,
          name: response.name,
          heading: response.heading,
          highlight: response.highlight,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.editPlanHighlightId = '';
    this.isUpdateMode = false;
    this.PlanHighlightForm.reset();
  }
}
