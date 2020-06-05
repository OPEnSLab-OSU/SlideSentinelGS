// Bind a rockblock payload generation tool to the spreadsheet menu
export function onOpen(): void {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('SS Utilities').addItem('Send Payload Generator', 'doPayloadGenerate').addToUi();
}

export function doPayloadGenerate(): void {
  const HTML = HtmlService.createHtmlOutputFromFile('generate_payload')
    .setTitle('Send Payload Generator')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(HTML);
}
