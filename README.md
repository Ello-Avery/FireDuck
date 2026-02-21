# 🔥🦆 Fire Duck

A real-time CRUD application built with Angular and Firebase Firestore. Add, view, and delete ducks — live!

---

## Tech Stack

- **Angular 21** — Component framework
- **Firebase / Firestore** — Real-time NoSQL database
- **AngularFire 21** — Angular-native Firebase integration
- **RxJS** — Observable-based real-time data stream

---

## Features

- Add a duck with a name and color
- View all ducks in real time via Firestore `collectionData` Observable
- Delete a duck (shoo it away 🦆)
- Color selection via radio buttons (Blue, White, Red)
- Two-way data binding with `ngModel`

---

## Data Model

```typescript
export type Color = 'Blue' | 'White' | 'Red';

export interface Duck {
  id?: string;
  name: string;
  color: Color;
  createdAt?: FieldValue;
  modifiedAt?: FieldValue;
}
```

---

## Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI
- A Firebase project with Firestore enabled

### Installation

```bash
git clone <your-repo-url>
cd fire-duck
npm install
```

### Firebase Configuration

In `app.config.ts`, add your Firebase config:

```typescript
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: '...',
        authDomain: '...',
        projectId: '...',
        storageBucket: '...',
        messagingSenderId: '...',
        appId: '...',
      }),
    ),
    provideFirestore(() => getFirestore()),
  ],
};
```

### Run Locally

```bash
ng serve
```

Navigate to `http://localhost:4200`

---

## Project Structure

```
src/
├── app/
│   ├── data/
│   │   └── ducks-service.ts   # Firestore CRUD service
│   └── pages/
│       └── home/
│           ├── home.ts        # Component logic
│           ├── home.html      # Template
│           └── home.css       # Styles
```

---

## Service Overview

The `DucksService` handles all Firestore interactions:

| Method                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `addDuck(name, color)` | Creates a new duck document                 |
| `getducks$()`          | Returns a real-time Observable of all ducks |
| `updateDuck(id, duck)` | Updates an existing duck                    |
| `deleteDuck(id)`       | Deletes a duck by ID                        |

---

## Notes

- `createdAt` and `modifiedAt` use Firestore's `serverTimestamp()` — these are written as `FieldValue` and resolved to `Timestamp` on read.
- The ducks collection is created automatically in Firestore on first write — no pre-setup needed.
- Real-time updates are powered by `collectionData` wrapped in `query()` to satisfy AngularFire's type requirements.
