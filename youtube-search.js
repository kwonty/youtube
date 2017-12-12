$(function(){
  
  var apiKey = "AIzaSyBwz6tRzsODrUDouhbTmek8A0mX4anW1HY";
  var apiYoutube = "https://www.googleapis.com/youtube/v3/search"
  
  $('form').submit( function(ev){
    ev.preventDefault(); // 전송을 막음
    
    var query = $('#query').val();
    
//    consol.log(query);
  
    search(query);
  
  })
  
  function search(query){
  $.get(
    apiYoutube, 
    {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 10,
      key: apiKey
    },
    function(data){ //성공
      console.log(data)
      
      $.each(data.items, function(index, item){
        var newItem =buildItem(item);
        $('#results').append(newItem)
      })
      
    }
  );   
 }
 
 var buildItem = function(item){
   var videoId = item.id.videoId;
   var thumbnail = item.snippet.thumbnails.default.url;
   var title = item.snippet.title;
   var description = item.snippet.description;
   
   var newItem =`
    <li class="item">
      <a href="http://www.youtube.com/watch?v=${videoId}" target="_blank">
      <h3>${title}</h3>
      <div class="image-wrapper">
        <img src="${thumbnail}">
      </div>
      <div class="description">
        ${description}
      </div>  
      </a>
    </li>
   `;
   
  return newItem;
   
 }
})