import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

type CellRequest = {
  spreadsheetId: string;
  sheetName: string;
  range: string; // e.g., "A1" or "A1:B2"
  value?: string | number | boolean; // For regular values
  formula?: string; // For formulas
};

// Configure Google Sheets client
const getSheetsClient = async () => {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing required Google API credentials in environment variables');
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

// Add cell value or formula
const addCellData = async ({ spreadsheetId, sheetName, range, value, formula }: CellRequest) => {
  const service = await getSheetsClient();
  const fullRange = `${sheetName}!${range}`;

  try {
    const values = [[formula ? formula : value]];
    const valueInputOption = formula ? 'USER_ENTERED' : 'RAW';
    console.log('values', values, 'valueInputOption', valueInputOption);

    const response = await service.spreadsheets.values.update({
      spreadsheetId,
      range: fullRange,
      valueInputOption,
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to add cell data: ${error.message}`);
  }
};

// Update cell value or formula
const updateCellData = async ({ spreadsheetId, sheetName, range, value, formula }: CellRequest) => {
  const service = await getSheetsClient();
  const fullRange = `${sheetName}!${range}`;

  try {
    const values = [[formula ? formula : value]];
    const valueInputOption = formula ? 'USER_ENTERED' : 'RAW';

    const response = await service.spreadsheets.values.update({
      spreadsheetId,
      range: fullRange,
      valueInputOption,
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to update cell data: ${error.message}`);
  }
};

// Retrieve cell data
const getCellData = async ({ spreadsheetId, sheetName, range }: CellRequest) => {
  const service = await getSheetsClient();
  const fullRange = `${sheetName}!${range}`;

  try {
    const response = await service.spreadsheets.values.get({
      spreadsheetId,
      range: fullRange,
    });

    return {
      range: response.data.range,
      values: response.data.values || [],
    };
  } catch (error: any) {
    throw new Error(`Failed to retrieve cell data: ${error.message}`);
  }
};

// POST: Add cell value or formula
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { spreadsheetId, sheetName, range, value, formula } = body as CellRequest;

    if (!spreadsheetId || !sheetName || !range || (value === undefined && !formula)) {
      return NextResponse.json(
        { error: 'spreadsheetId, sheetName, range, and either value or formula are required' },
        { status: 400 }
      );
    }

    const result = await addCellData({ spreadsheetId, sheetName, range, value, formula });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error adding cell data:', error);
    return NextResponse.json({ error: error.message || 'Failed to add cell data' }, { status: 500 });
  }
}

// PATCH: Update cell value or formula
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { spreadsheetId, sheetName, range, value, formula } = body as CellRequest;

    if (!spreadsheetId || !sheetName || !range || (value === undefined && !formula)) {
      return NextResponse.json(
        { error: 'spreadsheetId, sheetName, range, and either value or formula are required' },
        { status: 400 }
      );
    }

    const result = await updateCellData({ spreadsheetId, sheetName, range, value, formula });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error updating cell data:', error);
    return NextResponse.json({ error: error.message || 'Failed to update cell data' }, { status: 500 });
  }
}

// GET: Retrieve cell data
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spreadsheetId = searchParams.get('spreadsheetId');
    const sheetName = searchParams.get('sheetName');
    const range = searchParams.get('range');

    if (!spreadsheetId || !sheetName || !range) {
      return NextResponse.json(
        { error: 'spreadsheetId, sheetName, and range are required' },
        { status: 400 }
      );
    }

    const result = await getCellData({ spreadsheetId, sheetName, range });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error retrieving cell data:', error);
    return NextResponse.json({ error: error.message || 'Failed to retrieve cell data' }, { status: 500 });
  }
}