/*
 * Compiling react pages on the raspberry directly can be very slow.
 * To compile the frontend "offline" but still be able to connect to the raspberry server it is possible to use the "REACT_APP_SERVER_IP" environment variable before calling "yarn start":
 *  - Windows (cmd): $> set "REACT_APP_SERVER_IP=xxx.xxx.xxx.xxx" && yarn start
 *  - Linux:$> REACT_APP_SERVER_IP=xxx.xxx.xxx.xxx yarn start
 * The variable will be used only in development, not for the build process
*/
function getWorkingDomain(){
    if (import.meta.env.VITE_DEVELOPMENT_SERVER !== undefined){
        console.log("Using VITE_DEVELOPMENT_SERVER environmental variable: " + import.meta.env.VITE_DEVELOPMENT_SERVER);
        return window.location.protocol + '//' + import.meta.env.VITE_DEVELOPMENT_SERVER;
    }
    return window.location.protocol + '//' + window.location.hostname + ":" + window.location.port;
}

const domain = getWorkingDomain();


// removes undefined and null values from an array
function checkArray(arr){
    return arr.filter((el) => el !== null && el !== undefined);
}

// get the url of given images
function getImgUrl(id){
    if (id !== undefined)
        return domain + "/Drawings/" + id + "?v=" + process.env.VITE_APP_VERSION;  // adding version to automatically reload the images when a new version of the sofware is installed
    else return "";
}

const home_site = "https://github.com/NikhilGuggilla25/ArtScape_app";

export { domain, getImgUrl, checkArray, home_site };