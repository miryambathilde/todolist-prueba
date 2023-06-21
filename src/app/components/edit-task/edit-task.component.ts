import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: [ './edit-task.component.css' ]
})
export class EditTaskComponent implements OnInit {

  taskForm!: FormGroup;
  taskId!: number;
  task!: Tasks;

  constructor (private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private tasksService: TasksService) {
    this.taskForm = this.formBuilder.group({
      title: [ '', Validators.required ],
      date: [ '', Validators.required ]
    });
  }

  ngOnInit (): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask();
  }

  loadTask (): void {
    this.tasksService.getTaskById(this.taskId).subscribe((task: Tasks | undefined) => {
      if (task) {
        this.task = task;
        this.taskForm.patchValue({
          title: task?.title || '',
          date: task?.date ? task.date.toISOString().substring(0, 10) : ''
        });
      }
    });
  }



  onSave (): void {
    if (this.taskForm.valid) {
      const updatedTask: Tasks = {
        id: this.task.id,
        title: this.taskForm.value.title,
        date: new Date(this.taskForm.value.date)
      };
      this.tasksService.updateTask(updatedTask).subscribe(() => {
        this.router.navigate([ '/task-list' ]);
      });
    }
  }

  onCancel (): void {
    this.router.navigate([ '/task-list' ]);
  }

}
