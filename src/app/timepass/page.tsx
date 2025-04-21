'use client';

import { useState } from 'react';
import { getSheetData, updateSheetData, appendSheetData, deleteSheetData } from '@/lib/sheetApi';

export default function SheetExample() {
  const [data, setData] = useState<any>(null);

  const spreadsheetId = '1m51vgvytQSlbCygNjIT-YO5fuu5vY9EUmCT0XrmkpOY'; // <-- Put your actual spreadsheet ID here
  const range = 'Sheet1!A1';

  const fetchData = async () => {
    const result = await getSheetData(spreadsheetId, range);
    setData(result);
  };

  const handleUpdate = async () => {
    const result = await updateSheetData(spreadsheetId, 'Sheet1!A2', [['Updated Value']]);
    console.log(result);
  };

  const handleAppend = async () => {
    const result = await appendSheetData(spreadsheetId, 'Sheet1!A:C', [['New', 'Row', 'Here']]);
    console.log(result);
  };

  const handleDelete = async () => {
    const result = await deleteSheetData(spreadsheetId, 'Sheet1!A2:C2');
    console.log(result);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Google Sheets Integration</h1>

      <div className="space-x-4 mb-6">
        <button onClick={fetchData} className="bg-blue-500 px-4 py-2 rounded text-white">Fetch Data</button>
        <button onClick={handleUpdate} className="bg-yellow-500 px-4 py-2 rounded text-white">Update Data</button>
        <button onClick={handleAppend} className="bg-green-500 px-4 py-2 rounded text-white">Append Data</button>
        <button onClick={handleDelete} className="bg-red-500 px-4 py-2 rounded text-white">Delete Data</button>
      </div>

      {data && (
        <pre className="bg-gray-800 text-white p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
