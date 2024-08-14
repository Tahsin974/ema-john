import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";
const firebaseInitializeAuthentication = () =>{
    initializeApp(firebaseConfig);

} 

export default firebaseInitializeAuthentication;