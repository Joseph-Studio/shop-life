import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const { email, firstName, lastName, firebaseUid } =
			await request.json();

		// Validate required fields
		if (!email || !firstName || !lastName || !firebaseUid) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Create user in MongoDB
		const user = await prisma.user.create({
			data: {
				email,
				firstName,
				lastName,
				firebaseUid,
			},
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: {
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating user:", error);

		// for duplication
		if (error.code === "P2002") {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 409 }
			);
		}

		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
