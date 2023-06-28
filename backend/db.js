const Redis = require("ioredis");
const aes256 = require("aes256");
const { v4 } = require("uuid");

const addSecret = async (secret) => {
  const client = new Redis(
    "redis://default:9fbfdd53e85647f1beb72f46f66e3df1@touching-anchovy-40182.upstash.io:40182"
  );
  const key = v4();
  const encryptedSecret = aes256.encrypt(key, secret);
  const id = key.split("-")[0];

  await client.set(id, encryptedSecret);

  return {
    id: id,
    key: key,
  };
};
const getSecret = async (id, key) => {
  const client = new Redis(
    "redis://default:9fbfdd53e85647f1beb72f46f66e3df1@touching-anchovy-40182.upstash.io:40182"
  );

  const encrySecret = await client.get(id);
  console.log("Response from DB",encrySecret)
  if(!encrySecret)
  throw new Error("Empty response from DB");
  const decrySecret = aes256.decrypt(key, encrySecret);
  return {
    id: id,
    secret: decrySecret,
  };
};

module.exports = { addSecret, getSecret };
