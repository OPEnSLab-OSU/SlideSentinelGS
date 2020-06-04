import { rock7ParsePost, rock7HexToString } from './rock7_util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

// Handler for POST requests from Rock7
// Format will be a JSON payload with a JWT, which we will parse and verify
global.doPost = (e: GoogleAppsScript.Events.DoPost) => {
  // verify the payload exists and is a POST request with JSON
  if (!e || !e.postData || e.postData.type !== 'application/json' || !e.postData.contents)
    throw new Error(`Invalid POST request: ${JSON.stringify(e)}`);
  // Serialize the JSON payload and parse/verify the JWT
  const res = rock7ParsePost(e.postData.contents);
  if (!res) throw new Error(`Invalid Rockblock payload: "${e.postData.contents}"`);
  // parse the rock7 hex payload, if any
  const payload = rock7HexToString(res.data);
  if (!payload) console.warn(`Found invalid payload ${res.data}`);
  // now that we have the payload and iridium data, we can insert it into the spreadsheet
  // TODO: parse payload data some more
};
