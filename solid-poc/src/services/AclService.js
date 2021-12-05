import {
  createAcl,
  getFileWithAcl,
  hasResourceAcl,
  setAgentResourceAccess,
  getAgentAccessAll,
  saveAclFor,
  getResourceAcl,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";

const companyPod = "https://ewout.solidcommunity.net/profile/card#me";

const AclService = {
  giveAcces: async function (fileURL, agent) {
    const file = await getFileWithAcl(fileURL, {
      fetch: fetch,
    });

    //check if an acl exists
    if (!hasResourceAcl(file)) {
      const newAclForFile = createAcl(file);

      // Give someone Control access to the given Resource:
      const acl = setAgentResourceAccess(newAclForFile, agent, {
        read: true,
        append: true,
        write: true,
        control: true,
      });

      // Now save the ACL:
      await saveAclFor(file, acl, { fetch: fetch });

      const updatedAclForFile = setAgentResourceAccess(acl, companyPod, {
        read: true,
        append: false,
        write: false,
        control: false,
      });

      // Now save the ACL:
      await saveAclFor(file, updatedAclForFile, { fetch: fetch });
    } else {
      const aclFromFile = getResourceAcl(file, { fetch: fetch });

      const updatedAclFromFile = setAgentResourceAccess(
        aclFromFile,
        companyPod,
        {
          read: true,
          append: false,
          write: false,
          control: false,
        }
      );

      await saveAclFor(file, updatedAclFromFile, { fetch: fetch });
    }
  },

  getRights: function () {
    return getFileWithAcl("https://ewout.inrupt.net/pdf/testPdf.pdf", {
      fetch: fetch,
    });
  },

  getAccesRights: function (file) {
    return getAgentAccessAll(file, {
      fetch: fetch,
    });
  },
};

export default AclService;
