import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SendReplyEmailComponent } from './send-reply-email.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

class FormBuilderMock {
  group(controlsConfig: { [key: string]: any; }, options?: AbstractControlOptions | null): FormGroup {
    return new FormGroup({});
  }
}

class TemplateServiceMock {
  templatesMessageMaxLength$ = new BehaviorSubject<number>(15);
}

fdescribe('CreateTemplateComponent', () => {
  let component: SendReplyEmailComponent;
  let fixture: ComponentFixture<SendReplyEmailComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendReplyEmailComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: FormBuilder, useClass: FormBuilderMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: ({}): void => {} } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: (): void => {} } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendReplyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message-form-field', () => {
    const messageFormField = fixture.debugElement.query(By.css('.message-form-field'));
    expect(messageFormField).toBeTruthy();
  });

  it('should render correct hint based on textarea content', () => {
    const textArea = fixture.debugElement.query(By.css('textarea'));
    (textArea.nativeElement as HTMLTextAreaElement).value = 'hi there!';
    fixture.detectChanges();

    const hintElement = fixture.debugElement.query(By.css('.message-form-field mat-hint'));
    expect(hintElement).toBeTruthy();
    expect(hintElement.nativeElement.textContent).toEqual('Characters: 9 / 15 ');
  });
});
