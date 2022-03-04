export const ErrorCode = {
  NoNetwork: -1,
  Unknow: -999,
};

export interface ErrorModel {
  errorCode: number | string;
  data?: any;
}
