import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

// Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkVBgk18_o-c6NXMfhywlUd89PQVPp0e0",
  authDomain: "flhswc-6806.firebaseapp.com",
  projectId: "flhswc-6806",
  storageBucket: "flhswc-6806.firebasestorage.app",
  messagingSenderId: "589090776939",
  appId: "1:589090776939:web:ca758ffee2c87c554f8e2e"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Function to save assessment response to Firestore
export const saveAssessmentResponse = async (assessmentData) => {
  try {
    const docRef = await addDoc(collection(db, 'assessments'), {
      ...assessmentData,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
    });
    console.log('Assessment saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving assessment:', error);
    // Fallback to localStorage if Firebase fails
    saveToLocalStorage(assessmentData);
    throw error;
  }
};

// Function to get all assessment responses (for admin/research)
export const getAllAssessments = async () => {
  try {
    const q = query(collection(db, 'assessments'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const assessments = [];
    querySnapshot.forEach((doc) => {
      assessments.push({ id: doc.id, ...doc.data() });
    });
    return assessments;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};

// Generate a random session ID
function generateSessionId() {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Fallback to localStorage if Firebase is unavailable
function saveToLocalStorage(data) {
  try {
    const existingData = JSON.parse(localStorage.getItem('assessments') || '[]');
    existingData.push({
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
    });
    localStorage.setItem('assessments', JSON.stringify(existingData));
    console.log('Assessment saved to localStorage as fallback');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export { db };
