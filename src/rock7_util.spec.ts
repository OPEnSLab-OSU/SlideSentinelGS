import { rock7ParsePost, rock7HexToString } from './rock7_util';

const MOCK_DATA =
  '{"momsn":193,"data":"48656c6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636b424c4f434b21","serial":15583,"iridium_latitude":7.3758,"iridium_cep":46.0,"JWT":"eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSb2NrIDciLCJpYXQiOjE1OTEyNzkxODAsImRhdGEiOiI0ODY1NmM2YzZmMjEyMDU0Njg2OTczMjA2OTczMjA2MTIwNzQ2NTczNzQyMDZkNjU3MzczNjE2NzY1MjA2NjcyNmY2ZDIwNTI2ZjYzNmI0MjRjNGY0MzRiMjEiLCJkZXZpY2VfdHlwZSI6IlJPQ0tCTE9DSyIsImltZWkiOiIzMDAyMzQwNjc2MjI4MzAiLCJpcmlkaXVtX2NlcCI6IjQ2LjAiLCJpcmlkaXVtX2xhdGl0dWRlIjoiNy4zNzU4IiwiaXJpZGl1bV9sb25naXR1ZGUiOiIxNjAuNjAyMyIsIm1vbXNuIjoiMTkzIiwic2VyaWFsIjoiMTU1ODMiLCJ0cmFuc21pdF90aW1lIjoiMjAtMDYtMDQgMTM6NTk6MzkifQ.NnwLu1HqcpDqER_K3NA2bGU_S7WZ9KflqTzpxHd4OrIpy5yirUR7LGELT7ZQC5T9Suyu34kZqv-e5DWpXRMebyxvEobhPEHlODH3nCO8Qy8w9_--UtF3uHjEqd6djzCau5aubt94Fl8WZ702H2QrRDcBiTA7oRVbG8y8FU7m4X4ei7RzfVLKDWYrDu_dym1OqUmk9QeePN4np_NQuXrbt8_UggUhZazas5znu8P-kLS7kGXjuV9MT8rLprlcSwh4b2oXyit6bnzjq0tT4cZtk9gzVPODUMBEIgFLynzO16gr2-r4sJd1ECvOytQlTNnv1TIwl2upN7eH1Lh3B0NXSw","imei":"300234067622830","device_type":"ROCKBLOCK","transmit_time":"20-06-04 13:59:39","iridium_longitude":160.6023}';

const MOCK_INVALID_DATA =
  '{"momsn":193,"data":"48656c6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636b424c4f434b21","serial":15583,"iridium_latitude":7.3758,"iridium_cep":46.0,"JWT":"eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSb2NrIDciLCJpYXQiOjE1OTEyNzkxODAsImRhdGEiOiI0ODY1NmM2YzZmMjEyMDU0Njg2OTczMjA2OTczMjA2MTIwNzQ2NTczNzQyMDZkNjU3MzczNjE2NzY1MjA2NjcyNmY2ZDIwNTI2ZjYzNmI0MjRjNGY0MzRiMjEiLCJkZXZpY2VfdHlwZSI6IlJPQ0tCTE9DSyIsImltZWkiOiIzMDAyMzQwNjc2MjI4MzAiLCJpcmlkaXVtX2NlcCI6IjQ2LjAiLCJpcmlkaXVtX2xhdGl0dWRlIjoiNy4zNzU4IiwiaXJpZGl1bV9sb25naXR1ZGUiOiIxNjAuNjAyMyIsIm1vbXNuIjoiMTkzIiwic2VyaWFsIjoiMTU1ODMiLCJ0cmFuc21pdF90aW1lIjoiMjAtMDYtMDQgMTM6NTk6MzkifQ.NnwLu1HqcpDqER_K3NA2bGU_S7WZ9KflqTzpxHd4OrIpy5yirUR7LGELT7ZQC5T9Suyu34kZqv-e5DWpXRMebyxvEobhPEHlODH3nCO8Qy8w9_--UtF3uHjEqd6djzCau5aubt94Fl8WZ702H2QrRDcBiTA7oRVbG8y8FU7m4X4ei7RzfVLKDWYrDu_dym1Oq","imei":"300234067622830","device_type":"ROCKBLOCK","transmit_time":"20-06-04 13:59:39","iridium_longitude":160.6023}';

const MOCK_RESULT = {
  data: 'Hello! This is a test message from RockBLOCK!',
  device_type: 'ROCKBLOCK',
  imei: '300234067622830',
  iridium_cep: 46.0,
  iridium_latitude: 7.3758,
  iridium_longitude: 160.6023,
  momsn: 193,
  serial: 15583,
  transmit_time: new Date('2020-06-04T13:59:39'),
};

describe('rock7_util', () => {
  describe('rock7ParsePost', () => {
    it('Test data string', () => {
      expect(rock7ParsePost(MOCK_DATA)).toEqual(MOCK_RESULT);
    });
    it('Fails with invalid signature', () => {
      expect(rock7ParsePost(MOCK_INVALID_DATA)).toBeFalsy();
    });
  });

  describe('rock7HexToString', () => {
    it('Parses message correctly', () => {
      expect(
        rock7HexToString(
          '48656C6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636B424c4f434b21'
        )
      ).toEqual('Hello! This is a test message from RockBLOCK!');
    });
    it('Handles an invalid hex string', () => {
      expect(
        rock7HexToString(
          '48656c6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636b424c4f434b2'
        )
      ).toBeFalsy();
    });
    it('Stops at a null terminator', () => {
      expect(
        rock7HexToString(
          '48006c6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636b424c4f434b21'
        )
      ).toEqual('H');
    });
  });
});
