"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";

export default function Home() {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>
				<h1 className="text-4xl font-bold text-center sm:text-left">
					Welcome to Shop Life
				</h1>

				{user ? (
					<div className="flex flex-col gap-4 items-center sm:items-start">
						<p className="text-lg text-gray-600 text-center sm:text-left max-w-md">
							Welcome back, {user.displayName || user.email}!
							You&#39;re successfully logged in.
						</p>
						<div className="flex gap-4 items-center flex-col sm:flex-row">
							<button
								onClick={handleLogout}
								className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
							>
								Sign Out
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4 items-center sm:items-start">
						<p className="text-lg text-gray-600 text-center sm:text-left max-w-md">
							Your one-stop destination for all your shopping
							needs. Get started by creating an account or signing
							in.
						</p>
						<div className="flex gap-4 items-center flex-col sm:flex-row">
							<Link
								className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-600 text-white gap-2 hover:bg-indigo-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
								href="/register"
							>
								Get Started
							</Link>
							<Link
								className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
								href="/login"
							>
								Sign In
							</Link>
						</div>
					</div>
				)}
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
