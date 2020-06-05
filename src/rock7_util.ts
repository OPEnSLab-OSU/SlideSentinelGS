import * as JWT from 'jsonwebtoken';

const ROCK7_PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlaWAVJfNWC4XfnRx96p9cztBcdQV6l8aKmzAlZdpEcQR6MSPzlgvihaUHNJgKm8t5ShR3jcDXIOI7er30cIN4/9aVFMe0LWZClUGgCSLc3rrMD4FzgOJ4ibD8scVyER/sirRzf5/dswJedEiMte1ElMQy2M6IWBACry9u12kIqG0HrhaQOzc6Tr8pHUWTKft3xwGpxCkV+K1N+9HCKFccbwb8okRP6FFAMm5sBbw4yAu39IVvcSL43Tucaa79FzOmfGs5mMvQfvO1ua7cOLKfAwkhxEjirC0/RYX7Wio5yL6jmykAHJqFG2HT0uyjjrQWMtoGgwv9cIcI7xbsDX6owIDAQAB
-----END PUBLIC KEY-----`;

const HEX_STR_VERIFY = /^(?:[0-9a-f]{2})+$/i;

/// @see https://docs.rock7.com/reference#push-api
interface Rock7PayloadRaw {
  /// JWT Issuer
  iss: string;
  /// JWT Issue time
  iat: number;
  /// Message Transport Method
  transport?: 'IRIDIUM' | 'GPRS' | 'OTHER';
  /// IMEI of Iridium device (only present for ROCKBLOCK device types)
  imei: string;
  /// Type of device
  device_type: 'LEOPARD' | 'ROCKBLOCK' | 'TIGERSHARK' | 'GRIFFIN';
  /// The serial number of the device.
  serial: string;
  /// The MOMSN of the SBD transmission. The MOMSN is a counter stored in the Iridium device, incremented upon transmission.
  momsn: string;
  /// Timestamp that the message was transmitted.
  transmit_time: string;
  /// The approximate longitude of the device, derived by the Iridium satellites.
  iridium_longitude: string;
  /// The approximate latitude of the device, derived by the Iridium satellites.
  iridium_latitude: string;
  /// The accuracy, in km, of the Iridium derived position.
  iridium_cep: string;
  /// Message payload, as a hex encoded string
  data: string;
}

export interface Rock7Payload {
  [key: string]: string | number | Date | boolean;
  /// Unique ID for this report
  id?: string;
  /// Message Transport Method
  transport?: 'IRIDIUM' | 'GPRS' | 'OTHER';
  /// IMEI of Iridium device (only present for ROCKBLOCK device types)
  imei: string;
  /// Type of device
  device_type: 'LEOPARD' | 'ROCKBLOCK' | 'TIGERSHARK' | 'GRIFFIN';
  /// The serial number of the device.
  serial: number;
  /// The MOMSN of the SBD transmission. The MOMSN is a counter stored in the Iridium device, incremented upon transmission.
  momsn: number;
  /// Timestamp that the message was transmitted.
  transmit_time: Date;
  /// The approximate longitude of the device, derived by the Iridium satellites.
  iridium_longitude: number;
  /// The approximate latitude of the device, derived by the Iridium satellites.
  iridium_latitude: number;
  /// The accuracy, in km, of the Iridium derived position.
  iridium_cep: number;
  /// Message payload, as a hex encoded string
  data: string | false;
}

function rock7ConvertPost(payload: Rock7PayloadRaw): Rock7Payload {
  // remove extra keys from payload
  const ALLOWED_KEYS = [
    'id',
    'transport',
    'imei',
    'device_type',
    'serial',
    'momsn',
    'transmit_time',
    'iridium_longitude',
    'iridium_latitude',
    'iridium_cep',
    'data',
  ];
  const filtered_payload = {};
  // change the types of some special properties, and remove extra keys
  Object.keys(payload)
    .filter((k) => ALLOWED_KEYS.includes(k))
    .map((k) => {
      // Date
      if (k === 'transmit_time')
        filtered_payload[k] = new Date(payload[k] ? '20' + payload[k].replace(' ', 'T') : NaN);
      // Hex to string
      else if (k === 'data') filtered_payload[k] = rock7HexToString(payload[k]);
      // Int
      else if (k === 'serial' || k === 'momsn') filtered_payload[k] = parseInt(payload[k]);
      // Float
      else if (['iridium_longitude', 'iridium_latitude', 'iridium_cep'].includes(k))
        filtered_payload[k] = parseFloat(payload[k]);
      // string
      else filtered_payload[k] = payload[k];
    });
  return filtered_payload as Rock7Payload;
}

export function rock7ParsePost(payload_str: string): Rock7Payload | false {
  // Serialize the JSON payload
  const payload: { JWT?: string } = JSON.parse(payload_str);
  // grab and verify the JWT in the payload, allowing us to verify the integrity of the message
  if (!payload || !payload.JWT) {
    console.error(`JWT not found in payload string "${payload_str}"`);
    return false;
  }
  // use JWT to decode and verify the message
  let decoded: Rock7PayloadRaw;
  try {
    const result = JWT.verify(payload.JWT, ROCK7_PUB_KEY, { algorithms: ['RS256'] });
    if (typeof result === 'string') decoded = JSON.parse(result);
    else decoded = result as Rock7PayloadRaw;
  } catch (e) {
    console.error('Exception during JWT verification: ');
    console.error(e);
    return false;
  }
  // parse the decoded payload into better types, and return it
  return rock7ConvertPost(decoded);
}

export function rock7HexToString(hex_str: string): string | false {
  if (!HEX_STR_VERIFY.test(hex_str)) {
    console.error(`Invalid hex string "${hex_str}"`);
    return false;
  }

  const out = [];
  for (let i = 0; i < hex_str.length && hex_str.substr(i, 2) !== '00'; i += 2)
    out.push(String.fromCharCode(parseInt(hex_str.substr(i, 2), 16)));
  return out.join('');
}
