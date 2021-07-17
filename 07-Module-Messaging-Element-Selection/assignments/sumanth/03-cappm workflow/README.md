# browser-extension-starter-react

Building and configuring browser extension with it's required config is relatively combursome task. So, I decided to make a template which helps to create browser extension using React.

Let's discuss couple of concepts from Browser extension.

## manifest:

`manifest.json` [Reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json "Reference")

`default_popup` [Reference](https://developer.chrome.com/extensions/browserAction "Reference")

`background` [Reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts "Reference")

`content_scripts` [Reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts "Reference")


### Summary

> * A **content script** is injected into each page matching some criteria.
> * **Background script** can be used for all http calls and as well as persisting storage
> * **Default popup** is out html page shows by clicking on extension icon

### Source: 

**V2 version** https://developer.chrome.com/docs/extensions/mv2/getstarted/

**V3 version** https://developer.chrome.com/docs/extensions/mv3/getstarted/

