const mongoose = require('mongoose');
const dns = require('dns');
const { execFileSync } = require('child_process');

const isUsableDns = (server) => !/^(127\.\d+\.\d+\.\d+|0\.0\.0\.0|::1|fec0:)/i.test(server);

function systemDnsServers() {
  if (process.platform !== 'win32') return [];
  try {
    const out = execFileSync(
      'powershell',
      ['-NoProfile', '-Command', "(Get-DnsClientServerAddress -AddressFamily IPv4).ServerAddresses"],
      { encoding: 'utf8', timeout: 5000 }
    );
    return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function ensureDnsServers() {
  const current = dns.getServers();
  if (current.some(isUsableDns)) return;
  const servers = [...new Set([...systemDnsServers().filter(isUsableDns), '8.8.8.8', '1.1.1.1'])];
  if (!servers.length) return;
  dns.setServers(servers);
  console.warn(`⚠️ Résolveur DNS local invalide (${current.join(', ')}) — serveurs forcés : ${servers.join(', ')}`);
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI manquant dans .env');
    process.exit(1);
  }

  ensureDnsServers();

  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 3000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB connecté');
      return;
    } catch (err) {
      console.error(`❌ Erreur de connexion MongoDB (tentative ${attempt}/${MAX_RETRIES}) :`, err.message);
      if (attempt === MAX_RETRIES) process.exit(1);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

module.exports = connectDB;
