let hostname = '';
let isBuild = false;

if (process.env.NODE_ENV === 'development') {
  hostname = 'http://localhost:8010';
  isBuild = false;
}
if (process.env.NODE_ENV === 'production') {
  hostname = 'https://daily-hradmin.renliwo.com';
  isBuild = true;
}

export {
  hostname,
  isBuild
}
