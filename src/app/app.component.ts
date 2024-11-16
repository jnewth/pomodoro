import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

const TASK_LIST = 'tasks';
const TASK_ID = 'tasks_id';
const START_ID = 1;

type Task = {
  desc: string;
  id: number;
  pomodoroCount: number;
}

function CreateTask(desc: string, id: number): Task {
  return {
    desc: desc,
    id: id,
    pomodoroCount : 0
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pomodo';
  duration = 25;
  tasks = new Array<Task>(); //task is an id and a string value
  nextId = START_ID;
  currentItem = '';
  taskInProgress?: Task; //might be nothing
  timerInProgress: number = 0;

  ngAfterViewInit() {
    const tasks_string = window.localStorage.getItem(TASK_LIST);
    const tasks_id = window.localStorage.getItem(TASK_ID)
    if (tasks_string != null && tasks_id != null) {
      this.tasks = JSON.parse(tasks_string);
      this.nextId = JSON.parse(tasks_id);
    }
  }

  onClick() {
    console.log("click");
  }

  addItem() {
    if (this.currentItem !== '') {
      this.tasks.unshift(CreateTask(this.currentItem, this.nextId++));
      this.currentItem = '';
      window.localStorage.setItem(TASK_LIST, JSON.stringify(this.tasks));
      window.localStorage.setItem(TASK_ID, JSON.stringify(this.nextId));
    }
  }

  startItem(task: Task) {
    //behavior: pop from todo
    //add to in progress
    //stop should return to todo list
    //pause should pause
    //pause should become resume so only exit is cancel / (pause/resume) / complete
    this.onClick();
  }


  deleteItem(task: Task) {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  clearItems() {
    this.tasks = [];
    this.nextId = START_ID;
  }
}
