import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CkeditorComponent } from "../presentation/components/ckeditor/ckeditor.component";

@Injectable({
    providedIn:'root'
})

export class FormsUtilsService{
    constructor(private toasterService:ToastrService){}

    checkValidationErrors(form: FormGroup, controlerNames?:{[key:string]:string}) {
        const errorMessages:string[] = [];
        Object.keys(form.controls).forEach(key => {
          const controlErrors = form.get(key)?.errors;
          const controllerName = (controlerNames && controlerNames[key]) ? controlerNames[key] : key;
          
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              switch (keyError) {
                case 'required':
                  errorMessages.push(`${controllerName} is required.`);
                  break;
                case 'minlength':
                  errorMessages.push(`${controllerName} must be at least ${controlErrors[keyError].requiredLength} characters long.`);
                  break;
                case 'email':
                  errorMessages.push(`Invalid email format.`);
                  break;
                case 'min':
                  errorMessages.push(`${controllerName} must be at least ${controlErrors[keyError].min}.`);
                  break;
                default:
                  errorMessages.push(`${controllerName} is invalid.`);
              }
            });
          }
        });

        if(errorMessages.length > 0){
            this.toasterService.error(errorMessages[0]);
        }

        return (errorMessages.length > 0);
      }


      setDataFormCkEditorToForm(inputComponents:{comp:(CkeditorComponent | undefined), FormControlName:string}[], form:FormGroup){
        inputComponents.forEach(ckInput => {
          if(ckInput.comp){
            form.patchValue({
              [ckInput.FormControlName]:ckInput.comp.getData()
            });
          }
        });
    
        return form;
      }

      getDataFromCkEditorComponent(component:CkeditorComponent | undefined){
        if(component !== undefined){
          return component.getData();
        }else{
          return '';
        }
      }
}