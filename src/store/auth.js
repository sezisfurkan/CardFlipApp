import { defineStore } from 'pinia';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
//     appId: import.meta.env.VITE_APP_ID
// };

// const firebaseApp = initializeApp(firebaseConfig);

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { email: '', password: '', errorMsg: '', user: null };
    },
    actions: {
        register() {
            createUserWithEmailAndPassword(getAuth(), this.email, this.password);
        },
        async login() {
            await signInWithEmailAndPassword(getAuth(), this.email, this.password);
            const auth = getAuth();
            const userFb = auth.currentUser;
            if (userFb) {
                this.user = userFb.email;
            }
        }
    }
});
