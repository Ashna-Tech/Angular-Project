import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

declare var CKEDITOR: any;

@Component({
  selector: 'app-ckeditor',
  standalone: true,
  imports: [],
  templateUrl: './ckeditor.component.html',
  styleUrl: './ckeditor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkeditorComponent),
      multi: true
    }
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CkeditorComponent implements OnInit, AfterViewInit , OnDestroy, ControlValueAccessor {
  @Input() elementId!: string;
  private editorInstance: any;
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private valueChanges: Subject<string> = new Subject<string>();

  constructor(private cdr: ChangeDetectorRef) {
    this.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.onChange(value);
      this.cdr.markForCheck();
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  initializeEditor() {
    this.editorInstance = CKEDITOR.replace(this.elementId);
    // this.extra ();
  }

  getData(){
    return  this.editorInstance.getData();
  }


extra (){
  this.editorInstance.on('saveSnapshot', () => {
    this.updateValue();
  });

  this.editorInstance.on('selectionChange', () => {
    this.updateValue();
  });

  // Listen to 'contentDom' event to capture user input in real-time
  this.editorInstance.on('contentDom', () => {
    this.editorInstance.document.on('keyup', () => {
      this.updateValue();
    });

    this.editorInstance.document.on('input', () => {
      this.updateValue();
    });
  });
}

updateValue() {
  const data = this.editorInstance.getData();
  this.valueChanges.next(data);
}

removeAllListeners() {
    if (this.editorInstance && this.editorInstance.document) {
      const events = this.editorInstance.document.getListeners();
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        this.editorInstance.document.removeListener(event.name, event.listener);
      }
    }
  }

  ngOnDestroy() {
    CKEDITOR.remove(this.editorInstance);
    if (this.editorInstance) {
       this.editorInstance.destroy(true);
    }
    this.valueChanges.complete();
  }

  writeValue(value: string): void {
    if (this.editorInstance) {
      if(value){
        this.editorInstance.setData(value);  
      }else{
        this.editorInstance.setData('');
      }
      

    } else {
      // wait for the editor to initialize
      setTimeout(() => this.writeValue(value), 0);  
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.editorInstance) {
      this.editorInstance.setReadOnly(isDisabled);
    }
  }
}