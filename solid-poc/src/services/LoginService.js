import {
  login,
  logout,
  handleIncomingRedirect,
} from "@inrupt/solid-client-authn-browser";

const LoginService = {
  loginToPodProvider: function (oidcIssuerUser, id) {
    return login({
      oidcIssuer: oidcIssuerUser,
      redirectUrl: `http://localhost:3000/JobMatch/${id}`,
      clientName: "Solid poc",
    });
  },

  logoutUser: function () {
    return logout();
  },

  redirectAfterLogin: async function () {
    await handleIncomingRedirect();
  },
};

export default LoginService;
