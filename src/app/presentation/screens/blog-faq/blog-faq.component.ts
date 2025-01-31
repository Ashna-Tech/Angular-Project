import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,FormArray, FormsModule} from '@angular/forms';
import {CommonModule, NgFor } from '@angular/common';
import {FAQList } from '../../../core/domain/Blog-fAQ/blog-FAQ-model';

@Component({
  selector: 'app-blog-faq',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgFor,FormsModule],
  templateUrl: './blog-faq.component.html',
  styleUrl: './blog-faq.component.scss'
})

export class BlogFAQComponent{

  blogFAQform : FormGroup= new FormGroup ({
    faq : new FormArray([])
  });
 
  get faqArray(): FormArray{
    return this.blogFAQform.get('faq') as FormArray ;
  } 

  createBlogFAQ() : FormGroup {
    return new FormGroup({
      question : new FormControl('',[]),
      answer : new FormControl('',[]) 
    });
  }


  updateFaQList(faqs:FAQList[]){
    this.faqArray.clear();
    faqs.forEach(faq => {
      this.faqArray.push(
        new FormGroup({
          question : new FormControl(faq.question,[]),
          answer : new FormControl(faq.answer,[]) 
        })
      )
    })
  }

  getFaqs(){
    return this.faqArray.value;
  }

  // Add a new faq to the formArray 
  AddFaq() : void { 
    this.faqArray.push(this.createBlogFAQ());
  }

  // Remove a /Specefic FAQ from the formArray by index 
  removeFAQ(index : number) : void {
    this.faqArray.removeAt(index);
  }

}


