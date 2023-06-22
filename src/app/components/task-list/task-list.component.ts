import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/interfaces/tasks';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.css' ]
})
export class TaskListComponent implements OnInit {

  tasks: Tasks[] = [];

  constructor (private tasksService: TasksService, private router: Router) { }

  ngOnInit (): void {
    this.AllTask();
  }

  AllTask () {
    this.tasksService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask (id: number): void {
    // alert are you sure?
    if (!confirm('Are you sure?')) return;
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  editTask (id: number): void {
    this.router.navigate([ '/edit/task', id ]);
  }

}
