import { db } from '../firebase/index';
import { getDocs, collection, addDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

async function getCards() {
    const cardsCollection = collection(db, 'Cards');
    const q = query(cardsCollection, orderBy('newDate'));
    const cardsSnapshot = await getDocs(q);
    const cardsList = cardsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return cardsList;
}
async function createCard(card) {
    const docRef = await addDoc(collection(db, 'Cards'), card);
    console.log('Document written with ID: ', docRef.id);
}
async function deleteCard(id) {
    await deleteDoc(doc(db, 'Cards', id));
}

export { getCards, createCard, deleteCard };
