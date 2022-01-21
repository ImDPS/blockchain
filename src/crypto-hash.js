// const crypto = require("crypto");
import crypto from "crypto";
import hexToBinary from "hex-to-binary";

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  hash.update(inputs.join(" "));

  // return hash.digest("hex");
  return hexToBinary(hash.digest("hex"));
};

export default cryptoHash;
