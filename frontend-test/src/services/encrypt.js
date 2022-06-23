import CryptoJS from "crypto-js";

const encrypt = (data) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
};

export default encrypt;
