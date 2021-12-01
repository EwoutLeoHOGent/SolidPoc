import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
} from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { fetch } from "@inrupt/solid-client-authn-browser";

import { RDFS } from "@inrupt/vocab-common-rdf";

const ProfileService = {
  getSkillsFromUser: async function () {
    const session = getDefaultSession();

    const profileDocumentURI = session.info.webId.split("#")[0];

    console.log(profileDocumentURI);

    const dataset = await getSolidDataset(profileDocumentURI, { fetch: fetch });

    const profile = getThing(dataset, session.info.webId);

    const skills = getStringNoLocale(
      profile,
      "http://rdfs.org/resume-rdf/cv.rdfs#hasSkill"
    );

    console.log(skills);
  },
};

export default ProfileService;
