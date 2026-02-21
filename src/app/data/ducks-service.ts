import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionReference } from '@angular/fire/firestore';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  FieldValue,
  collectionData,
} from '@angular/fire/firestore';

export type Color = 'Blue' | 'White' | 'Red';

export interface Duck {
  id?: string;
  name: string;
  color: Color;
  createdAt?: FieldValue;
  modifiedAt?: FieldValue;
}

@Injectable({
  providedIn: 'root',
})
export class DucksService {
  private readonly firestore = inject(Firestore);
  private readonly ducksCol = collection(this.firestore, 'ducks') as CollectionReference<Duck>;

  /*
   *   ██████╗██████╗ ██╗   ██╗██████╗      █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
   *  ██╔════╝██╔══██╗██║   ██║██╔══██╗    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
   *  ██║     ██████╔╝██║   ██║██║  ██║    ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
   *  ██║     ██╔══██╗██║   ██║██║  ██║    ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
   *  ╚██████╗██║  ██║╚██████╔╝██████╔╝    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
   *   ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═══╝╚══════╝
   */

  async addDuck(name: string, color: Color) {
    const newDuck: Duck = {
      name: name,
      color: color,
      createdAt: serverTimestamp(),
    };

    const duckRef = await addDoc(this.ducksCol, newDuck);

    return duckRef.id;
  }

  async updateDuck(duckId: string, newDuck: Duck) {
    const duckDoc = doc(this.firestore, 'ducks', duckId);

    await updateDoc(duckDoc, {
      name: newDuck.name,
      color: newDuck.color,
      modifiedAt: serverTimestamp(),
    });
  }

  async deleteDuck(duckId: string) {
    const duckDoc = doc(this.firestore, 'ducks', duckId);

    await deleteDoc(duckDoc);
  }

  async getAllDucks() {
    const snapshot = await getDocs(this.ducksCol);

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Duck),
    }));
  }

  getducks$() {
    return collectionData(this.ducksCol, { idField: 'id' }) as Observable<Duck[]>;
  }
}
