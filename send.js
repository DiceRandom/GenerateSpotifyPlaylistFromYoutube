window.onload = function () {
var uid = "";
var access_token = "A";
var _token = "0"
var pl_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists'
var sg_url = 'https://api.spotify.com/v1/users/'+uid+'/playlists/tracks'

updateUID();

function updateUID(){
	document.getElementById("uid").value = uid;
	console.log(uid);
}

function addSong(){

	$.ajax(sg_url,{
	   
		method: "POST",
		data: JSON.stringify({name: "YT 2 SP", description: "Your New Playlist Awaits", public: false}),
		headers: {
		  'Authorization': 'Bearer ' + _token,
		  'Content-Type': 'application/json',
		  'Accept': 'application/json'
		},
		success: function(response) {
		  console.log(response);
		}
	  });
}


function create_playlist(token){


	_token = token;

	$.ajax(pl_url,{
	   
	   method: "POST",
	   data: JSON.stringify({name: "YT 2 SP", description: "Your New Playlist Awaits", public: false}),
	   headers: {
	     'Authorization': 'Bearer ' + token,
	     'Content-Type': 'application/json',
	     'Accept': 'application/json'
	   },
	   success: function(response) {
	     console.log(response);
	   }
	 });


}



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
	})
}
