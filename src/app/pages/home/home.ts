import { Component, inject, signal } from '@angular/core';
import { Duck, DucksService } from '../../data/ducks-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  db = inject(DucksService);

  editMode = signal(false);

  allDucks$ = toSignal(this.db.getAllducks$(), { initialValue: [] });

  duck = signal<Duck>({
    name: '',
    color: 'Blue',
  });

  addDuck() {
    if (this.duck().name.trim() === '' || this.duck().color.trim() === '') {
      alert('Name and Color are required!');
      return;
    }

    this.db.addDucks(this.duck().name.trim(), this.duck().color);

    this.resetForm();
  }

  deleteDuck(duckId: string) {
    //this.isDuckValid(duckId);
    if (!duckId) {
      alert('No duck found!');
      return;
    }

    this.db.deleteDuck(duckId);
  }

  editDuck() {
    this.isDuckValid(this.duck().id!, this.duck());

    this.db.editDuck(this.duck().id!, this.duck());

    this.editMode.set(false);
    this.resetForm();
  }

  async getDuckById(duckId: string) {
    if (!duckId) {
      alert('No duck found!');
      return;
    }

    this.editMode.set(true);

    const duckDoc = await this.db.getDuckByID(duckId);

    this.duck.set(duckDoc);
  }

  isDuckValid(duckId: string, duck?: Duck) {
    if (!duckId) {
      alert('No duck found!');
      return;
    }

    if (this.duck().name.trim() === '' || this.duck().color.trim() === '') {
      alert('Name and Color are required!');
      return;
    }
  }

  resetForm() {
    this.duck.set({
      name: '',
      color: 'Blue',
    });
  }
}
