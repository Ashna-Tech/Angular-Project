import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { PricingFAQService } from '../../../services/pricing-faq-service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-pricing-faq',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent],
  templateUrl: './pricing-faq.component.html',
  styleUrl: './pricing-faq.component.scss'
})

export class PricingFaqComponent implements OnInit {
 
  isUpdateMode : boolean = false ; 
  PricingFAQForm : FormGroup = new FormGroup({
    question : new FormControl('',[Validators.required]),
    answer : new FormControl('',[Validators.required]),
    orderNo : new FormControl('',[Validators.required]),
  }); 
  
dataObs : Observable<any>|undefined;
tableCols : TableColType [] = [] ;
editPricingFAQId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined

constructor(private PricingFAQService : PricingFAQService,
  private toastrservice : ToastrService
){}

ngOnInit(): void {
  
this.dataObs = this.PricingFAQService.getPricingFAQList() ;
this.tableCols =[
{title :'Question', data :'question', type :'text'},
{title :'Answer', data :'answer', type :'text'},
{title :'Order No', data :'orderNo', type :'text'},
];
}

get Question(){
  return this.PricingFAQForm.get('question')
}

get Answer(){
  return this.PricingFAQForm.get('answer')
}

get Ordernumber(){
  return this.PricingFAQForm.get('orderNo')
}

createPricingFAQ() {

const question = this.Question?.value;
const answer = this.Answer?.value;
const ordernumber = this.Ordernumber?.value;

this.PricingFAQService.createPricingFAQ(question,answer,ordernumber).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }

    this.toastrservice.success('Pricing FAQ Create Successfully', 'Pricing FAQ Created');
  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})

  }

  updatePricingFAQ(pricingfaqUpdateID : string) {
   
    const id = pricingfaqUpdateID ;
    const question = this.Question?.value;
    const answer = this.Answer?.value
    const ordernumber = this.Ordernumber?.value;

    this.PricingFAQService.updatePricingFAQ(id,question,answer,ordernumber).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrservice.success('Pricing FAQ Update Successfully','Pricing FAQ Updated');
      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })

    }

deletePricingFAQ( data : any) {

  const id = data.id ;

  this.PricingFAQService.deletePricingFAQ(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrservice.success('Pricing FAQ Delete Successfully', 'Pricing FAQ Delete');
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })
 
}

editPricingFAQ(data : any) {

  const id = data.id ;

this.PricingFAQService.getPricingFAQ(id).subscribe({
  next : (response =>{
    
this.editPricingFAQId = id ;
this.isUpdateMode = true ;

this.PricingFAQForm.patchValue({
  id : response.id ,
  question : response.question, 
  answer : response.answer,
  orderNo : response.orderNo,
});

  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})
}
clearForm() {

  this.editPricingFAQId = '',
  this.isUpdateMode = false ;
  this.PricingFAQForm.reset();

}

}
