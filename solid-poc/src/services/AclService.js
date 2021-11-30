import {
  createAcl,
  getFileWithAcl,
  hasResourceAcl,
  setAgentResourceAccess,
  getAgentAccessAll,
  saveAclFor,
  deleteAclFor,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";

const AclService = {
  giveAcces: async function () {
    const file = await getFileWithAcl(
      "https://ewout.inrupt.net/pdf/testPdf.pdf",
      {
        fetch: fetch,
      }
    );

    //check if an acl exists
    if (!hasResourceAcl(file)) {
      console.log("Geen acl, nieuwe acl wordt aangemaakt");

      const newAcl = createAcl(file);

      // Give someone Control access to the given Resource:
      const acl = setAgentResourceAccess(
        newAcl,
        document.getElementById("loggedInUser").textContent,
        {
          read: true,
          append: true,
          write: true,
          control: true,
        }
      );

      // Now save the ACL:
      await saveAclFor(file, acl, { fetch: fetch });

      const updatedAcl2 = setAgentResourceAccess(
        acl,
        "https://ewout.solidcommunity.net/profile/card#me",
        {
          read: true,
          append: true,
          write: true,
          control: true,
        }
      );

      // Now save the ACL:
      await saveAclFor(file, updatedAcl2, { fetch: fetch });

      console.log("Nieuwe acl aangemaakt");
    } else {
      console.log("Heeft een bestaande acl");
      console.log("Wordt verwijderd");

      deleteAclFor(file, { fetch: fetch });
    }
  },

  getRights: function () {
    return getFileWithAcl("https://ewout.inrupt.net/pdf/testPdf.pdf", {
      fetch: fetch,
    });

    /*
    console.log(
      getAgentAccessAll(file, {
        fetch: fetch,
      })
    );
    */
  },

  getAccesRights: function (file) {
    return getAgentAccessAll(file, {
      fetch: fetch,
    });

    //throw new Error();
  },
};

export default AclService;
