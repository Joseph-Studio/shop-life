import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const { firebaseUid } = await request.json();

		if (!firebaseUid) {
			return NextResponse.json(
				{ error: "Firebase UID is required" },
				{ status: 400 }
			);
		}

		// Find user by Firebase UID
		const user = await prisma.user.findUnique({
			where: {
				firebaseUid,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				createdAt: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user" },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
