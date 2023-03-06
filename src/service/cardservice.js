import { db } from '../firebase/index';
import { getDocs, collection, addDoc, deleteDoc, doc, orderBy, query, where } from 'firebase/firestore';

async function getCards(userId) {
    const userDocRef = doc(db, 'Users', userId);
    const cardsCollectionRef = collection(userDocRef, 'Cards');
    const q = query(cardsCollectionRef, orderBy('newDate'));
    const cardsSnapshot = await getDocs(q);
    const cardsList = cardsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return cardsList;
}

async function createCard(userId, card) {
    const userDocRef = doc(db, 'Users', userId);
    const cardsCollectionRef = collection(userDocRef, 'Cards');
    const docRef = await addDoc(cardsCollectionRef, card);
    return docRef;
}

async function deleteCard(userId, cardId) {
    const userDocRef = doc(db, 'Users', userId);
    const cardDocRef = doc(userDocRef, 'Cards', cardId);
    await deleteDoc(cardDocRef);
}

async function queryCards(searchTerm, userId) {
    const userDocRef = doc(db, 'Users', userId);
    const cardsCollectionRef = collection(userDocRef, 'Cards');
    let q = cardsCollectionRef;
    if (searchTerm !== 'ALL') {
        q = query(cardsCollectionRef, where('categoryName', '==', searchTerm), orderBy('newDate'));
    } else {
        q = query(cardsCollectionRef, orderBy('newDate'));
    }
    const cardsSnapshot = await getDocs(q);
    const cardsList = cardsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return cardsList;
}

export { getCards, createCard, deleteCard, queryCards };
