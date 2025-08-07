"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FaUserPlus, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";

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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full">
				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
							<FaUserPlus className="h-8 w-8 text-white" />
						</div>
						<CardTitle className="text-3xl font-bold">
							Join Shop Life
						</CardTitle>
						<CardDescription className="text-base">
							Create your account and start your shopping journey
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Form */}
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="space-y-4">
								{/* Name fields */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">
											First name
										</Label>
										<Input
											id="firstName"
											name="firstName"
											type="text"
											autoComplete="given-name"
											required
											placeholder="First name"
											value={formData.firstName}
											onChange={handleChange}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">
											Last name
										</Label>
										<Input
											id="lastName"
											name="lastName"
											type="text"
											autoComplete="family-name"
											required
											placeholder="Last name"
											value={formData.lastName}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Email */}
								<div className="space-y-2">
									<Label htmlFor="email">Email address</Label>
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										placeholder="Enter your email"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>

								{/* Password */}
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										required
										placeholder="Create a password"
										value={formData.password}
										onChange={handleChange}
									/>
									<p className="text-xs text-muted-foreground">
										Password must be at least 6 characters
										long
									</p>
								</div>

								{/* Confirm Password */}
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">
										Confirm password
									</Label>
									<div className="relative">
										<Input
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											autoComplete="new-password"
											required
											placeholder="Confirm your password"
											value={formData.confirmPassword}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>

							{error && (
								<Alert variant="destructive">
									<FaExclamationCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<Button
								type="submit"
								disabled={isLoading}
								className="w-full"
								size="lg"
							>
								{isLoading ? (
									<>
										<FaSpinner className="animate-spin mr-2 h-4 w-4" />
										Creating account...
									</>
								) : (
									<>
										<FaUserPlus className="w-4 h-4 mr-2" />
										Create account
									</>
								)}
							</Button>
						</form>

						{/* Footer */}
						<div className="text-center border-t pt-6">
							<p className="text-sm text-muted-foreground">
								Already have an account?{" "}
								<Link
									href="/login"
									className="font-medium text-primary hover:underline"
								>
									Sign in here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
