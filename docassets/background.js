var options = {};

var DEFAULTS = {
    redirectAssets: true, 
} 

function setDefaults() {
    chrome.storage.sync.get(DEFAULTS, function (obj) {
        chrome.storage.sync.set(obj, syncSettings); 
    }); 
} 

chrome.runtime.onInstalled.addListener(function (info) {
    setDefaults(); 
}); 

function syncSettings() {
    chrome.storage.sync.get(DEFAULTS, function (obj) {
      Object.assign(options, obj); 
      console.log(options);

      let color = options.redirectAssets ? '#00a04a' : '#bb0000'; 
      let text = options.redirectAssets ? 'ON' : 'OFF'; 

      chrome.browserAction.setBadgeBackgroundColor({
          color: color, 
      }); 
      chrome.browserAction.setBadgeText({
          text: text, 
      }); 

    });

    console.log("sync settings running");
}

syncSettings(); 

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "sync-settings") {
      syncSettings(); 
    } 
}); 

function toggleRedirect() {
    options.redirectAssets = !options.redirectAssets; 

    chrome.storage.sync.set(options, syncSettings); 
}

chrome.browserAction.onClicked.addListener(toggleRedirect); 

//assets
var bkgr = "https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/bgimage%20(Docassets).png";

var clam1 = "https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/Pearl%20Shell%20display%20(Docassets).png";
var clam2 = "https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/Pearl%20Stand%20display%20(Docassets).png";

//script

