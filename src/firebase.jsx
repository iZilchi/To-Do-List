//need ang buong file na ito para sa realtime database
//link para makita content ng database na iniinput
// https://to-do-list-fee57-default-rtdb.asia-southeast1.firebasedatabase.app/tasks 
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPPr7pMI3LZxz5YAGT_DnZrRCQGnLR_xk",
  authDomain: "to-do-list-fee57.firebaseapp.com",
  databaseURL: "https://to-do-list-fee57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "to-do-list-fee57",
  storageBucket: "to-do-list-fee57.firebasestorage.app",
  messagingSenderId: "755516615929",
  appId: "1:755516615929:web:49b52a532ff3da720c0628",
  measurementId: "G-BVLNHWCHRW"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, database }; 