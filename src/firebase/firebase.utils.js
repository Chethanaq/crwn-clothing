import firebase, { database, storage, messaging } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyB_nVfks-YWKltUZwELBnHRLbRRBGE6uc4",
    authDomain: "crwn-db-bf96d.firebaseapp.com",
    databaseURL: "https://crwn-db-bf96d.firebaseio.com",
    projectId: "crwn-db-bf96d",
    storageBucket: "crwn-db-bf96d.appspot.com",
    messagingSenderId: "780047266613",
    appId: "1:780047266613:web:b7d6e7d5aaf8882279d27c",
    measurementId: "G-YCYLR2YV6K"
};

export const createUserProfileDocument = async (userAuth,addiotionalData) => {
    if(!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName,email} =userAuth;
        const createdAt =new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addiotionalData
            });
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore =firebase.firestore();


const provider =new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;