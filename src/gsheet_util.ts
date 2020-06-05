/**
 * Edit a spreadsheet to add a row of data, then sort
 * the sheet to order the table.
 *
 * This function will detect if the sheet is empty,
 * and add column headers if so. Once that is complete,
 * this function will write data[h] for h in headers to
 * the firs available row, and then ascending sort all t
 * he rows by the columns specified in sort_keys in order
 * from first to last. You will need to ensure your GS
 * is authorized to modify spreadsheets (https://www.googleapis.com/auth/spreadsheets)
 * before using this function.
 * @param sheet_id The ID of the sheet to modify (see https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openbyidid)
 * @param headers An array of strings signifying both the object keys and the labels of data columns.
 * The order of these will be the order that columns are placed into the sheet.
 * @param data An object containing data to be placed in the spreadsheet.
 * This object is used as a dictionary, with headers representing the keys
 * this function should insert the values of.
 * @param sort_keys The header values to sort the rows
 * of the spreadsheet by. Rows are sorted starting with
 * index zero, then subsorted by index one, and so on.
 * Rows will always be sorted in ascending order.
 */
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
}
