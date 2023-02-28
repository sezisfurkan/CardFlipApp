import { defineStore } from 'pinia';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
        return { email: '', password: '', errorMsg: '', user: null, errorMsg: '' };
    },
    actions: {
        register() {
            createUserWithEmailAndPassword(getAuth(), this.email, this.password);
        },
        async signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(getAuth(), provider);
            const auth = getAuth();
            const userFb = auth.currentUser;
            if (userFb) {
                this.user = userFb.email;
            }
        },
        async login() {
            try {
                await signInWithEmailAndPassword(getAuth(), this.email, this.password);
                const auth = getAuth();
                const userFb = auth.currentUser;
                if (userFb) {
                    this.user = userFb;
                    // this.user.uid = userFb.uid;
                }
            } catch (error) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        this.errorMsg = 'Invalid Email';
                        break;
                    case 'auth/user-disabled':
                        this.errorMsg = 'User Disabled';
                        break;
                    case 'auth/user-not-found':
                        this.errorMsg = 'User Not Found';
                        break;
                    case 'auth/wrong-password':
                        this.errorMsg = 'Wrong Password';
                        break;
                    default:
                        this.errorMsg = 'Unknown Error';
                        break;
                }
            }
        },

        signOut() {
            const auth = getAuth();
            signOut(auth);
            this.user = null;
        }
    }
});
