import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

type CellRequest = {
  spreadsheetId: string;
  sheetName: string;
  range: string; // e.g., "A1" or "A1:B2"
  value?: (string | number | boolean) | (string | number | boolean)[][]; // Single value or 2D array
  formula?: string | string[][]; // Single formula or 2D array
};

// Utility to parse range dimensions (e.g., "A1:B2" -> { rows: 2, cols: 2 })
const parseRangeDimensions = (range: string): { rows: number; cols: number } => {
  const match = range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  if (!match) {
    return { rows: 1, cols: 1 }; // Assume single cell if range format is invalid
  }
  const [, startCol, startRow, endCol, endRow] = match;
  const cols = endCol.charCodeAt(0) - startCol.charCodeAt(0) + 1;
  const rows = parseInt(endRow) - parseInt(startRow) + 1;
  return { rows, cols };
};

// Convert single value/formula to 2D array if needed
const normalizeValues = (
  input: (string | number | boolean) | (string | number | boolean)[][] | string | string[][] | undefined
): (string | number | boolean)[][] => {
  if (input === undefined) return [[]];
  if (Array.isArray(input)) {
    // If input is already a 2D array, return it
    if (Array.isArray(input[0])) return input as (string | number | boolean)[][];
    // If input is a 1D array, wrap it as a single row
    return [(input as unknown) as (string | number | boolean)[]]
  }
  // If input is a single value, wrap it as a single cell
  return [[input as string | number | boolean]];
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
    const values = normalizeValues(formula ? formula : value);
    const valueInputOption = formula ? 'USER_ENTERED' : 'RAW';
    console.log('values', values, 'valueInputOption', valueInputOption);

    // Validate dimensions
    const { rows, cols } = parseRangeDimensions(range);
    if (values.length > rows || (values[0] && values[0].length > cols)) {
      throw new Error('Provided values exceed the specified range dimensions');
    }

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
    const values = normalizeValues(formula ? formula : value);
    const valueInputOption = formula ? 'USER_ENTERED' : 'RAW';

    // Validate dimensions
    const { rows, cols } = parseRangeDimensions(range);
    if (values.length > rows || (values[0] && values[0].length > cols)) {
      throw new Error('Provided values exceed the specified range dimensions');
    }

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

// Clear cell data
const clearCellData = async ({ spreadsheetId, sheetName, range }: CellRequest) => {
  const service = await getSheetsClient();
  const fullRange = `${sheetName}!${range}`;

  try {
    const response = await service.spreadsheets.values.clear({
      spreadsheetId,
      range: fullRange,
    });

    return {
      clearedRange: response.data.clearedRange,
      message: `Data cleared from range ${fullRange}`,
    };
  } catch (error: any) {
    throw new Error(`Failed to clear cell data: ${error.message}`);
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

// DELETE: Clear cell data
export async function DELETE(req: NextRequest) {
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

    const result = await clearCellData({ spreadsheetId, sheetName, range });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error clearing cell data:', error);
    return NextResponse.json({ error: error.message || 'Failed to clear cell data' }, { status: 500 });
  }
}