"use client";

import { useState } from "react";
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
import {
	FaHome,
	FaShoppingCart,
	FaHeart,
	FaExclamationTriangle,
	FaLightbulb,
} from "react-icons/fa";

export default function ComponentsShowcase() {
	const [inputValue, setInputValue] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	return (
		<div className="container mx-auto py-12 px-4 space-y-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">
					shadcn/ui Components Showcase
				</h1>
				<p className="text-lg text-muted-foreground">
					Examples of shadcn/ui components integrated in your Shop
					Life application
				</p>
			</div>

			{/* Buttons Section */}
			<Card>
				<CardHeader>
					<CardTitle>Buttons</CardTitle>
					<CardDescription>
						Various button styles and states available in shadcn/ui
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-4">
						<Button>Default Button</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button size="sm">Small</Button>
						<Button size="lg">
							<FaShoppingCart className="w-4 h-4 mr-2" />
							Large Button
						</Button>
						<Button disabled>Disabled</Button>
					</div>
				</CardContent>
			</Card>

			{/* Form Components */}
			<Card>
				<CardHeader>
					<CardTitle>Form Components</CardTitle>
					<CardDescription>
						Input fields and form elements with proper labeling
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="demo-input">Sample Input</Label>
							<Input
								id="demo-input"
								placeholder="Enter some text..."
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email-input">Email Address</Label>
							<Input
								id="email-input"
								type="email"
								placeholder="user@example.com"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password-input">Password</Label>
							<Input
								id="password-input"
								type="password"
								placeholder="••••••••"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="disabled-input">
								Disabled Input
							</Label>
							<Input
								id="disabled-input"
								disabled
								placeholder="Disabled field"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Alerts Section */}
			<Card>
				<CardHeader>
					<CardTitle>Alerts</CardTitle>
					<CardDescription>
						Different alert variants for various messaging needs
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<AlertDescription>
							This is a default alert for general information.
						</AlertDescription>
					</Alert>

					<Alert variant="destructive">
						<FaExclamationTriangle className="h-4 w-4" />
						<AlertDescription>
							This is a destructive alert for errors or warnings.
						</AlertDescription>
					</Alert>

					<Button
						onClick={() => setShowAlert(!showAlert)}
						className="mb-4"
					>
						Toggle Dynamic Alert
					</Button>

					{showAlert && (
						<Alert>
							<FaLightbulb className="h-4 w-4" />
							<AlertDescription>
								This alert was toggled dynamically! You typed:
								&ldquo;{inputValue}&rdquo;
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>

			{/* Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<FaHome className="h-5 w-5 text-blue-600" />
							<CardTitle>Home</CardTitle>
						</div>
						<CardDescription>
							Navigate to the home page
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button className="w-full">Go Home</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<FaShoppingCart className="h-5 w-5 text-green-600" />
							<CardTitle>Shopping</CardTitle>
						</div>
						<CardDescription>Browse our products</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="secondary" className="w-full">
							<FaShoppingCart className="w-4 h-4 mr-2" />
							Shop Now
						</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<FaHeart className="h-5 w-5 text-red-600" />
							<CardTitle>Favorites</CardTitle>
						</div>
						<CardDescription>View your saved items</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full">
							<FaHeart className="w-4 h-4 mr-2" />
							View Favorites
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Footer */}
			<Card>
				<CardContent className="pt-6">
					<div className="text-center">
						<p className="text-muted-foreground">
							These are just a few examples of the shadcn/ui
							components available in your project. Visit the{" "}
							<a
								href="https://ui.shadcn.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-primary hover:underline"
							>
								shadcn/ui documentation
							</a>{" "}
							to explore more components.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
