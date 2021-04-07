interface error {
  isError: boolean;
  errMsg: string;
  clientMsg: string;
}

export default class {
  static ctrl(msg: string, err: string): error {
    return {
      isError: true,
      errMsg: err,
      clientMsg: msg,
    };
  }
}
