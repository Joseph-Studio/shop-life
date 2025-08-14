"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signup = async (email, password, firstName, lastName) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Update the user profile with display name
			await updateProfile(userCredential.user, {
				displayName: `${firstName} ${lastName}`,
			});

			// Save user details to MongoDB
			try {
				const response = await fetch("/api/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						firstName,
						lastName,
						firebaseUid: userCredential.user.uid,
					}),
				});

				if (!response.ok) {
					console.error(
						"Failed to save user to MongoDB:",
						await response.text()
					);
				}
			} catch (mongoError) {
				console.error("Error saving user to MongoDB:", mongoError);
				// Don't throw this error - Firebase user was created successfully
			}

			return userCredential;
		} catch (error) {
			throw error;
		}
	};

	const login = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return userCredential;
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		setUser(null);
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