script = 'https://the-doctorpus.github.io/doc-assets/scripts/bundle.js';
  
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        let url = options.redirectAssets ? script : details.url; 

        return {redirectUrl: url};
    },
    {
        urls: [
            "https://deeeep.io/bundle.js?*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var assetUrl = options.redirectAssets ? bkgr : details.url; 
        
        return {redirectUrl: assetUrl};
    },
    {
        urls: [
            "https://deeeep.io/assets/bgimage.png?*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

function genericHandler(redirectTemplate, regex, name) {
    function handler(details) {
        let redirectUrl = details.url; 

        if (options.redirectAssets) {
            const m = regex.exec(details.url); // checks if might be valid X

            console.log(`original ${name} URL is ${details.url}`); 

            if (m) {
                const filename = m.groups.filename; 

                console.log(filename); 

                let newRedirectUrl = redirectTemplate + filename; // redirect it

                let checkRequest = new XMLHttpRequest(); // creates HTTP request

                checkRequest.open('GET', newRedirectUrl, false); // sets up request
                checkRequest.send(); // sends the request

                if (checkRequest.status >= 200 && checkRequest.status < 300) { // redirect exists
                    redirectUrl = newRedirectUrl; 

                    console.log(`Redirecting to ${newRedirectUrl}`); 
                } else {
                    console.log(`${newRedirectUrl} does not exist. Using default.`); 
                }
            } 
        } 

        return  {
            redirectUrl: redirectUrl, 
        }; 
    } 

    return handler; 
}

const ANIMATION_REDIRECT_TEMPLATE = 'https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/animations/'; // redirect URLs are all from this
const ANIMATION_SCHEME = '*://*.deeeep.io/assets/animations/*'; // these urls will be redirected like animations
const ANIMATION_REGEX = /.+\/animations\/(?<filename>.+?)(?:\?.*)?$/ // might it be a valid animation? 

const animationHandler = genericHandler(ANIMATION_REDIRECT_TEMPLATE, ANIMATION_REGEX, 'animation'); 

chrome.webRequest.onBeforeRequest.addListener(
    animationHandler, 
    {
        urls: [
            ANIMATION_SCHEME
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
); 

const CHAR_REDIRECT_TEMPLATE = 'https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/characters/'; // redirect URLs are all from this
const CHAR_SCHEME = '*://*.deeeep.io/*assets/characters/*'; // these urls will be redirected like characters
const CHAR_REGEX = /.+\/characters\/(?<filename>.+?)(?:\?.*)?$/ // might it be a valid character? 

const charHandler = genericHandler(CHAR_REDIRECT_TEMPLATE, CHAR_REGEX, 'character'); 

chrome.webRequest.onBeforeRequest.addListener(
    charHandler, 
    {
        urls: [
            CHAR_SCHEME
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
); 

const SPRITESHEET_REDIRECT_TEMPLATE = 'https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/spritesheets/'; // redirect URLs are all from this
const SPRITESHEET_SCHEME = '*://*.deeeep.io/assets/spritesheets/*'; // these urls will be redirected like spritesheets
const SPRITESHEET_REGEX = /.+\/spritesheets\/(?<filename>.+?)(?:\?.*)?$/ // might it be a valid spritesheet? 

const spritesheetHandler = genericHandler(SPRITESHEET_REDIRECT_TEMPLATE, SPRITESHEET_REGEX, 'spritesheet'); 

chrome.webRequest.onBeforeRequest.addListener(
    spritesheetHandler, 
    {
        urls: [
            SPRITESHEET_SCHEME
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
); 

const MAP_SPRITESHEET_REDIRECT_TEMPLATE = 'https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/default/mapmaker-asset-packs/'; // redirect URLs are all from this
const MAP_SPRITESHEET_SCHEME = '*://*.deeeep.io/mapmaker/assets/packs/*'; // these urls will be redirected like map spritesheets
const MAP_SPRITESHEET_REGEX = /.+\/packs\/(?<filename>.+?)(?:\?.*)?$/ // might it be a valid map spritesheet? 

const mapSpritesheetHandler = genericHandler(MAP_SPRITESHEET_REDIRECT_TEMPLATE, MAP_SPRITESHEET_REGEX, 'map spritesheet'); 

chrome.webRequest.onBeforeRequest.addListener(
    mapSpritesheetHandler, 
    {
        urls: [
            MAP_SPRITESHEET_SCHEME
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
); 

const SKIN_REDIRECT_TEMPLATE = 'https://raw.githubusercontent.com/The-Doctorpus/doc-assets/main/images/skans/'; // redirect URLs are all from this
const SKIN_SCHEME = '*://*.deeeep.io/assets/skins/*'; // these urls will be redirected like skins
const SKIN_REGEX = /.+\/skins\/(?<filename>.+?)(?:\?.*)?$/ // might it be a valid skin? 
const CUSTOM_REGEX = /(?<pre_version>custom\/(?<skin_id>[0-9]+))(?<version>-[0-9]+)(?<post_version>(?<extra_asset_name>-[A-Za-z0-9-_]+)?\.(?<suffix>[a-zA-Z0-9]+))/
// skins submitted through Creators Center have a special scheme and must be stripped of their version number

chrome.webRequest.onBeforeRequest.addListener(
    function skinHandler(details) {
        let redirectUrl = details.url; 
        
        if (options.redirectAssets) {
            const m = SKIN_REGEX.exec(details.url); // checks if might be valid skin

            console.log(`original skin URL is ${details.url}`); 

            if (m) {
                let filename = m.groups.filename; 

                const m2 = CUSTOM_REGEX.exec(filename); // checks if might be Creators Center skin

                if (m2) {
                    filename = m2.groups.pre_version + m2.groups.post_version; // ignoring the version number
                } 
                
                console.log(filename); 

                newRedirectUrl = SKIN_REDIRECT_TEMPLATE + filename; // builds redirect URL

                let checkRequest = new XMLHttpRequest(); // creates HTTP request

                checkRequest.open('GET', newRedirectUrl, false); // sets up request
                checkRequest.send(); // sends the request

                if (checkRequest.status >= 200 && checkRequest.status < 300) { // redirect exists
                    redirectUrl = newRedirectUrl; 

                    console.log(`Redirecting to ${newRedirectUrl}`); 
                } else {
                    console.log(`${newRedirectUrl} does not exist. Using default.`); 
                }
            } 
        } 

        return  {
            redirectUrl: redirectUrl, 
        }; 
    },
    {
        urls: [
            SKIN_SCHEME
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
); 

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var assetUrl = options.redirectAssets ? clam1 : details.url; 

        return {redirectUrl: assetUrl};
    },
    {
        urls: [
            "https://deeeep.io/assets/pearl_cover.png"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var assetUrl = options.redirectAssets ? clam2 : details.url; 

        return {redirectUrl: assetUrl};
    },
    {
        urls: [
            "https://deeeep.io/assets/pearl_stand_only.png"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        if (url.searchParams.get("docassets") == "true") {
            DEFAULTS.redirectAssets = true
            options.redirectAssets = true
        } else {
            DEFAULTS.redirectAssets = false
            options.redirectAssets = false
        }
    }
});