import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { affiliateMasterService } from '../../../services/affiliatemaster.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affiliate-master',
  standalone: true,
  imports: [DataTableComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './affiliate-master.component.html',
  styleUrl: './affiliate-master.component.scss',
})
export class AffiliateMasterComponent implements OnInit {
  isUpdateMode: boolean = false;

  affiliateMasterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    affdays: new FormControl('', [Validators.required]),
    couponApplyDays: new FormControl('', [Validators.required]),
    canlogin: new FormControl('Yes', [Validators.required]),
    Isstarted: new FormControl('Yes', [Validators.required]),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editAffilateMasterId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private affiliateMasterService: affiliateMasterService,

    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataObs = this.affiliateMasterService.getAffiliateMasterList();
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Email', data: 'email', type: 'text' },
      { title: 'Mobile', data: 'mobile', type: 'text' },
      { title: 'Password', data: 'password', type: 'text' },
    ];
  }

  get Name() {
    return this.affiliateMasterForm.get('name');
  }
  get Email() {
    return this.affiliateMasterForm.get('Email');
  }
  get Mobile() {
    return this.affiliateMasterForm.get('mobile');
  }
  get Password() {
    return this.affiliateMasterForm.get('password');
  }
  get AffiliateDays() {
    return this.affiliateMasterForm.get('affdays');
  }
  get CouponApplyDays() {
    return this.affiliateMasterForm.get('couponApplyDays');
  }
  get Canlogin() {
    return this.affiliateMasterForm.get('canlogin');
  }
  get Isstarted() {
    return this.affiliateMasterForm.get('Isstarted');
  }

  createAffilateMaster() {
    const name = this.Name?.value;
    const email = this.Email?.value;
    const mobile = this.Mobile?.value;
    const password = this.Password?.value;
    const affdays = this.AffiliateDays?.value;
    const couponApplydays = this.CouponApplyDays?.value;
    const canlogin = this.Canlogin?.value;
    const isstarted = this.Isstarted?.value;

    this.affiliateMasterService
      .createAffiliateMaster(
        name,
        email,
        mobile,
        password,
        affdays,
        couponApplydays,
        canlogin,
        isstarted
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Create Affiliate Master Successfully !',
            'Create Affiliate Master'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateAffilateMaster(affilMasterID: string) {
    const id = affilMasterID;
    const name = this.Name?.value;
    const email = this.Email?.value;
    const mobile = this.Mobile?.value;
    const password = this.Password?.value;
    const affiliatedays = this.AffiliateDays?.value;
    const couponApplydays = this.CouponApplyDays?.value;
    const canlogin = this.Canlogin?.value;
    const isstarted = this.Isstarted?.value;

    this.affiliateMasterService
      .updateAffiliateMaster(
        id,
        name,
        email,
        mobile,
        password,
        affiliatedays,
        couponApplydays,
        canlogin,
        isstarted
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Affiliate Master Update Successfully !',
            ' Updated Affiiate Master'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteAffilateMaster(data: any) {
    const id = data.id;

    this.affiliateMasterService.deleteAffiliateMaster(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Affiliate Master Deleted Successfully !',
          'Affiliate Master Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editAffilateMaster(data: any) {
    const id = data.id;

    this.affiliateMasterService.getAffiliateMaster(id).subscribe({
      next: (response) => {
        this.editAffilateMasterId = id;
        this.isUpdateMode = true;

        this.affiliateMasterForm.patchValue({
          id: response.id,
          name: response.name,
          Email: response.email,
          mobile: response.mobile,
          password: response.password,
          affdays: response.affDays,
          couponApplyDays: response.couponApplydays,
          canlogin: response.canLogin ? "Yes" : "No",
          Isstarted: response.isStarted ? "Yes" : "No",
        });
      },
    });
  }

  clearForm() {

    this.editAffilateMasterId = "";
    this.isUpdateMode = false;
    this.affiliateMasterForm.reset();
  }
}
