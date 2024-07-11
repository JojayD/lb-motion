/**
 * Updates user login with the timestamp of the last login and if the user is not in the database, it creates a new user.
 * @param {string} email
  * @returns {Promise<void>}
 */
import { db } from "../../../backend/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function updateLogin(email) {
	try {
		const docRef = doc(db, "users", email);
		const payload = {
			email: email,
			lastLogin: new Date().toISOString(),
		};
		await setDoc(docRef, payload, { merge: true });
		console.log("User last login updated successfully");
	} catch (error) {
		console.error("Error updating user last login:", error);
	}
}
