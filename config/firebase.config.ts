import { applicationDefault, initializeApp } from 'firebase-admin/app';
// import * as firebase from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
    credential: applicationDefault(),
});

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
