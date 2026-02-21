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
import { getDoc } from 'firebase/firestore';

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

  async addDucks(name: string, color: Color) {
    const newDuck: Duck = {
      name: name,
      color: color,
      createdAt: serverTimestamp(),
    };

    if (!newDuck) return;

    await addDoc(this.ducksCol, newDuck);
  }

  async editDuck(duckId: string, newDuck: Duck) {
    if (!duckId) return;

    const duckDoc = doc(this.firestore, 'ducks', duckId);

    if (!duckDoc) return;

    await updateDoc(duckDoc, {
      name: newDuck.name,
      color: newDuck.color,
      modifiedAt: serverTimestamp(),
    });
  }

  async deleteDuck(duckId: string) {
    if (!duckId) return;

    const duckDoc = doc(this.firestore, 'ducks', duckId);

    if (!duckDoc) return;

    await deleteDoc(duckDoc);
  }

  getAllducks$() {
    return collectionData(this.ducksCol, { idField: 'id' }) as Observable<Duck[]>;
  }

  async getDuckByID(duckId: string) {
    const duckDoc = doc(this.firestore, 'ducks', duckId);
    const snapshot = await getDoc(duckDoc);

    return { id: snapshot.id, ...(snapshot.data() as Duck) };
  }
}
