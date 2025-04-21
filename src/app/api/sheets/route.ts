import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';

type Response = {
  title?: string;
  spreadsheetId?: string;
}

// Configure Google Sheets client
const getSheetsClient = async () => {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing required Google API credentials in environment variables');
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  return google.sheets({ version: 'v4', auth });
};

// Create a new spreadsheet
const createSpreadsheet = async (title: string) => {
  const service = await getSheetsClient();
  const resource = {
    properties: {
      title,
    },
  };

  try {
    const spreadsheet = await service.spreadsheets.create({
      requestBody: resource,
      fields: 'spreadsheetId,properties.title',
    });
    return spreadsheet.data;
  } catch (error: any) {
    throw new Error(`Failed to create spreadsheet: ${error.message}`);
  }
};

// Get spreadsheet details
const getSpreadsheet = async (spreadsheetId: string) => {
  const service = await getSheetsClient();
  try {
    const response = await service.spreadsheets.get({
      spreadsheetId,
      fields: 'spreadsheetId,properties.title,sheets.properties',
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to get spreadsheet: ${error.message}`);
  }
};

// Update spreadsheet properties
const updateSpreadsheet = async (spreadsheetId: string, title: string) => {
  const service = await getSheetsClient();
  const resource = {
    properties: {
      title,
    },
  };

  try {
    const response = await service.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          updateSpreadsheetProperties: {
            properties: { title },
            fields: 'title',
          },
        }],
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to update spreadsheet: ${error.message}`);
  }
};

// Delete spreadsheet
const deleteSpreadsheet = async (spreadsheetId: string) => {
  const drive = google.drive({
    version: 'v3',
    auth: new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    }),
  });

  try {
    await drive.files.delete({
      fileId: spreadsheetId,
    });
    return { message: `Spreadsheet ${spreadsheetId} deleted successfully` };
  } catch (error: any) {
    throw new Error(`Failed to delete spreadsheet: ${error.message}`);
  }
};

// GET: Retrieve spreadsheet details
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spreadsheetId = searchParams.get('spreadsheetId');

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID is required' }, { status: 400 });
    }

    const spreadsheet = await getSpreadsheet(spreadsheetId);
    return NextResponse.json(spreadsheet, { status: 200 });
  } catch (error: any) {
    console.error('Error retrieving spreadsheet:', error);
    return NextResponse.json({ error: error.message || 'Failed to retrieve spreadsheet' }, { status: 500 });
  }
}

// POST: Create a new spreadsheet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body as Response;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const spreadsheet = await createSpreadsheet(title);
    return NextResponse.json(spreadsheet, { status: 201 });
  } catch (error: any) {
    console.error('Error creating spreadsheet:', error);
    return NextResponse.json({ error: error.message || 'Failed to create spreadsheet' }, { status: 500 });
  }
}

// PATCH: Update spreadsheet properties
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { spreadsheetId, title } = body as Response;

    if (!spreadsheetId || !title) {
      return NextResponse.json({ error: 'Spreadsheet ID and title are required' }, { status: 400 });
    }

    const updatedSpreadsheet = await updateSpreadsheet(spreadsheetId, title);
    return NextResponse.json(updatedSpreadsheet, { status: 200 });
  } catch (error: any) {
    console.error('Error updating spreadsheet:', error);
    return NextResponse.json({ error: error.message || 'Failed to update spreadsheet' }, { status: 500 });
  }
}

// DELETE: Delete a spreadsheet
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spreadsheetId = searchParams.get('spreadsheetId');

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID is required' }, { status: 400 });
    }

    const result = await deleteSpreadsheet(spreadsheetId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting spreadsheet:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete spreadsheet' }, { status: 500 });
  }
}