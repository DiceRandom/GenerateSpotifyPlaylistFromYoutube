var uid = "";
var access_token = "A";
var _token = "0"
var pl_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists'
var sg_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists/tracks'
var pName = "YT 2 SP";
var pDescription = "Your New Playlist Awaits";



function updateUID(){
	uid = document.getElementById("uid").value;
	window.localStorage.setItem('uid', uid);
	console.log(window.localStorage.getItem('uid'));
	console.log(uid);
}

function updateInfo(){
	//PLAYLIST INFO
	pName = document.getElementById("name").value;
	pDescription = document.getElementById("description").value;
	window.localStorage.setItem('pName', pName);
	window.localStorage.setItem('pDescription', pDescription);
}



function create_playlist(token){


	_token = token;

	$.ajax(pl_url,{
	   
	   method: "POST",
	   data: JSON.stringify({name: pName, description: pDescription, public: false}),
	   headers: {
	     'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
	     'Content-Type': 'application/json',
	     'Accept': 'application/json'
	   },
	   success: function(response) {
	     console.log(response);
	   }
	 });


}


function vuez(){
const app = new Vue({
	el: '#app',
	data() {
	return {
		client_id: 'a86e871995ea436391e918db90ecf7f9',
		scopes: 'playlist-modify-private,playlist-modify-public',
		redirect_uri: 'https://dicerandom.github.io/GenerateSpotifyPlaylistFromYoutube/',
		me: null
	}
	},
	methods: {
	login() {
		let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
		
		window.spotifyCallback = (payload) => {
		window.localStorage.setItem('token', payload);
		alert(payload);
		create_playlist(payload)
		popup.close()
		}
	}
	},
	mounted() {
	access_token = window.location.hash.substr(1).split('&')[0].split("=")[1]
	
	if (access_token) {
		window.opener.spotifyCallback(access_token)
	}
	}
})}

window.onload = function () {
	vuez();
	pName = window.localStorage.getItem('pName');
	pDescription = window.localStorage.getItem('pDescription');
	uid = window.localStorage.getItem('uid');
	pl_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists'
	sg_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists/tracks'
}
