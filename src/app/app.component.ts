import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

const TASK_KEY = 'tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'pomodoro';
  duration = 25;
  tasks = new Array();
  currentItem = '';

  onClick() {
    console.log("click");
  }

  addItem() {
    if (this.currentItem !== '') {
      this.tasks.unshift(this.currentItem);
      this.currentItem = '';
      window.localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
    }
  }

  ngAfterViewInit(){
    const tasks_string = window.localStorage.getItem('tasks');
    if (tasks_string != null) {
      this.tasks = JSON.parse(tasks_string);
    }
  }

}
