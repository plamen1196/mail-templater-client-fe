import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {EmailConfirmationService} from "../../services/email-confirmation.service";

@Component({
  selector: 'app-create-template',
  templateUrl: './send-reply-email.component.html',
  styleUrls: ['./send-reply-email.component.scss']
})
export class SendReplyEmailComponent implements OnInit {

  formGroup: FormGroup;
  replyMessageMaxLength: Observable<number>;

  constructor(
    private emailConfirmationService: EmailConfirmationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<SendReplyEmailComponent>,
    private cdr: ChangeDetectorRef) {
    /* Generate form */
    this.formGroup = this.generateForm();
  }

  ngOnInit(): void {
    this.replyMessageMaxLength = this.emailConfirmationService.replyMessageMaxLength$.asObservable();
    this.cdr.detectChanges();
  }

  onSendReply(): void {

  }

  onCancel(): void {
    this.dialogRef.close({ success: true, cancelClicked: true });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('message', new FormControl('', [Validators.required]));

    return form;
  }

  private handleFailure(response: HttpErrorResponse): void {
    const message = response?.error?.message || 'ERROR when creating reply!';
    this.dialogRef.close({ success: false, cancelClicked: false, message: message });
  }
}
