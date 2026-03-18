import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, } from '@angular/forms';
import { BookadminService } from '../bookadmin.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {

  taskForm!: FormGroup;

  constructor(private bookAdminService: BookadminService) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      taskName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

  }

  onSubmit() {
    let obj = {
      name: this.taskForm.get('name')?.value,
      number: this.taskForm.get('number')?.value,
      taskName: this.taskForm.get('taskName')?.value,
      description: this.taskForm.get('description')?.value,
    };
    if (this.taskForm.valid) {
      this.bookAdminService.setTask(obj).subscribe((res) => {
        console.log(res);
      });
    }

    //  this.taskForm.reset();
  }
}
