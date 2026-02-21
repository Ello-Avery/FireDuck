import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { DucksService } from '../../data/ducks-service';
import { Duck, Color } from '../../data/ducks-service';
import { OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  db = inject(DucksService);
  // allDucks = signal<Duck[]>([]);

  allDucks$ = this.db.getducks$();

  // async ngOnInit() {
  //   const duckList = await this.db.getAllDucks();
  //   this.allDucks.set(duckList);
  // }

  seeDucks() {
    console.log(this.allDucks$);
  }

  name = '';
  color: Color = 'Blue';

  addDuck() {
    this.db.addDuck(this.name, this.color);
    this.name = '';
    this.color = 'Blue';
  }

  deleteDuck(duckId: string) {
    this.db.deleteDuck(duckId);
  }
}
