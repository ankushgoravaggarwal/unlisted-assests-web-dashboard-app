
const BASE_URL = "http://api1.unlistedassets.com/"
var ACCESS_TOKEN = window.sessionStorage.getItem("ACCESS_TOKEN")

let basicAuth = {username: "mobile", password: "abc"}

function apiCall(url, method='GET', body) {

    let completeUrl = BASE_URL + url
    if(ACCESS_TOKEN && !url.includes("oauth"))
        completeUrl = completeUrl + "?access_token=" + ACCESS_TOKEN

    let headers = {
        "content-type": "application/json" ,
        "Authorization": 'Basic ' + btoa(basicAuth.username + ":" + basicAuth.password)
    }

    return fetch(completeUrl, {method, body: JSON.stringify(body), headers })
}

function setAccessToken(token) {
    ACCESS_TOKEN = token
    window.sessionStorage.setItem("ACCESS_TOKEN", token);
}

function clearAccessToken(token) {
    ACCESS_TOKEN = null
    window.sessionStorage.removeItem("ACCESS_TOKEN");
}

function isLoggedIn() {
    if(ACCESS_TOKEN){
        return true
    }
    return false
}

export { apiCall, setAccessToken, isLoggedIn, clearAccessToken}