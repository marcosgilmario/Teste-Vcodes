import CryptoJS from "crypto-js";

const decrypt = (data) => {
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(data));
};

export default decrypt;
