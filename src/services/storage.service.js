const { randomUUID } = require('node:crypto');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const config = require('../config/config');

let client;

function getClient() {
  if (!config.S3_BUCKET) {
    throw new Error('S3_BUCKET no está configurado');
  }

  if (!client) {
    client = new S3Client({
      region: config.S3_REGION,
      endpoint: config.S3_ENDPOINT,
      forcePathStyle: config.S3_FORCE_PATH_STYLE,
      requestChecksumCalculation: 'WHEN_REQUIRED',
      credentials: config.S3_ACCESS_KEY_ID && config.S3_SECRET_ACCESS_KEY
        ? {
          accessKeyId: config.S3_ACCESS_KEY_ID,
          secretAccessKey: config.S3_SECRET_ACCESS_KEY,
        }
        : undefined,
    });
  }

  return client;
}

function safeFilename(filename) {
  return String(filename || 'file')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .slice(0, 120);
}

async function createUploadUrl({ filename, contentType, folder = 'uploads' }) {
  const originalFilename = String(filename || '').trim();
  if (!originalFilename.toLowerCase().endsWith('.json')) {
    throw new Error('Solo se permiten archivos .json');
  }

  if (contentType !== 'application/json') {
    throw new Error('contentType debe ser application/json');
  }

  const safeFolder = String(folder)
    .replace(/[^a-zA-Z0-9/_-]/g, '')
    .replace(/^\/+|\/+$/g, '') || 'uploads';
  const key = `${safeFolder}/${randomUUID()}-${safeFilename(filename)}`;
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const expiresIn = 900;
  const uploadUrl = await getSignedUrl(getClient(), command, { expiresIn });
  const publicUrl = config.S3_PUBLIC_BASE_URL
    ? `${config.S3_PUBLIC_BASE_URL.replace(/\/$/, '')}/${key}`
    : null;

  return { key, uploadUrl, publicUrl, expiresIn };
}

async function createDownloadUrl(key) {
  if (!key || typeof key !== 'string') {
    throw new Error('storage_key no es válido');
  }

  const expiresIn = 900;
  return getSignedUrl(
    getClient(),
    new GetObjectCommand({ Bucket: config.S3_BUCKET, Key: key }),
    { expiresIn },
  );
}

module.exports = { createUploadUrl, createDownloadUrl };
