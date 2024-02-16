import { connectToDB } from "@utils/database";
import Quote from "@models/quote";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const quote = await Quote.findById(params.id).populate("creator")
        if (!quote) return new Response("Quote Not Found", { status: 404 })

        return new Response(JSON.stringify(quote), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { quote, tag } = await request.json();

    try {
        await connectToDB();

        const existingQuote = await Quote.findById(params.id);
        if (!existingQuote) {
            return new Response("Quote not found", { status: 404 });
        }

        // Update the quote with new data
        existingQuote.quote = quote;
        existingQuote.tag = tag;

        await existingQuote.save();
        return new Response("Successfully updated the Quote", { status: 200 });

    } catch (error) {
        return new Response("Error Updating Quote", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the quote by ID and remove it
        await Quote.findByIdAndDelete(params.id);

        return new Response("Quote is deleted Successfully", { status: 200 });
    } catch (error) {
        return new Response("Error Deleting Quote", { status: 500 })
    }
}