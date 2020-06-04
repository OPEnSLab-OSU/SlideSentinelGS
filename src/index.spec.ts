import './index';

const TEST_DATA = {
  contextPath: '',
  queryString: '',
  parameter: {},
  contentLength: 1104,
  parameters: {},
  postData: {
    contents:
      '{"momsn":193,"data":"48656c6c6f21205468697320697320612074657374206d6573736167652066726f6d20526f636b424c4f434b21","serial":15583,"iridium_latitude":7.3758,"iridium_cep":46.0,"JWT":"eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJSb2NrIDciLCJpYXQiOjE1OTEyNzkxODAsImRhdGEiOiI0ODY1NmM2YzZmMjEyMDU0Njg2OTczMjA2OTczMjA2MTIwNzQ2NTczNzQyMDZkNjU3MzczNjE2NzY1MjA2NjcyNmY2ZDIwNTI2ZjYzNmI0MjRjNGY0MzRiMjEiLCJkZXZpY2VfdHlwZSI6IlJPQ0tCTE9DSyIsImltZWkiOiIzMDAyMzQwNjc2MjI4MzAiLCJpcmlkaXVtX2NlcCI6IjQ2LjAiLCJpcmlkaXVtX2xhdGl0dWRlIjoiNy4zNzU4IiwiaXJpZGl1bV9sb25naXR1ZGUiOiIxNjAuNjAyMyIsIm1vbXNuIjoiMTkzIiwic2VyaWFsIjoiMTU1ODMiLCJ0cmFuc21pdF90aW1lIjoiMjAtMDYtMDQgMTM6NTk6MzkifQ.NnwLu1HqcpDqER_K3NA2bGU_S7WZ9KflqTzpxHd4OrIpy5yirUR7LGELT7ZQC5T9Suyu34kZqv-e5DWpXRMebyxvEobhPEHlODH3nCO8Qy8w9_--UtF3uHjEqd6djzCau5aubt94Fl8WZ702H2QrRDcBiTA7oRVbG8y8FU7m4X4ei7RzfVLKDWYrDu_dym1OqUmk9QeePN4np_NQuXrbt8_UggUhZazas5znu8P-kLS7kGXjuV9MT8rLprlcSwh4b2oXyit6bnzjq0tT4cZtk9gzVPODUMBEIgFLynzO16gr2-r4sJd1ECvOytQlTNnv1TIwl2upN7eH1Lh3B0NXSw","imei":"300234067622830","device_type":"ROCKBLOCK","transmit_time":"20-06-04 13:59:39","iridium_longitude":160.6023}',
    length: 1104,
    name: 'postData',
    type: 'application/json',
  },
};

describe('index', () => {
  describe('doPost', () => {
    it('test rock7 query', () => {
      expect((global as any).doPost(TEST_DATA)).toBeUndefined();
    });
  });
});
