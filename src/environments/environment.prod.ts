export const environment = {
  production: true,
  apiEndpoint: 'http://localhost:5002/api/v1/',
  authConfig: {
    client_id: 'homeorganizer',
    scope: "openid profile email offline_access ho.read",
    response_type: "id_token token",
    authority: 'http://localhost:5000',
    authorityApi: 'http://localhost:5000/api',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    silent_redirect_uri: 'http://localhost:4200/assets/silent-refresh.html',
    redirect_component_signin: '/demo',
    redirect_component_signout: '/home',
    redirect_component_register: '/register'
  },
};
