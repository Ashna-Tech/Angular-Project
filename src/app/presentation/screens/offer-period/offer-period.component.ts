import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { OfferPeriodService } from '../../../services/offer-period.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';



@Component({
  selector: 'app-offer-period',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe,MatDatepickerModule,
    MatInputModule,MatNativeDateModule],
  templateUrl: './offer-period.component.html',
  styleUrl: './offer-period.component.scss'
})

export class OfferPeriodComponent implements OnInit {

constructor(private offerperiodService: OfferPeriodService,
  private toastrService : ToastrService
){}

  isUpdateMode: boolean = false ;
OfferPeriodForm: FormGroup = new FormGroup({
  startdate : new FormControl('',[Validators.required]),
  enddate : new FormControl('',[Validators.required]),
  bannerStartdate : new FormControl('',[Validators.required]),
  bannerEnddate : new FormControl('',[Validators.required]),
  isShowtimer : new FormControl('Yes',[Validators.required]),
  isApplyonAll : new FormControl('Yes',[Validators.required]),
  discountrate : new FormControl('0',[Validators.required]),
  offerendingText : new FormControl('',[Validators.required]),
  applicationName : new FormControl('',[Validators.required]),
  isactive : new FormControl('Yes',[Validators.required]),
});

dataObs: Observable<any>|undefined;
tableCols: TableColType [] = [] ;
editOfferPeriodId : string = '' ;

@ViewChild('dttable') dttable : DataTableComponent | undefined 

ngOnInit(): void {
  this.dataObs = this.offerperiodService.getOfferPeriodList() ;
  this.tableCols = [
{title : 'StartDate', data : 'startDate', type : 'text'},
{title : 'EndDate', data :'endDate', type :'text'},
{title :'BannerStartDate', data :'bannerStartDate', type :'text'},
{title : 'BannerEndDate', data : 'bannerEndDate', type : 'text'},
{title :'IsShowTimer', data :'isShowTimer', type :'text'},
{title : 'IsApplyOnAll', data :'isApplyOnAll', type :'text'},
{title : 'DiscountRate', data :'discountRate', type :'text'},
{title :'Offer Ending Text', data :'offerEndingText', type :'text'},
{title :'Application Name', data :'applicationName', type :'text'},
  ]
}

get Startdate(){
  return this.OfferPeriodForm.get('startdate')
}

get Enddate(){
  return this.OfferPeriodForm.get('enddate')
}

get Bannerstartdate(){
  return this.OfferPeriodForm.get('bannerStartdate')
}

get BannerEndDate(){
  return this.OfferPeriodForm.get('bannerEnddate')
}

get Isshowtimer(){
  return this.OfferPeriodForm.get('isShowtimer')
}

get IsapplyOnAll(){
  return this.OfferPeriodForm.get('isApplyonAll')
}

get Discountrate(){
  return this.OfferPeriodForm.get('discountrate')
}
get OfferEndingtext(){
  return this.OfferPeriodForm.get('offerendingText')
}

get Applicationname(){
  return this.OfferPeriodForm.get('applicationName')
}

get Isactive(){
  return this.OfferPeriodForm.get('isactive')
}

createOfferPeriod() {

  const startdate = this.Startdate?.value;
  const enddate = this.Enddate?.value;
  const bannerstartdate = this.Bannerstartdate?.value;
  const bannerenddate = this.BannerEndDate?.value;
  const isshowtimer = this.Isshowtimer?.value;
  const isapplyonall = this.IsapplyOnAll?.value;
  const discountrate = this.Discountrate?.value;
  const offerendingtext = this.OfferEndingtext?.value;
  const applicationname = this.Applicationname?.value;
  const isactive = this.Isactive?.value;

this.offerperiodService.createOfferPeriod(startdate,enddate,bannerstartdate,bannerenddate,isshowtimer,
  isapplyonall,discountrate,offerendingtext,applicationname,isactive).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Offer Period Create Successfully', 'Offer Period Created') ;
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })

}

updateOfferPeriod( offerPeriodUpdateId : string) {
 const id = offerPeriodUpdateId ;
 const startdate = this.Startdate?.value ;
 const enddate = this.Enddate?.value;
 const bannerstartdate = this.Bannerstartdate?.value;
 const bannerenddate = this.BannerEndDate?.value;
 const isshowtimer = this.Isshowtimer?.value;
 const isapplyonall = this.IsapplyOnAll?.value;
 const discountrate = this.Discountrate?.value;
 const offerendingtext = this.OfferEndingtext?.value;
 const applicationname = this.Applicationname?.value;
 const isactive = this.Isactive?.value;


 this.offerperiodService.updateOfferPeriod(id,startdate,enddate,bannerstartdate,bannerenddate,isshowtimer,isapplyonall,
  discountrate,offerendingtext,applicationname,isactive).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Offer Period Upadte Successfully', 'Offer Period Update');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })  
 

}

deleteOfferPeriod(data : any) {
  
  const id = data.id ;

  this.offerperiodService.deleteOfferPeriod(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Offer Period Delete Successfully',' Offer Period Delete');
    }),
    error : (error =>{
      this.toastrService .error(error.message);
    })
  })

  }



clearForm() {

  this.editOfferPeriodId = '';
  this.isUpdateMode = false ;
  this.OfferPeriodForm.reset() ;

}

editOfferPeriod(data : any) {

const id = data.id ;

this.offerperiodService.getOfferPeriod(id).subscribe({
  next : (response =>{

this.editOfferPeriodId = id;
this.isUpdateMode = true ;

this.OfferPeriodForm.patchValue({
  id : response.id ,
  startdate : response.startDate.substring(0,16),
  enddate : response.endDate.substring(0,16),
  bannerStartdate : response.bannerStartDate.substring(0,16),
  bannerEnddate : response.bannerEndDate.substring(0,16),
  isShowtimer : response.isShowTimer ? "Yes" : "No",
  isApplyonAll : response.isApplyOnAll ? "Yes" : "No",
  discountrate : response.discountRate, 
  offerendingText : response.offerEndingText,
  applicationName : response.applicationName,
  isactive : response.isActive ? "Yes" : "No",
});
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})


}

}
