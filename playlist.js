$(document).ready(function(){
    
 
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "https://dicerandom.github.io/GenerateSpotifyPlaylistFromYoutube/" // replace with your redirect_uri;
    const client_secret = "963512865159-v2ji3fhpfpmcbfusv0uf0n7bvhkg0d1h.apps.googleusercontent.com"; // replace with your client secret
    const scope = "https://www.googleapis.com/auth/youtube";
    var client_id = "963512865159-v2ji3fhpfpmcbfusv0uf0n7bvhkg0d1h.apps.googleusercontent.com";// replace it with your client id
    var playlist;
    var channelId;
    var username;
    var search;
    var playlistId;
    var API_KEY = "AIzaSyDIWTpw8pkJgGCcRNXbcKoGeJAqSLbnkTY";

    $("#myplaylist").hide();

    $("#myplaylist").click(function(){
       
        empty();

        getMyPlaylists();

    });

    $("#buttonid").click(function(){

        $("#myplaylist").show();

        empty();

        channelId = $("#channelId").val();

        getChannelPlaylist(channelId);


    });

    $("#usernamebutton").click(function(){

        $("#myplaylist").show();
        
        empty();

        username = $("#usernamefield").val();

        getChannelPlaylistByUserName(username);


    });

    $("#searchbutton").click(function(){

        $("#myplaylist").show();

        empty();

        search = $("#search").val();

        getChannelPlaylistBySearch(search);

    });

 
    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) {
           
            
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           //window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");
           window.history.replaceState({}, document.title, "// replace it with your redirect uri //");
           
           
           
           
        }
  });

    getMyPlaylists();
 
    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   
       
    
    function getMyPlaylists()

    {
    
        $.ajax({
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url:"https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=25&key="+API_KEY+"&access_token=Bearer"+ " "+localStorage.getItem("accessToken"),

            success: function (data) {

                console.log(data);

                //nextPageToken = data.nextPageToken;



                //$("#results").append(data.items.snippet.channelTitle
               
                data.items.forEach(item => {
                   playlist = `
                   <div style="text-align:center;">     
                        <li>
                        <h1>${item.snippet.title}</h1>
                        <img src="${item.snippet.thumbnails.medium.url}" class="img-rounded">
                        <h3>${item.snippet.description}</h3>
                        <a href="https://www.youtube.com/playlist?list=${item.id}" target="_blank">Go To Playlist</a>
                        </li>
                   </div>     
                        `;
                   $("#results1").append(playlist); 
                });

            

            },
            error: function (error) {
                console.log(error);
            },
            
        });
    
    }




    function getChannelPlaylist(channelId)
    {

        $.ajax({
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&channelId="+channelId+"&access_token=Bearer"+ " "+localStorage.getItem("accessToken"),

            success: function (data) {

                console.log(data);

                //$("#results").append(data.items.snippet.channelTitle);
               
                data.items.forEach(item => {
                   playlist = `
                   <div style="text-align:center;">     
                        <li>
                        <h1>${item.snippet.title}</h1>
                        <img src="${item.snippet.thumbnails.medium.url}" class="img-rounded">
                        <h3>${item.snippet.description}</h3>
                        <a href="https://www.youtube.com/playlist?list=${item.id}" target="_blank">Go To Playlist</a>
                        </li>
                   </div>     
                        `;
                   $("#results2").append(playlist); 
                });


            },
            error: function (error) {
                console.log(error);
            },
            
        });
    

    }

    function getChannelPlaylistByUserName(username)
    {
        $.ajax({
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails"+"&maxResults=25&forUsername="+username+"&access_token=Bearer"+ " "+localStorage.getItem("accessToken"),

            success: function (data) {

                console.log(data);

                channelId = data.items[0].id;

                getChannelPlaylistIdUserName(channelId);

                //$("#results").append(data.items.snippet.channelTitle);

            },
            error: function (error) {
                console.log(error);
            },
            
        });
    
    }

    function getChannelPlaylistBySearch(search)

    {

        $.ajax({
            type: "GET",

            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+search+"&type=playlist",

            success: function (data) {

                console.log(data);

                data.items.forEach(item => {
                   
                    playlistId = item.id.playlistId;

                    playlist = `
                   <div style="text-align:center;">     
                        <li>
                        <h1>${item.snippet.title}</h1>
                        <img src="${item.snippet.thumbnails.medium.url}" class="img-rounded">
                        <h3>${item.snippet.description}</h3>
                        <a href="https://www.youtube.com/playlist?list={playlistId}" target="_blank">Go To Playlist</a>
                        </li>
                   </div>     
                        `;

                   $("#results4").append(playlist);

                    
                    
                });

                //$("#results").append(data.items.snippet.channelTitle);

            },
            error: function (error) {
                console.log(error);
            },
            
        });


    }

    function getChannelPlaylistIdUserName(channelId)

    {
        $.ajax({
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&channelId="+channelId+"&access_token=Bearer"+ " "+localStorage.getItem("accessToken"),

            success: function (data) {

                console.log(data);

                //$("#results").append(data.items.snippet.channelTitle);
               
                data.items.forEach(item => {
                   playlist = `
                   <div style="text-align:center;">     
                        <li>
                        <h1>${item.snippet.title}</h1>
                        <img src="${item.snippet.thumbnails.medium.url}" class="img-rounded">
                        <h3>${item.snippet.description}</h3>
                        <a href="https://www.youtube.com/playlist?list=${item.id}" target="_blank">Go To Playlist</a>
                        </li>
                   </div>     
                        `;
                   $("#results3").append(playlist); 
                });


            },
            error: function (error) {
                console.log(error);
            },
            
        });
    

    }

    function empty()
    {
        $("#results1").empty();
        $("#results2").empty();
        $("#results3").empty();
        $("#results4").empty();
    }
 
 
    
})