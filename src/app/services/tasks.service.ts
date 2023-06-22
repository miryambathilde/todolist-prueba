import { Injectable } from '@angular/core';
import { Tasks } from '../interfaces/tasks';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  tasks: Tasks[] = []
  /* tasks: Tasks[] = [
    {
      id: 1,
      title: 'Task 1',
      date: new Date(Date.now())
    },
    {
      id: 2,
      title: 'Task 2',
      date: new Date(Date.now())
    }
  ] */

  constructor () { }

  getAll (): Observable<Tasks[]> {
    return of(this.tasks)
  }

  getTaskById (id: number): Observable<Tasks | undefined> {
    return of(this.tasks.find(task => task.id === id))
  }


  private currentId = 0;
  addTask (task: Tasks): Observable<Tasks> {
    task.id = ++this.currentId
    this.tasks.push(task)
    return of(task)
  }

  updateTask (taskUpdated: Tasks): Observable<Tasks | undefined> {
    const taskIndex = this.tasks.findIndex(task => task.id === taskUpdated.id)
    this.tasks[ taskIndex ] = taskUpdated
    return of(taskUpdated)
  }


  deleteTask (id: number): Observable<boolean> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return of(this.tasks.length !== 0);
  }

}
