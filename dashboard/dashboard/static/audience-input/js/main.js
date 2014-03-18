var serverURL = "localhost";

var results = new Array();
var imgs = new Array();

function processInput(){
  if(counter>10){
    counter-=11;
  }
  if(counter<0){
    counter+=11;
  }
  defocus();
  setTimeout(handleInput,200);
  setTimeout(textFocus,500);
} 
function handleInput(){

  var inp = document.getElementsByClassName("txt")[counter].value;
  
  if(inp!=''){
    document.getElementsByClassName("txt")[counter].value ='';
    var title = document.getElementsByClassName("title")[counter].innerHTML; 
    results.push([title,inp]);

    var text = [{"text":inp}];
    var dataString = JSON.stringify(text);
    var postArray = {json:dataString};
    // send results to server here
    if(title=="Lines From a Hat"){
      $.ajax({
        type: "POST",
        url: serverURL+"/api/lines/create/",
        data: postArray,
        dataType: 'json',
        success: success,
        dataType: dataType
      });
    }
    if(title=="Jump Styles"){ 
      $.ajax({
        type: "POST",
        url: serverURL+"/api/emotions/create/",
        data: postArray,
        dataType: 'json',
        success: success,
        dataType: dataType
      });
    }


    // INSERT OTHER POST REQUESTS HERE


    
    var right = document.getElementById('r');
    right.click();
  } 
}
 
function textFocus(){
  document.getElementsByClassName("txt")[counter].focus();
}
function defocus(){
  document.getElementsByClassName("txt")[counter].blur();
}
function getCssProperty(elmId, property){
   var elem = document.getElementById(elmId);
   return window.getComputedStyle(elem,null).getPropertyValue(property);
}

function imgClicked(id){
  var item = document.getElementById(id);
  var color = getCssProperty(id,'background-color');

  if (color!="rgb(66, 139, 202)") {
      if(imgs.length<5){
        item.setAttribute("style","background-color:#428bca;");
        var color = getCssProperty(id,'background-color');
        imgs.push(id);
      } else {
        alert('Select no more than 5 thumbnails!');
      }
  } else {
      item.setAttribute("style","background-color:#777;");
      var index = imgs.indexOf(id);
      if(index>-1){
        imgs.splice(index,1);
      }
  }
}
 
function processNewsroom(){
  if(imgs.length>0){

    for (var i in imgs) {
      var item = document.getElementById(imgs[i]);
      item.setAttribute("style","background-color:#777;");

      // send item to server
      var text = [{"text":imgs[i]}];
      var dataString = JSON.stringify(text);
      var postArray = {json:dataString};

      $.ajax({
        type: "POST",
        url: serverURL+"/api/clips/create/",
        data: postArray,
        dataType: 'json',
        success: success,
        dataType: dataType
      });


    } 
    imgs.length=0;
    var right = document.getElementById('r');
    right.click();
  }

}