import {
  login,
  logout,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

const LoginService = {
  loginToPodProvider: function (oidcIssuerUser) {
    return login({
      oidcIssuer: oidcIssuerUser,
      redirectUrl: "http://localhost:3000/Home", //window.location.href, //"http://localhost:3000/Home", nog eens navragen
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
      //sessionStorage.setItem("webID", session.info.webId);
      console.log("inloggen gelukt");

      document.getElementById("loggedInUser").textContent = session.info.webId;
    }
  },
};

export default LoginService;
