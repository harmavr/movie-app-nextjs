import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
	const db_password =
		process.env.NEXT_PUBLIC_DB_PASSWORD;

	const client = await MongoClient.connect(
		`mongodb+srv://charis:${db_password}@cluster0.3rv7l.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0`
	);
	const db = client.db();

	const documents = await db
		.collection("collection_movies_list")
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

	const { movie, collection } =
		await request.json();

	console.log(movie, collection);

	if (!collection || !collection._id || !movie) {
		return NextResponse.json(
			{
				message:
					"Invalid movie data or collection",
			},
			{ status: 422 }
		);
	}

	const client = await MongoClient.connect(
		`mongodb+srv://charis:${db_password}@cluster0.3rv7l.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0`
	);
	const db = client.db();

	const newMovie = {
		title: movie.title,
		image: movie.poster_path,
		collection_id: collection._id,
		movieId: movie.movieId,
	};

	await db
		.collection("collection_movies_list")
		.insertOne(newMovie);
	client.close();

	return NextResponse.json(
		{
			message: "New Collection Added!",
			newMovie,
		},
		{ status: 201 }
	);
}

export async function DELETE(request: Request) {
	const db_password =
		process.env.NEXT_PUBLIC_DB_PASSWORD;

	const { movie } = await request.json();

	console.log(movie.id);

	if (!movie || !movie.id) {
		return NextResponse.json(
			{
				message:
					"Invalid movie data or collection",
			},
			{ status: 422 }
		);
	}

	const client = await MongoClient.connect(
		`mongodb+srv://charis:${db_password}@cluster0.3rv7l.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0`
	);
	const db = client.db();

	try {
		const result = await db
			.collection("collection_movies_list")
			.deleteOne({ _id: new ObjectId(movie.id) });
		client.close();

		if (result.deletedCount === 0) {
			return NextResponse.json(
				{
					message: "No document found to delete",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Movie successfully removed" },
			{ status: 200 }
		);
	} catch (error) {
		client.close();
		return NextResponse.json(
			{
				message: "An error occurred",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
