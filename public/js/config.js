window.BACKEND_URL = window.location.hostname.includes('localhost') 
  ? 'http://localhost:4000' 
  : window.location.origin;
