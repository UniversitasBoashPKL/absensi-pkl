const firebaseConfig = {
  apiKey: "AIzaSyDHCN6nzqVYAjrataDYnhDREgElZa0x94E",
  authDomain: "pklboash-5157f.firebaseapp.com",
  projectId: "pklboash-5157f",
  storageBucket: "pklboash-5157f.firebasestorage.app",
  messagingSenderId: "8124585594",
  appId: "1:8124585594:web:c9dd9f188fa8b306ff0dc3",
  measurementId: "G-DMCK2NK0M7"
};
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;
