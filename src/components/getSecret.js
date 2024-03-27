function getSecret() {
  let secret = localStorage.getItem('secret');
  if (!secret) {
    secret = sessionStorage.getItem('secret');
  }
  return secret;
}

export default getSecret;
