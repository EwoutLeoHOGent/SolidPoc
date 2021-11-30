import {
  login,
  logout,
  handleIncomingRedirect,
  getDefaultSession,
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
    console.log("logout");
    return logout();
  },

  redirectAfterLogin: async function () {
    await handleIncomingRedirect();

    const session = getDefaultSession();

    if (session.info.isLoggedIn) {
      console.log("inloggen gelukt");
    }
  },
};

export default LoginService;
