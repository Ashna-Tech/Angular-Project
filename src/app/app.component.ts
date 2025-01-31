import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultipleSelectExamplansComponent } from './presentation/screens/exam-type/multiple-select-examplans/multiple-select-examplans.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testzone-admin';

}
