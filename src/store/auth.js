import { defineStore } from 'pinia';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { email: '', password: '', errorMsg: '', user: null, errorMsg: '' };
    },
    actions: {
        register() {
            createUserWithEmailAndPassword(getAuth(), this.email, this.password);
        },
        async signInWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                const result = await signInWithPopup(auth, provider);
                if (result.user) {
                    this.user = result.user;
                }
            } catch (error) {
                console.log(error);
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
