export function gSheetAddDataRow(
  sheet_id: string,
  headers: Array<string>,
  data: { [key: string]: number | string | boolean | Date },
  sort_keys: Array<string> = ['transmit_time']
): void {
  // get the spreadsheet
  const sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();
  // read the first row, if empty add headers
  if (!sheet.getRange(1, 1).getValue())
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  // get the last row without data
  const data_row = sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length);
  // fill it with the data from the data object
  data_row.setValues([headers.map((h) => data[h])]);
  // sort the values
  sheet.getRange(2, 1, data_row.getLastRow() - 1, headers.length).sort(
    sort_keys.map((s) => {
      return { column: headers.indexOf(s) + 1, ascending: true };
    })
  );
  // done!
}
