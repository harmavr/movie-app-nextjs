import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
	const db_password =
		process.env.NEXT_PUBLIC_DB_PASSWORD;

	const client = await MongoClient.connect(
		`mongodb+srv://charis:${db_password}@cluster0.3rv7l.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0`
	);
	const db = client.db();

	const documents = await db
		.collection("movies_collections")
		.find()
		.sort({ _id: -1 }) //sort in descended order
		.toArray();

	return NextResponse.json(
		{
			message: "GET request successful!",
			data: documents,
		},
		{ status: 200 }
	);
}

export async function POST(request: Request) {
	const db_password =
		process.env.NEXT_PUBLIC_DB_PASSWORD;

	const { collection } = await request.json();

	if (
		!collection ||
		!collection.title ||
		!collection.description ||
		collection.title.trim() === "" ||
		collection.description.trim() === ""
	) {
		return NextResponse.json(
			{
				message:
					"Invalid inputs for the collection",
			},
			{ status: 422 }
		);
	}

	const client = await MongoClient.connect(
		`mongodb+srv://charis:${db_password}@cluster0.3rv7l.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0`
	);
	const db = client.db();

	const newCollection = {
		title: collection.title,
		description: collection.description,
	};

	await db
		.collection("movies_collections")
		.insertOne(newCollection);
	client.close();

	return NextResponse.json(
		{
			message: "New Collection Added!",
			newCollection,
		},
		{ status: 201 }
	);
}
