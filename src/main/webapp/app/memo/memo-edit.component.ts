import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { MemoService } from 'app/memo/memo.service';
import { MemoDTO } from 'app/memo/memo.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validUuid } from 'app/common/utils';


@Component({
  selector: 'app-memo-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './memo-edit.component.html'
})
export class MemoEditComponent implements OnInit {

  memoService = inject(MemoService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  userValues?: Record<string,string>;
  currentMemoId?: string;

  editForm = new FormGroup({
    memoId: new FormControl({ value: null, disabled: true }),
    relatedToType: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    relatedToId: new FormControl(null, [Validators.required, validUuid]),
    memoText: new FormControl(null, [Validators.required]),
    user: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@memo.update.success:Memo was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentMemoId = this.route.snapshot.params['memoId'];
    this.memoService.getUserValues()
        .subscribe({
          next: (data) => this.userValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.memoService.getMemo(this.currentMemoId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new MemoDTO(this.editForm.value);
    this.memoService.updateMemo(this.currentMemoId!, data)
        .subscribe({
          next: () => this.router.navigate(['/memos'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
