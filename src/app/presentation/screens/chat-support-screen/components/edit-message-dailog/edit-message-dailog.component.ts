import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {afterNextRender, inject, Injector, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-edit-message-dailog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './edit-message-dailog.component.html',
  styleUrl: './edit-message-dailog.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EditMessageDailogComponent {

   private _injector = inject(Injector);
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  close(){

  }

}
