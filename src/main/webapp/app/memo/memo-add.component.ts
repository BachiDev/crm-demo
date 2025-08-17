import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { MemoService } from 'app/memo/memo.service';
import { MemoDTO } from 'app/memo/memo.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validUuid } from 'app/common/utils';


@Component({
  selector: 'app-memo-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './memo-add.component.html'
})
export class MemoAddComponent implements OnInit {

  memoService = inject(MemoService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  userValues?: Record<string,string>;

  addForm = new FormGroup({
    relatedToType: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    relatedToId: new FormControl(null, [Validators.required, validUuid]),
    memoText: new FormControl(null, [Validators.required]),
    user: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@memo.create.success:Memo was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.memoService.getUserValues()
        .subscribe({
          next: (data) => this.userValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new MemoDTO(this.addForm.value);
    this.memoService.createMemo(data)
        .subscribe({
          next: () => this.router.navigate(['/memos'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
