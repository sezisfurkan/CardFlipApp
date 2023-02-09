import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAf3zRDPDP8G8LHGCnYXt35HOZAU-H5c7A',
    authDomain: 'cardflipapp-2655f.firebaseapp.com',
    projectId: 'cardflipapp-2655f',
    storageBucket: 'cardflipapp-2655f.appspot.com',
    messagingSenderId: '158265750939',
    appId: '1:158265750939:web:f8d1ddc7a79640c0e79d3e'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
