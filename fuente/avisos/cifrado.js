/* Cifrado de las suscripciones de avisos (ECIES con P-256, HKDF-SHA256 y AES-256-GCM).
   Se cifra con la llave pública de avisos (está en el repositorio) y solo se descifra con la
   llave privada, que vive como secreto de GitHub Actions (VAPID_PRIVATE_KEY). */
"use strict";
const crypto = require("crypto");
const INFO = Buffer.from("avisos-v1");

function hkdf(secret, salt) { return Buffer.from(crypto.hkdfSync("sha256", secret, salt, INFO, 32)); }

function cifrar(obj, publicKeyB64u) {
  const pub = Buffer.from(publicKeyB64u, "base64url");
  const eph = crypto.createECDH("prime256v1");
  eph.generateKeys();
  const epk = eph.getPublicKey();
  const key = hkdf(eph.computeSecret(pub), epk);
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(JSON.stringify(obj), "utf8"), c.final()]);
  return { epk: epk.toString("base64url"), iv: iv.toString("base64url"), ct: ct.toString("base64url"), tag: c.getAuthTag().toString("base64url") };
}

function descifrar(env, privateKeyB64u) {
  const ecdh = crypto.createECDH("prime256v1");
  ecdh.setPrivateKey(Buffer.from(privateKeyB64u, "base64url"));
  const epk = Buffer.from(env.epk, "base64url");
  const key = hkdf(ecdh.computeSecret(epk), epk);
  const d = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(env.iv, "base64url"));
  d.setAuthTag(Buffer.from(env.tag, "base64url"));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(env.ct, "base64url")), d.final()]).toString("utf8"));
}

module.exports = { cifrar, descifrar };
