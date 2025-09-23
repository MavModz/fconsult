function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let randomString = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  randomValues.forEach((value) => {
    randomString += possible.charAt(value % possible.length);
  });
  return randomString;
}

async function generatePKCE() {
  const codeVerifier = generateRandomString(64);

  // Store codeVerifier in sessionStorage (so it can be sent to the backend later)
  // sessionStorage.setItem("code_verifier", codeVerifier);

  // Hash codeVerifier using SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  // Convert hashed value to Base64 URL-encoded string
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");


  return { codeVerifier, codeChallenge };
}

export default defineEventHandler(async (event) => {

  const { codeVerifier, codeChallenge } = await generatePKCE();

  const VITE_STATE = "NRI128CH"
  const VITE_TXN = "FAC129TG"
  const VITE_CLIENT_ID = "OMBF3480DB"
  const VITE_DIGILOCKER_URI = "digi-auth"
  const VITE_PLAN_PRICE = "30000"
  const VITE_API_URL = 'https://api.findandconsult.com'

  // `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&txn=${txn}&code_challenge=${codeChallenge}&code_challenge_method=S256`
  return {
    codeVerifier,
    codeChallenge,
    url: `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${VITE_CLIENT_ID}&redirect_uri=${VITE_API_URL}/${VITE_DIGILOCKER_URI}&state=${VITE_STATE}&txn=${VITE_TXN}&code_challenge=${codeChallenge}&code_challenge_method=S256`
  };
});
