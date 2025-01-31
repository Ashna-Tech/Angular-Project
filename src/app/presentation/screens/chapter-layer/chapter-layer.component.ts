import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ChapterLayerService } from '../../../services/chapterLayer.service';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-chapter-layer',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './chapter-layer.component.html',
  styleUrl: './chapter-layer.component.scss'
})

export class ChapterLayerComponent implements OnInit {


  constructor(private chapterlayerservice : ChapterLayerService,
    private toastrservice : ToastrService
  ){}

isUpdateMode : boolean = false ;

ChapterLayerForm : FormGroup = new FormGroup({
  layer : new FormControl('',[Validators.required]),
  chapterid : new FormControl('',[Validators.required]),
  description : new FormControl('',[Validators.required]),
});


dataObs: Observable<any>|undefined;
tableCols: TableColType [] = [] ;
editChapterLayerId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined 

chapterListDropdown$ : Observable <any[]> | undefined
 
ngOnInit(): void {
  
this.dataObs = this.chapterlayerservice.getChapterLayerList();

this.tableCols = [
{title : 'Layer', data : 'layer', type : 'text'},
{title : 'description', data : 'description', type : 'text'}
];

}

get Layer(){
  return this.ChapterLayerForm.get('layer')
}

get ChapterID(){
  return this.ChapterLayerForm.get('chapterid')
}

get Description(){
  return this.ChapterLayerForm.get('description')
}

createChapterLayer() {
  const layer = this.Layer?.value;
  const chapterid = this.ChapterID?.value;
  const description = this.Description?.value ;

this.chapterlayerservice.CreateChapterLayer(layer,chapterid,description).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrservice.success('Chapter Layer Create Successfully', 'Chapter Layer Created')
  }),
  error : (error =>{
    this.toastrservice.error(error.message);
  })
})

  }

  updateChapterLayer( chapterLayerUpdateID : string) {
    
    const id = chapterLayerUpdateID ;
    const layer = this.Layer?.value;
    const chapterid = this.ChapterID?.value;
    const description = this.Description?.value;

    this.chapterlayerservice.UpdateChapterLayer(id,layer,chapterid,description).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable(); 
        }
        this.toastrservice.success('Chapter Layer Update Successfully', 'Chapter Layer Updated');
      }),
      error : (error =>{
        this.toastrservice.error(error.message);
      })
    })

    }
    
editChapterLayer(data : any) {

  const id = data.id;

  this.chapterlayerservice.getChapterLayer(id).subscribe({
    next : (response =>{
      
      this.editChapterLayerId = id ;
      this.isUpdateMode = true ;

      this.ChapterLayerForm.patchValue({
      id : response.id,
      layer : response.layer,
      chapterid : response.chapterId,
      description : response.description
      });
    }),
    error : (error =>{
      this.toastrservice.error(error.message);
    })
  })
  
}

deleteChapterLayer( data : any) {
  
  const id = data.id ;
  
this.chapterlayerservice.deleteChapterLayer(id).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrservice.success('Chapter Layer Delete Successfully', 'Chapter Layer Deleted');
  }),
   error : (error =>{
    this.toastrservice.error(error.message);
   })
})

}

clearForm() {

this.editChapterLayerId = '';
this.isUpdateMode = false ;
this.ChapterLayerForm.reset();

}







}
