/// @see https://docs.rock7.com/reference#push-api
export interface Rock7Payload {
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
  transmit_time: string;
  /// The approximate longitude of the device, derived by the Iridium satellites.
  iridium_longitude: number;
  /// The approximate latitude of the device, derived by the Iridium satellites.
  iridium_latitude: number;
  /// The accuracy, in km, of the Iridium derived position.
  iridium_cep: number;
  /// Message payload, as a hex encoded string
  data: string;
}
