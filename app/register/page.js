"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
	FaUserPlus,
	FaEnvelope,
	FaLock,
	FaCheck,
	FaExclamationCircle,
	FaSpinner,
} from "react-icons/fa";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { signup } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Basic validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			setIsLoading(false);
			return;
		}

		try {
			await signup(
				formData.email,
				formData.password,
				formData.firstName,
				formData.lastName
			);
			router.push("/");
		} catch (err) {
			console.error("Registration error:", err);
			switch (err.code) {
				case "auth/email-already-in-use":
					setError("An account with this email already exists.");
					break;
				case "auth/invalid-email":
					setError("Please enter a valid email address.");
					break;
				case "auth/weak-password":
					setError(
						"Password is too weak. Please choose a stronger password."
					);
					break;
				default:
					setError("Registration failed. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full">
				{/* Main card */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 space-y-8">
					{/* Header */}
					<div className="text-center">
						<div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
							<FaUserPlus className="h-8 w-8 text-white" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900">
							Join Shop Life
						</h2>
						<p className="mt-3 text-gray-600">
							Create your account and start your shopping journey
						</p>
					</div>

					{/* Form */}
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-5">
							{/* Name fields */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										First name
									</label>
									<input
										id="firstName"
										name="firstName"
										type="text"
										autoComplete="given-name"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="First name"
										value={formData.firstName}
										onChange={handleChange}
									/>
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Last name
									</label>
									<input
										id="lastName"
										name="lastName"
										type="text"
										autoComplete="family-name"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Last name"
										value={formData.lastName}
										onChange={handleChange}
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Email address
								</label>
								<div className="relative">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Enter your email"
										value={formData.email}
										onChange={handleChange}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<FaEnvelope className="h-5 w-5 text-gray-400" />
									</div>
								</div>
							</div>

							{/* Password */}
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Create a password"
										value={formData.password}
										onChange={handleChange}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<FaLock className="h-5 w-5 text-gray-400" />
									</div>
								</div>
								<p className="mt-1 text-xs text-gray-500">
									Password must be at least 6 characters long
								</p>
							</div>

							{/* Confirm Password */}
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Confirm password
								</label>
								<div className="relative">
									<input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										autoComplete="new-password"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Confirm your password"
										value={formData.confirmPassword}
										onChange={handleChange}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<FaCheck className="h-5 w-5 text-gray-400" />
									</div>
								</div>
							</div>
						</div>

						{error && (
							<div className="bg-red-100 border border-red-300 rounded-md p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<FaExclamationCircle className="h-5 w-5 text-red-500" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-red-700">
											{error}
										</p>
									</div>
								</div>
							</div>
						)}

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
							>
								{isLoading ? (
									<div className="flex items-center">
										<FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
										Creating account...
									</div>
								) : (
									<span className="flex items-center">
										<FaUserPlus className="w-5 h-5 mr-2" />
										Create account
									</span>
								)}
							</button>
						</div>
					</form>

					{/* Footer */}
					<div className="text-center border-t border-gray-200 pt-6">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/login"
								className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
