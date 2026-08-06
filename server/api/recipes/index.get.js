import clientPromise from '~/server/utils/mongodb';

// GET /api/recipes - Fetch all recipes
export default defineEventHandler(async (event) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const recipes = await db
      .collection('recipes')
      .find({})
      .limit(50)
      .toArray();

    return {
      success: true,
      data: recipes,
    };
  } catch (error) {
    // createError sets the HTTP status code and status message automatically
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});