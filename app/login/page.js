"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
	FaUser,
	FaEnvelope,
	FaLock,
	FaSignInAlt,
	FaExclamationCircle,
	FaSpinner,
} from "react-icons/fa";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { login } = useAuth();

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

		try {
			await login(formData.email, formData.password);
			router.push("/");
		} catch (err) {
			console.error("Login error:", err);
			switch (err.code) {
				case "auth/user-not-found":
					setError("No account found with this email address.");
					break;
				case "auth/wrong-password":
					setError("Incorrect password. Please try again.");
					break;
				case "auth/invalid-email":
					setError("Please enter a valid email address.");
					break;
				case "auth/too-many-requests":
					setError(
						"Too many failed attempts. Please try again later."
					);
					break;
				default:
					setError("Login failed. Please check your credentials.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				{/* Main card */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 space-y-8">
					{/* Header */}
					<div className="text-center">
						<div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
							<FaUser className="h-8 w-8 text-white" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900">
							Welcome back
						</h2>
						<p className="mt-3 text-gray-600">
							Sign in to your account to continue shopping
						</p>
					</div>

					{/* Form */}
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-5">
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
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Enter your email"
										value={formData.email}
										onChange={handleChange}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<FaEnvelope className="h-5 w-5 text-gray-400" />
									</div>
								</div>
							</div>

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
										autoComplete="current-password"
										required
										className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
										placeholder="Enter your password"
										value={formData.password}
										onChange={handleChange}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<FaLock className="h-5 w-5 text-gray-400" />
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
								className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
							>
								{isLoading ? (
									<div className="flex items-center">
										<FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
										Signing in...
									</div>
								) : (
									<span className="flex items-center">
										<FaSignInAlt className="w-5 h-5 mr-2" />
										Sign in
									</span>
								)}
							</button>
						</div>

						<div className="flex items-center justify-between">
							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
								>
									Forgot your password?
								</a>
							</div>
						</div>
					</form>

					{/* Footer */}
					<div className="text-center">
						<p className="text-sm text-gray-600">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
							>
								Create one now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
