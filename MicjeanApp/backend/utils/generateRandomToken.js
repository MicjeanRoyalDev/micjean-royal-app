import Crypto from "crypto";

const generateRandomToken = () => {
  Crypto.randomUUID();
};
