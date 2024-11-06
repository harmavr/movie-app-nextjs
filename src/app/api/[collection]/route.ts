import { NextResponse } from "next/server";

export async function GET() {
	const dummy_data = [
		{ id: 1, name: "geia" },
		{ id: 2, name: "ela" },
	];

	return NextResponse.json(
		{
			message: "GET request successful!",
			data: dummy_data,
		},
		{ status: 200 }
	);
}

export async function POST(request: Request) {
	const { collection } = await request.json();

	if (
		!collection ||
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

	console.log(collection);
	return NextResponse.json(
		{
			message: "New Collection Added!",

			collection,
		},
		{ status: 201 }
	);
}
