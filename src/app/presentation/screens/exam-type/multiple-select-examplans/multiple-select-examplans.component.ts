import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import {
  EXAMPLANS,
  ExamPlansList,
} from '../../../../core/domain/Exam type/examPlansList.model';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-multiple-select-examplans',
  standalone: true,
  imports: [
    MatOption,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './multiple-select-examplans.component.html',
  styleUrl: './multiple-select-examplans.component.scss',
})
export class MultipleSelectExamplansComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  //List of Examplans

  protected examPlans: ExamPlansList[] = EXAMPLANS; //Name of ListModel ExamplanList

  //Control for the slected examplan for multi-selection*/

public ExamPlanMultiCtrl = new FormControl<ExamPlansList[]>([], { nonNullable: true });
  // public ExamPlanMultiCtrl : FormControl<ExamPlansList[]> = new FormControl <ExamPlansList[]>([]) ;


  //Control for the MatSelect filter keyword multi-selection.*/

  public ExamPlanMultiFilterctrl : FormControl<string | null> = new FormControl<string> ('');

  
  //List of Examplans filtered by search keyword */

  public filteredExamPlanMulti: ReplaySubject<ExamPlansList[]> =
    new ReplaySubject<ExamPlansList[]>(1);

  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;

  //Subject that emits When the component has been destroyed.*/

  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    //Set initial Selection

    this.ExamPlanMultiCtrl.setValue([
      this.examPlans[10],
      this.examPlans[11],
      this.examPlans[12],
    ]);

    // Load the initial Exam Plan List

    this.filteredExamPlanMulti.next(this.examPlans.slice());

    // Listen for search field value changes

    this.ExamPlanMultiFilterctrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterExamPlansMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // Sets the initial value after the filteredExamplans are loaded initially

  protected setInitialValue() {
    this.filteredExamPlanMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available

        this.multiSelect.compareWith = (a: ExamPlansList, b: ExamPlansList) =>
          a && b && a.id === b.id;
      });
  }

  protected filterExamPlansMulti() {
    if (!this.examPlans) {
      return;
    }

    //Get the search keyword

    let search = this.ExamPlanMultiFilterctrl.value;
    if (!search) {
      this.filteredExamPlanMulti.next(this.examPlans.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    // Filter the Examplans

    this.filteredExamPlanMulti.next(
      this.examPlans.filter(
        (examP) => examP.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
