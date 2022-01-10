
import {
  getSolidDataset,
  getThing,
  getUrlAll,
  getStringNoLocale,
} from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { fetch } from "@inrupt/solid-client-authn-browser";
import jobs from "../data/jobs.json";

import { SKOS } from "@inrupt/vocab-common-rdf";

const ProfileService = {
  getSkillsFromUser: async function () {
    const session = getDefaultSession();

    console.log(session);

    const card = session.info.webId.split("#")[0];

    const dataset = await getSolidDataset(card, { fetch: fetch });

    const profile = getThing(dataset, session.info.webId);

    const skills = getUrlAll(
      profile,
      "http://rdfs.org/resume-rdf/cv.rdfs#hasSkill"
    );

    return skills;
  },

  getSkillName: async function (skill) {
    const session = getDefaultSession();

    const profileDocumentURI = session.info.webId.split("#")[0];

    const dataset = await getSolidDataset(profileDocumentURI, { fetch: fetch });

    const skillName = getStringNoLocale(
      getThing(dataset, skill),
      SKOS.prefLabel
    );

    return skillName;
  },

  checkMatch: async function (id, skillsUser) {
    const session = getDefaultSession();

    const profileDocumentURI = session.info.webId.split("#")[0];

    const dataset = await getSolidDataset(profileDocumentURI, { fetch: fetch });

    const skillsJob = jobs[id - 1].escoSkills;

    const userSkills = skillsUser.map((skill) => {
      const skillName = getStringNoLocale(
        getThing(dataset, skill),
        SKOS.prefLabel
      );

      return { url: skill, name: skillName };
    });

    let missingSkillsUser = skillsJob.filter(
      (x) => !userSkills.some((y) => x.url === y.url)
    );
    let matchingSkillsUser = userSkills.filter((x) =>
      skillsJob.some((y) => x.url === y.url)
    );

    const result = [missingSkillsUser, matchingSkillsUser];

    return result;
  },

  getPodUrl: function () {
    const session = getDefaultSession();

    const podUrl = session.info.webId.split("profile")[0];

    return podUrl;
  },

  getWebID: function () {
    const session = getDefaultSession();

    const webId = session.info.webId;

    return webId;
  },
};

export default ProfileService;
