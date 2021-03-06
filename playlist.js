const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const redirect_uri = "https://dicerandom.github.io/GenerateSpotifyPlaylistFromYoutube/" // replace with your redirect_uri;
const CLIENT_SECRET = "963512865159-v2ji3fhpfpmcbfusv0uf0n7bvhkg0d1h.apps.googleusercontent.com"; // replace with your client secret
const SCOPE = "https://www.googleapis.com/auth/youtube";
var client_id = "963512865159-v2ji3fhpfpmcbfusv0uf0n7bvhkg0d1h.apps.googleusercontent.com";// replace it with your client id
var playlists,channelId,username,search,user, playlistId;
var API_KEY = "AIzaSyDIWTpw8pkJgGCcRNXbcKoGeJAqSLbnkTY";
var GoogleAuth;
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Retrieve the discovery document for version 3 of YouTube Data API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_SECRET,
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function () {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function () {
            revokeAccess();


        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {



    user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out!');
        getCID();
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted ' +
            'access to this app.');
    } else {
        $('#sign-in-or-out-button').html('Sign In/Authorize');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are ' +
            'signed out.');
    }
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}


function getPlaylist() {
    gapi.client.setApiKey(
        API_KEY
      );
      gapi.client.load('youtube', 'v3').then(function (){
        gapi.client.youtube.playlists.list ({
          channelId: channelId,
          maxResults: 50,
          part: 'snippet'
        }).then (function(response){
          console.log(response.result);
          playlists = response.result.items;
          createElements();
          },function(reason){
            console.log(reason);
          });
      });
}

var arrayOfItems,titles = [];
// arrayOfItems[0].snippet.title
function addTitlesToArray(){
    for (let i = 0; i < arrayOfItems.length; i++) {
        titles[i] = arrayOfItems[i].snippet.title
    }
}

function getVideosInPlaylist(playlistID){
    gapi.client.load('youtube', 'v3').then(function (){
        gapi.client.youtube.playlistItems.list ({
          playlistId: playlistID,
          maxResults: 50,
          part: 'snippet'
        }).then (function(response){
            arrayOfItems =  response.result.items;
            addTitlesToArray();
          },function(reason){
            console.log(reason);
          });
      });
}



// onclick="location.href='http://www.example.com';" style="cursor:pointer;"


function createElements(){
    for (let i = 0; i < playlists.length; i++) {
        playlistBlock = document.getElementById("playlists");
        var playlistDiv = document.createElement("div");
        var playlistImg = document.createElement("img");
        var playlistTitle = document.createElement("span");

        playlistImg.src = playlists[i].snippet.thumbnails.high.url;
        playlistImg.className = "playlistImage";

        playlistTitle.innerHTML = playlists[i].snippet.title;
        playlistTitle.className = "playlistTitle";

        playlistDiv.id = "Playlist-"+playlists[i].id;
        playlistDiv.onclick = "location.href='http://www.example.com';";
        playlistDiv.style = "cursor:pointer;"

        playlistDiv.appendChild(playlistImg);
        playlistDiv.appendChild(playlistTitle);
        playlistBlock.appendChild(playlistDiv);   
    }
}



function getCID() {
    var request = gapi.client.request({
        'method': 'GET',
        'path': '/youtube/v3/channels',
        'params': { 'part': 'snippet', 'mine': 'true' }
    });
    // Execute the API request.
    request.execute(function (response) {
        console.log(response.items[0].id);
        channelId = response.items[0].id;
        getPlaylist();
    });
}



