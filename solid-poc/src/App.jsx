import React, { useState } from "react";
import useStyles from "./App.js";

import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  createSolidDataset,
  createThing,
  setThing,
  addUrl,
  addStringNoLocale,
  saveSolidDatasetAt,
  getThingAll,
  removeThing,
  getFile,
} from "@inrupt/solid-client";

import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch,
} from "@inrupt/solid-client-authn-browser";

import { SCHEMA_INRUPT, RDF, AS, VCARD } from "@inrupt/vocab-common-rdf";

export default function SolidPoc() {
  const classes = useStyles();
  const [webID, setWebID] = useState("");
  const [podUrl, setPodUrl] = useState("");
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(true);

  // 1a. Start Login Process. Call login() function.
  const loginToInruptDotNet = () => {
    return login({
      oidcIssuer: "https://inrupt.net",
      redirectUrl: window.location.href,
      clientName: "Getting started app",
    });
  };

  // 1b. Login Redirect. Call handleIncomingRedirect() function.
  // When redirected after login, finish the process by retrieving session information.
  async function handleRedirectAfterLogin() {
    await handleIncomingRedirect();

    const session = getDefaultSession();

    if (session.info.isLoggedIn) {
      //Show read and write div
      setIsNotLoggedIn(false);

      //document.getElementById("readDiv").hidden = "false";
      //document.getElementById("writeDiv").hidden = "false";

      // Update the page with the status.
      document.getElementById("labelStatus").textContent =
        "Your session is logged in.";
      document.getElementById("labelStatus").setAttribute("role", "alert");

      // Update the page with the status.
      document.getElementById(
        "labelStatus"
      ).textContent = `Logged in with WebID ${session.info.webId}`;
      setWebID(session.info.webId);
      document.getElementById("labelStatus").setAttribute("role", "alert");

      //get podUrl
      const teststring = session.info.webId.split("/profile");
      setPodUrl(teststring[0]);
    }
  }

  handleRedirectAfterLogin();

  // 2. Read profile
  async function readProfile() {
    const webID = document.getElementById("webID").value;

    // The example assumes the WebID has the URI <profileDocumentURI>#<fragment> where
    // <profileDocumentURI> is the URI of the SolidDataset
    // that contains profile data.

    // Parse ProfileDocument URI from the `webID` value.
    const profileDocumentURI = webID.split("#")[0];
    document.getElementById("labelProfile").textContent = profileDocumentURI;

    // Use `getSolidDataset` to get the Profile document.
    // Profile document is public and can be read w/o authentication; i.e.:
    // - You can either omit `fetch` or
    // - You can pass in `fetch` with or without logging in first.
    //   If logged in, the `fetch` is authenticated.
    // For illustrative purposes, the `fetch` is passed in.
    const myDataset = await getSolidDataset(profileDocumentURI, {
      fetch: fetch,
    });

    // Get the Profile data from the retrieved SolidDataset
    const profile = getThing(myDataset, webID);

    // Get the formatted name (fn) using the property identifier "http://www.w3.org/2006/vcard/ns#fn".
    // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.

    const fn = getStringNoLocale(profile, VCARD.fn);

    // VCARD.role object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#role"
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#role" string instead of VCARD.role.

    const role = getStringNoLocale(profile, VCARD.role);

    // Update the page with the retrieved values.
    document.getElementById("labelFN").textContent = fn;
    document.getElementById("labelRole").textContent = role;
  }

  // 2. Create the Reading List
  async function createList() {
    document.getElementById("labelCreateStatus").textContent = "";
    const podUrl = document.getElementById("PodURL").value;

    // For simplicity and brevity, this tutorial hardcodes the SolidDataset URL.
    // In practice, you should add a link to this resource in your profile that applications can follow.
    const readingListUrl = `${podUrl}/getting-started/readingList/myList`;

    let titles = document.getElementById("titles").value.split("\n");

    // Fetch or create a new reading list.
    let myReadingList;

    try {
      // Attempt to fetch the reading list in case it already exists.
      myReadingList = await getSolidDataset(readingListUrl, { fetch: fetch });
      // Clear the list to override the whole list
      let titles = getThingAll(myReadingList);
      titles.forEach((title) => {
        myReadingList = removeThing(myReadingList, title);
      });
    } catch (error) {
      if (typeof error.statusCode === "number" && error.statusCode === 404) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        myReadingList = createSolidDataset();
      } else {
        console.error(error.message);
      }
    }

    // Add titles to the Dataset
    for (let i = 0; i < titles.length; i++) {
      let title = createThing({ name: "title" + i });
      title = addUrl(title, RDF.type, AS.Article);
      title = addStringNoLocale(title, SCHEMA_INRUPT.name, titles[i]);
      myReadingList = setThing(myReadingList, title);
    }

    try {
      // Save the SolidDataset
      let savedReadingList = await saveSolidDatasetAt(
        readingListUrl,
        myReadingList,
        { fetch: fetch }
      );

      document.getElementById("labelCreateStatus").textContent = "Saved";

      // Refetch the Reading List
      savedReadingList = await getSolidDataset(readingListUrl, {
        fetch: fetch,
      });

      let items = getThingAll(savedReadingList);

      let listcontent = "";
      for (let i = 0; i < items.length; i++) {
        let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
        if (item !== null) {
          listcontent += item + "\n";
        }
      }

      document.getElementById("savedtitles").value = listcontent;

      //RETRIEVE MUSICLIST
      try {
        const file = await getFile(
          `${podUrl}/public/music/myList.txt`, // File in Pod to Read
          { fetch: fetch } // fetch from authenticated session
        );

        //READT .txt FILE
        file
          .text()
          .then((text) => (document.getElementById("savedMusic").value = text));
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.log(error);
      document.getElementById("labelCreateStatus").textContent =
        "Error" + error;
      document
        .getElementById("labelCreateStatus")
        .setAttribute("role", "alert");
    }
  }

  return (
    <div>
      <header>
        <h2>Solid Proof Of Concept</h2>
      </header>
      <section className={classes.panel}>
        <div className="row">
          <label id="labelLogin">1. Click the button to log in: </label>
          <button name="btnLogin" id="btnLogin" onClick={loginToInruptDotNet}>
            Login
          </button>
          <p id="labelStatus"></p>
        </div>
      </section>

      <div className={classes.panel} hidden={isNotLoggedIn}>
        <div className="row">
          <label id="readlabel">2. Enter a WebID: </label>
          <input
            type="url"
            id="webID"
            name="webID"
            size="50"
            pattern="https://.*"
            value={webID}
            readOnly
          />
          <button name="btnRead" id="btnRead" onClick={readProfile}>
            Read Profile
          </button>
        </div>
        <dl className={classes.display}>
          <dt>Profile SolidDataset: </dt>
          <dd id="labelProfile"></dd>
          <dt>Formatted Name (FN): </dt>
          <dd id="labelFN"></dd>
          <dt>Role: </dt>
          <dd id="labelRole"></dd>
        </dl>
      </div>

      <div className={classes.panel} hidden={isNotLoggedIn}>
        <div className="row">
          <label id="writelabel">
            3. Create a private reading list in your Pod.
          </label>
        </div>
        <div className="row">
          <table>
            <tbody>
              <tr>
                <td>
                  <label id="podlabel">a. Enter your Pod URL: </label>
                </td>
                <td>
                  <input
                    type="url"
                    id="PodURL"
                    name="PodURL"
                    size="50"
                    pattern="https://.*"
                    placeholder="e.g., https://<username>.inrupt.net"
                    value={podUrl}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label id="listLabel">b. Enter items to read: </label>
                </td>
                <td>
                  <textarea
                    id="titles"
                    name="titles"
                    rows="5"
                    cols="42"
                    defaultValue="New file"
                  />
                  <button name="btnCreate" id="btnCreate" onClick={createList}>
                    Create
                  </button>
                  <span id="labelCreateStatus"></span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>c. Retrieved:</label>
                </td>
                <td>
                  <textarea
                    id="savedtitles"
                    name="savedtitles"
                    rows="5"
                    cols="42"
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>d. File music read</label>
                </td>
                <td>
                  <textarea
                    id="savedMusic"
                    name="savedMusic"
                    rows="5"
                    cols="42"
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
