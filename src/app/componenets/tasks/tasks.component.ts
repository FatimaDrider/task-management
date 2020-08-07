import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText ='';
showForm =false;
  editForm =false;
tasks:Task[] =[];

resultTasks:Task[] =[];

myTask: Task ={
  label:'',
  completed:false
}
  constructor(private taskservice: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }


  getTask(){
    this.taskservice.findAll()
    .subscribe(tasks =>
       this.resultTasks = this.tasks = tasks
       )
  }


  deleteTask(id){
this.taskservice.delete(id)
     .subscribe(() =>{
       this.tasks = this.tasks.filter(task => task.id != id)
     })
  }
  perstistTask(){
    this.taskservice.persist(this.myTask)
    .subscribe((task) =>{
this.tasks =[task, ...this.tasks];
this.resetTask();
this.editForm =false;
    })
  }

  resetTask(){
    this.myTask = {
      label:'',
      completed:false
    }
  }


  toggoleCompleted(task){
    this.taskservice.completed(task.id,task.completed)
    .subscribe(() =>{
      task.completed = !task.completed

    })

  }


  editTask(task){
    this.myTask = task;
    this.editForm = true
  }


  updateTask(){
    this.taskservice.update(this.myTask)
    .subscribe(task => {
      this.resetTask();
      this.editForm =false;
    })
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.includes(this.searchText))
  }
}
