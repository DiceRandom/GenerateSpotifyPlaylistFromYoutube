const app = new Vue({
  el: '#app',
  data() {
    return {
      client_id: '9eddbd6ad5384b629eae7f0656108325',
      scopes: 'user-top-read',
      redirect_uri: 'https://s.codepen.io/leemartin/debug/ffc5867e9dd2a8119bdf9c7735e021cc',
      me: null
    }
  },
  methods: {
    login() {
      let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
      
      window.spotifyCallback = (payload) => {
        // alert(payload)
        
        popup.close()
        
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${payload}`
          }
        }).then(response => {
          return response.json()
        }).then(data => {
          this.me = data
        })
      }
    }
  },
  mounted() {
    this.token = window.location.hash.substr(1).split('&')[0].split("=")[1]
    
    if (this.token) {
      // alert(this.token)
      
      window.opener.spotifyCallback(this.token)
    }
  }
})
