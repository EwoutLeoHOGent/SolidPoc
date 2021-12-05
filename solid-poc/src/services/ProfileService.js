import {
  getSolidDataset,
  getThing,
  //getStringNoLocaleAll,
  getUrlAll,
} from "@inrupt/solid-client";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { fetch } from "@inrupt/solid-client-authn-browser";
import jobs from "../data/jobs.json";

const ProfileService = {
  getSkillsFromUser: async function () {
    const session = getDefaultSession();

    const profileDocumentURI = session.info.webId.split("#")[0];

    const dataset = await getSolidDataset(profileDocumentURI, { fetch: fetch });

    const profile = getThing(dataset, session.info.webId);

    const skills = getUrlAll(
      profile,
      "http://rdfs.org/resume-rdf/cv.rdfs#hasSkill"
    );

    /*
    const skills = getStringNoLocaleAll(
      profile,
      "http://rdfs.org/resume-rdf/cv.rdfs#hasSkill"
    );
    */

    return skills;
  },

  checkMatch: function (id, skillsUser) {
    const skillsJob = jobs[id - 1].escoSkills;

    let missingSkillsUser = skillsJob.filter((x) => !skillsUser.includes(x));
    let matchingSkillsUser = skillsJob.filter((x) => skillsUser.includes(x));

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
