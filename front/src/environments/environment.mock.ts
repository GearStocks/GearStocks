export const environment = {
  production: false,
  loginUrl: 'http://' + process.env.API_ADDR + ':3000/connect',
  registerUrl: 'http://' + process.env.API_ADDR + ':3000/register',
  resetPasswordUrl: 'http://' + process.env.API_ADDR + ':3000/resetPassword',
  updateProfileUrl: 'http://' + process.env.API_ADDR + ':3000/connect',
  updateEmailUrl: 'http://' + process.env.API_ADDR + ':3000/user',
  updatePasswordUrl: 'http://' + process.env.API_ADDR + ':3000/user',
  searchUrl: 'http://' + process.env.API_ADDR + ':3000/search',
  getItemUrl: 'http://' + process.env.API_ADDR + ':3000/item'
};
