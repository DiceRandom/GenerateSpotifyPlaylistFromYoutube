window.onload = function () {
var uid = "i32v9nlxq9vi9rtbdhs5c5abn";
var access_token = "A";
var url = 'https://api.spotify.com/v1/users/{uid}/playlists'

create_playlist(); 

function create_playlist(){




	$.ajax(url,{
	   
	   method: "POST",
	   data: JSON.stringify({name: "tester!", description: "New playlist description", public: false}),
	   headers: {
	     'Authorization': 'Bearer ' + access_token,
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
	      scopes: 'user-top-read',
	      redirect_uri: 'https://dicerandom.github.io/GenerateSpotifyPlaylistFromYoutube/',
	      me: null
	    }
	  },
	  methods: {
	    login() {
	      let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
	      
	      window.spotifyCallback = (payload) => {
	        alert(payload);
	     
	        popup.close()
	      }
	    }
	  },
	  mounted() {
	    access_token = window.location.hash.substr(1).split('&')[0].split("=")[1]
	    
	    if (access_token) {
	      window.opener.spotifyCallback(this.access_token)
	      create_playlist()
	    }
	  }
	})
}
