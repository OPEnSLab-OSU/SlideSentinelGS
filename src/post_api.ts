import { rock7ParsePost } from './rock7_util';
import { gSheetAddDataRow } from './gsheet_util';

const SHEET_ID = '1uDCH-SRaXbLxvxMi0C1kJsP-mW29VR-RtniYjH1Ty0Q';
const HEADERS = [
  'transmit_time',
  'iridium_longitude',
  'iridium_latitude',
  'iridium_cep',
  'momsn',
  'data',
  'raw',
];

// Handler for POST requests from Rock7
// Format will be a JSON payload with a JWT, which we will parse and verify
export function doPost(e: GoogleAppsScript.Events.DoPost): void {
  // verify the payload exists and is a POST request with JSON
  if (!e || !e.postData || e.postData.type !== 'application/json' || !e.postData.contents)
    throw new Error(`Invalid POST request: ${JSON.stringify(e)}`);
  // Serialize the JSON payload and parse/verify the JWT
  const res = rock7ParsePost(e.postData.contents);
  if (!res) throw new Error(`Invalid Rockblock payload: "${e.postData.contents}"`);
  // now that we have the payload and iridium data, we can insert it into the spreadsheet
  // TODO: parse payload data some more
  // in the meantime, test editing spreadsheet
  gSheetAddDataRow(SHEET_ID, HEADERS, Object.assign({ raw: e.postData.contents }, res));
}
