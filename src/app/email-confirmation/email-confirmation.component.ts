import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { EmailConfirmationService } from 'src/services/email-confirmation.service';
import { ConfirmationUtil } from 'src/util/confirmation-util';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {

  submitted = false;
  formGroup: FormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private emailConfirmationService: EmailConfirmationService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        const recipientEmail = params['recipientEmail'];
        const recipientToken = params['recipientToken'];

        this.formGroup = this.generateForm(recipientEmail, recipientToken);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    const recipientEmail = this.formGroup.controls['recipientemail'].value;
    const recipientToken = this.formGroup.controls['recipienttoken'].value;
    const recipientConfirmation = this.formGroup.controls['confirmation'].value;

    this.emailConfirmationService.confirmEmail(recipientEmail, recipientToken, recipientConfirmation).subscribe(
      (response: HttpResponse<any>) => { this.handleSucces(response, recipientConfirmation); },
      (response: HttpErrorResponse) => { this.handleFailure(response); },
    );
  }

  get isFormInvalid(): boolean {
    return !this.formGroup?.controls['recipientemail'].value ||
           !this.formGroup?.controls['recipienttoken'].value ||
           !this.formGroup?.controls['confirmation'].value;
  }

  private generateForm(recipientEmail: string, recipientToken: string): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    const recipientEmailFormGroup = new FormControl(recipientEmail, Validators.required);
    recipientEmailFormGroup.disable({ onlySelf: true });

    const recipientTokenFormGroup = new FormControl(recipientToken, Validators.required);
    recipientTokenFormGroup.disable({ onlySelf: true });

    const confirmationFormGroup = new FormControl(null, Validators.required);
    
    form.addControl('recipientemail', recipientEmailFormGroup);
    form.addControl('recipienttoken', recipientTokenFormGroup);
    form.addControl('confirmation', confirmationFormGroup);

    return form;
  }

  private disableConfirmationSubmit(): void {
    this.formGroup.disable();
    this.submitted = true;
  }

  private handleSucces(response: HttpResponse<any>, recipientConfirmation: number): void {
    const confirmationStatus = ConfirmationUtil.fromValue(recipientConfirmation);
    const message = 'Email successfully confirmed with status ' + confirmationStatus;

    this.disableConfirmationSubmit();
    this.snackbar.open(message, 'Okay');
  }

  private handleFailure(response: HttpErrorResponse): void {
    const message = 'ERROR when confirming email! ' + response.error.message;

    this.snackbar.open(message, 'Close');
  }
}
