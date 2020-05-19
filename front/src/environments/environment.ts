export const environment = {
  production: false,
  loginUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/connect',
  registerUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/register',
  resetPasswordUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/resetPassword',
  updateProfileUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/user',
  updateEmailUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/user',
  updatePasswordUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/user',
  searchUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/search',
  getItemUrl: 'http://' + process.env.API_ADDR  + ':' + process.env.API_PORT  + '/item'
};