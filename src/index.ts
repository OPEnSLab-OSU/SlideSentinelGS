import * as JWT from 'jsonwebtoken';
import { Rock7Payload } from './rock7types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

const ROCK7_PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlaWAVJfNWC4XfnRx96p9cztBcdQV6l8aKmzAlZdpEcQR6MSPzlgvihaUHNJgKm8t5ShR3jcDXIOI7er30cIN4/9aVFMe0LWZClUGgCSLc3rrMD4FzgOJ4ibD8scVyER/sirRzf5/dswJedEiMte1ElMQy2M6IWBACry9u12kIqG0HrhaQOzc6Tr8pHUWTKft3xwGpxCkV+K1N+9HCKFccbwb8okRP6FFAMm5sBbw4yAu39IVvcSL43Tucaa79FzOmfGs5mMvQfvO1ua7cOLKfAwkhxEjirC0/RYX7Wio5yL6jmykAHJqFG2HT0uyjjrQWMtoGgwv9cIcI7xbsDX6owIDAQAB
-----END PUBLIC KEY-----`;

// Handler for POST requests from Rock7
// Format will be a JSON payload with a JWT, which we will parse and verify
global.doPost = (e: GoogleAppsScript.Events.DoPost) => {
  // verify the payload exists and is a POST request with JSON
  if (!e || !e.postData || e.postData.type !== 'application/json' || !e.postData.contents)
    throw new Error(`Invalid POST request: ${JSON.stringify(e)}`);
  // Serialize the JSON payload
  const payload: { JWT?: string } = JSON.parse(e.postData.contents);
  // grab and verify the JWT in the payload, allowing us to verify the integrity of the message
  if (!payload || !payload.JWT) throw new Error(`Invalid JSON payload: ${payload}`);
  // parse the JWT!
  const result = JWT.verify(payload.JWT, ROCK7_PUB_KEY, { algorithms: ['RS256'] });
  let parsed_result: Rock7Payload;
  if (typeof result === 'string') parsed_result = JSON.parse(result);
  else parsed_result = result as Rock7Payload;
  // print all that jazz out for now
  console.log(JSON.stringify(parsed_result));
};
