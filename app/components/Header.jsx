"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Button } from "../../components/ui/button";
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Brand */}
					<div className="flex items-center">
						<Link
							href="/"
							className="text-xl font-bold text-gray-900"
						>
							ShopLife
						</Link>
					</div>

					{/* Auth Buttons */}
					<div className="flex items-center space-x-4">
						{user ? (
							<div className="flex items-center space-x-4">
								<span className="text-sm text-gray-700">
									Welcome, {user.displayName || user.email}
								</span>
								<Button
									onClick={handleLogout}
									variant="outline"
									size="sm"
									className="flex items-center space-x-2"
								>
									<FaSignOutAlt className="w-4 h-4" />
									<span>Logout</span>
								</Button>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Link href="/login">
									<Button
										variant="outline"
										size="sm"
										className="flex items-center space-x-2"
									>
										<FaSignInAlt className="w-4 h-4" />
										<span>Login</span>
									</Button>
								</Link>
								<Link href="/register">
									<Button
										size="sm"
										className="flex items-center space-x-2"
									>
										<FaUserPlus className="w-4 h-4" />
										<span>Register</span>
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
