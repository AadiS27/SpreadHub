import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Configure Google Sheets client
const getGoogleSheetsClient = async () => {
    try {
        const client = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth: client });
        return sheets;
    } catch (error) {
        console.error('Error creating Google Sheets client:', error);
        throw new Error('Failed to initialize Google Sheets client');
    }
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const spreadsheetId = searchParams.get('spreadsheetId');
        const range = searchParams.get('range') || 'Sheet1!A1:Z1000';

        if (!spreadsheetId) {
            return NextResponse.json({ error: 'Spreadsheet ID is required' }, { status: 400 });
        }

        const sheets = await getGoogleSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching sheet data:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { spreadsheetId, range, values } = body;

        if (!spreadsheetId || !range || !values) {
            return NextResponse.json({ 
                error: 'spreadsheetId, range, and values are required' 
            }, { status: 400 });
        }

        const sheets = await getGoogleSheetsClient();
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        return NextResponse.json({
            updatedCells: response.data.updatedCells,
            updatedRows: response.data.updatedRows,
            updatedColumns: response.data.updatedColumns,
        });
    } catch (error: any) {
        console.error('Error updating sheet data:', error);
        return NextResponse.json({ error: error.message || 'Failed to update data' }, { status: 500 });
    }
}