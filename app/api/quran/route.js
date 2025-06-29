import axios from 'axios';
import { NextResponse } from 'next/server';

// IMPORTANT: Replace these with your actual LIVE environment credentials.
// These should ideally be stored in environment variables (e.g., .env.local).
const clientId = 'df8479b5-5daa-4e4a-b180-06e07ed0e8cf'; // <-- UPDATE THIS WITH YOUR LIVE CLIENT ID
const clientSecret = 'Y_3-hU0Qp0pBh8ru_ZvOP8ob_c'; // <-- UPDATE THIS WITH YOUR LIVE CLIENT SECRET

// Basic auth header for token request
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const verseKey = searchParams.get('verseKey');
    const resourceId = searchParams.get('resourceId');

    console.log(`Received request for verseKey: ${verseKey}, resourceId: ${resourceId}`);

    if (!verseKey || !resourceId) {
      return NextResponse.json(
        { error: 'Missing verseKey or resourceId parameter. Please provide both (e.g., /api/quran?verseKey=1:2&resourceId=20)' },
        { status: 400 }
      );
    }

    // Step 1: Get access token (JWT) from the LIVE OAuth endpoint
    console.log('Attempting to get access token from LIVE OAuth endpoint...');
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://oauth2.quran.foundation/oauth2/token', // LIVE OAuth URL
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials&scope=content',
      maxBodyLength: Infinity,
    });

    const accessToken = tokenResponse.data.access_token;
    console.log('Access Token acquired:', accessToken ? 'YES' : 'NO', tokenResponse.data); // Log token data

    if (!accessToken) {
        throw new Error('Failed to acquire access token.');
    }

    // Step 2: Fetch the specific verse by key and resource ID from the LIVE Content API
    const verseApiUrl = `https://apis.quran.foundation/content/api/v4/translations/${resourceId}/by_ayah/${verseKey}`; // LIVE Content API URL
    console.log('Attempting to fetch verse from LIVE API URL:', verseApiUrl);

    const verseResponse = await axios({
      method: 'get',
      url: verseApiUrl,
      headers: {
        'Accept': 'application/json',
        'x-auth-token': accessToken, // Use the JWT access token here
        'x-client-id': clientId,     // Keep x-client-id, as it might still be required
      },
      maxBodyLength: Infinity,
    });

    console.log('Successfully fetched verse data.');
    return NextResponse.json(verseResponse.data);

  } catch (error) {
    console.error('Error fetching verse in API route:', error.response?.data || error.message);
    // Provide more context if possible
    const errorMessage = error.response?.data?.message || error.message;
    const errorDetails = error.response?.data || error.message;

    return NextResponse.json(
      {
        error: 'Failed to fetch verse from external API',
        details: errorDetails,
        internalMessage: errorMessage,
        statusCode: error.response?.status || 500
      },
      { status: error.response?.status || 500 }
    );
  }
}

