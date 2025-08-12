"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
	FaUser,
	FaSignInAlt,
	FaExclamationCircle,
	FaSpinner,
} from "react-icons/fa";
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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
							<FaUser className="h-8 w-8 text-white" />
						</div>
						<CardTitle className="text-3xl font-bold">
							Welcome back
						</CardTitle>
						<CardDescription className="text-base">
							Sign in to your account to continue shopping
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Form */}
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="space-y-4">
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

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										placeholder="Enter your password"
										value={formData.password}
										onChange={handleChange}
									/>
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
										Signing in...
									</>
								) : (
									<>
										<FaSignInAlt className="w-4 h-4 mr-2" />
										Sign in
									</>
								)}
							</Button>

							<div className="flex items-center justify-between">
								<div className="text-sm">
									<a
										href="#"
										className="font-medium text-primary hover:underline"
									>
										Forgot your password?
									</a>
								</div>
							</div>
						</form>

						{/* Footer */}
						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Don&apos;t have an account?{" "}
								<Link
									href="/register"
									className="font-medium text-primary hover:underline"
								>
									Create one now
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
