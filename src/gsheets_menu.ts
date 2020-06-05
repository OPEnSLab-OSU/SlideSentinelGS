/** Bind doPayloadGenerate to a menu on the spreadsheet */
export function onOpen(): void {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('SS Utilities')
    .addItem('Send Payload Generator', 'doPayloadGenerate')
    .addToUi();
}

/** Serve generate_payload.html in a sidebar as a utility */
export function doPayloadGenerate(): void {
  const HTML = HtmlService.createHtmlOutputFromFile('generate_payload')
    .setTitle('Send Payload Generator')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(HTML);
}
