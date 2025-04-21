// lib/sheetsApi.ts
export const getSheetData = async (spreadsheetId: string, range: string) => {
    const res = await fetch(`/api/sheets?spreadsheetId=${spreadsheetId}&range=${range}`);
    const data = await res.json();
    return data;
  };
  
  export const updateSheetData = async (spreadsheetId: string, range: string, values: any[][]) => {
    const res = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spreadsheetId, range, values }),
    });
    const data = await res.json();
    return data;
  };
  
  export const appendSheetData = async (spreadsheetId: string, range: string, values: any[][]) => {
    const res = await fetch('/api/sheets', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spreadsheetId, range, values }),
    });
    const data = await res.json();
    return data;
  };
  
  export const deleteSheetData = async (spreadsheetId: string, range: string) => {
    const res = await fetch(`/api/sheets?spreadsheetId=${spreadsheetId}&range=${range}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    return data;
  };
  