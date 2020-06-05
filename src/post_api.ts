import { rock7ParsePost } from './rock7_util';
import { gSheetAddDataRow } from './gsheet_util';

/** ID of the spreadsheet we would like to modify on POST */
const SHEET_ID = '1uDCH-SRaXbLxvxMi0C1kJsP-mW29VR-RtniYjH1Ty0Q';
/** The name and order to put the headers of the spreadsheet in */
const HEADERS = [
  'transmit_time',
  'iridium_longitude',
  'iridium_latitude',
  'iridium_cep',
  'momsn',
  'data',
  'raw',
];

/**
 * POST handler for the Rock7 Push API: https://docs.rock7.com/reference#push-api
 * This handler verifies the payload using JWT, parses it, and inserts the result
 * into the google sheet specified by SHEET_ID. If any of these operations fail,
 * this function will throw an error, causing GS to return a status code of 500
 * and forcing Iridium to re-queue the message.
 * @param e GS POST payload
 */
export function doPost(e: GoogleAppsScript.Events.DoPost): void {
  // verify the payload exists and is a POST request with JSON
  if (
    !e ||
    !e.postData ||
    e.postData.type !== 'application/json' ||
    !e.postData.contents
  )
    throw new Error(`Invalid POST request: ${JSON.stringify(e)}`);
  // Serialize the JSON payload and parse/verify the JWT
  const res = rock7ParsePost(e.postData.contents);
  if (!res)
    throw new Error(`Invalid Rockblock payload: "${e.postData.contents}"`);
  // now that we have the payload and iridium data, we can insert it into the spreadsheet
  // TODO: parse payload data some more
  // in the meantime, test editing spreadsheet
  gSheetAddDataRow(
    SHEET_ID,
    HEADERS,
    Object.assign({ raw: e.postData.contents }, res)
  );
}
