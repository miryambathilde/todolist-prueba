import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: [ './add-task.component.css' ]
})
export class AddTaskComponent implements OnInit {

  taskForm!: FormGroup;


  constructor (private formBuilder: FormBuilder, private router: Router, private tasksService: TasksService) {
    this.taskForm = this.formBuilder.group({
      title: [ '', Validators.required ],
      date: [ '', Validators.required ]
    });
  }

  ngOnInit (): void { }

  addTask (): void {
    if (this.taskForm.valid) {
      const newTask: Tasks = {
        id: 0, // La ID se generará automáticamente en el servicio
        title: this.taskForm.value.title,
        date: new Date(this.taskForm.value.date)
      };
      this.tasksService.addTask(newTask).subscribe(() => {
        this.router.navigate([ '/task-list' ]);
      });
    }
  }

  onCancel (): void {
    this.router.navigate([ '/task-list' ]);
  }

}
