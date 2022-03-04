import { firebaseConfig } from 'configs';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  getDatabase,
  ref as databaseRef,
  set as databaseSet,
  onValue as databaseOnValue,
  get as databaseGet,
  child as databaseChild,
  off as databaseOff,
} from 'firebase/database';
import _ from 'lodash';
import { LoginPayload, SignupPayload } from 'interfaces';
import { UserModel } from 'models';
import { loge } from 'shared';

const TAG = 'FIREBASE_SERVICE';

// Just in case we want to ignore configs/firebase-env.ts
const config = {
  apiKey: `${firebaseConfig.apiKey}`,
  authDomain: `${firebaseConfig.authDomain}`,
  projectId: `${firebaseConfig.projectId}`,
  storageBucket: `${firebaseConfig.storageBucket}`,
  messagingSenderId: `${firebaseConfig.messagingSenderId}`,
  appId: `${firebaseConfig.appId}`,
};

const app = initializeApp(config);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

const doCreateUserProfileDocument = async (user: any, additionalInfo?: any) => {
  if (_.isEmpty(user)) {
    return;
  }

  const ref = databaseChild(databaseRef(database), `users/${user.uid}`);
  const snapshot = await databaseGet(ref);
  if (!snapshot.exists()) {
    const { displayName, email, photoURL } = user;
    try {
      await databaseSet(ref, {
        displayName,
        email,
        photoURL,
        createdAt: Date.now(),
        ...additionalInfo,
      });
    } catch (error: any) {
      console.error('Error creating user', error.message);
    }
  }

  return doGetUserDocument(user.uid);
};

const doGetUserDocument = async (uid: string) => {
  if (_.isEmpty(uid)) {
    return null;
  }

  const ref = databaseRef(database);
  const snapshot = await databaseGet(databaseChild(ref, `users/${uid}`));
  if (_.isEmpty(snapshot) || !snapshot.exists()) {
    return null;
  }

  return snapshot.val();
};

const doGetCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      unsubcribeFromAuth();
      resolve(userAuth);
    }, reject);
  });
};

const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: SignupPayload): Promise<UserModel> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userToStore = new UserModel(user);

    await databaseSet(databaseRef(database, `users/${user.uid}`), userToStore);

    return userToStore;
  } catch (error: any) {
    loge(TAG, `${error.message}`);
    throw error;
  }
};

const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: LoginPayload): Promise<UserModel> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return new UserModel(user);
  } catch (error: any) {
    loge(TAG, `${error.message}`);
    throw error;
  }
};

export {
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL as doGetDownloadURL,
  auth,
  signOut as doSignOut,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doGetUserDocument,
  doGetCurrentUser,
  doCreateUserProfileDocument,
  database,
  databaseRef,
  databaseSet,
  databaseOnValue,
  databaseGet,
  databaseChild,
  databaseOff,
};
