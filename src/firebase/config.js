import { initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAX6SEchN9tHFooLh3-FH9FP4vOpOGQVHw",
  authDomain: "exam-5da15.firebaseapp.com",
  projectId: "exam-5da15",
  storageBucket: "exam-5da15.appspot.com",
  messagingSenderId: "219006766856",
  appId: "1:219006766856:web:f6f16555d5b54e76f926bd",
  measurementId: "G-NL64GNX79C"
};


 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 
  const db = getFirestore();

  const auth = getAuth();

  const storage = getStorage(app);

  
  export { db, auth, storage, analytics}
   