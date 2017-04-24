var MapWrapper = require('../mapWrapper.js')

var Sidebar = function(passedPage){
  this.sidebarHTMLObject = document.querySelector('#sidebar');
  sidebarHidden = false;
  this.page = passedPage;
}

Sidebar.prototype = {

  populateList: function(getAllRoutes){
    var wishlistUL = document.querySelector('#wishlist')
    
    var sidebarScope = this;

    var returnedList = getAllRoutes('http://localhost:3000/api/routes', function(){
      
      var parsedList = JSON.parse(this.response);
      parsedList.forEach(function(element){
        var newLi = document.createElement('li');

        newLi.innerText = element.name + " " + element._id;
        // console.log(element.googleResponse)


        console.log("ELEMENT",element)
        newLi.innerText = "Name: " + element.name + " \nStart: " + element.origin + "\nFinish: "+element.destination
        console.log("ELEMENT!!!!!!!!!!!!!!!!!!!", element)
        var newBr = document.createElement('br');
        newLi.appendChild(newBr)

        var newATag = document.createElement('a');
        var hrefString = "http://localhost:3000/api/routes/"+element.name
        newATag.href = hrefString;
        newATag.text = "Map Link Here";
        newLi.appendChild(newATag);

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

          var doneButton = document.createElement('button');
          doneButton.id = "doneButton"
          doneButton.innerText = "Done"
          doneButton.onclick = function(){
            newLi.style.textDecoration = 'line-through';
          }

          var deleteRouteFromDB = function (routeID) {
            url = "http://localhost:3000/api/routes/"
            url += routeID 
            var request = new XMLHttpRequest()
            request.open('DELETE', url)
            // request.onload = callback
            request.send()
          }

          var deleteButton = document.createElement('button');
          deleteButton.id = "deleteButton"
          deleteButton.innerText = "Delete"
          deleteButton.addEventListener('click', function(){
            deleteRouteFromDB(element._id)
            newLi.style.display = 'none';
          })

          var displayRoute = document.createElement('button');
          displayRoute.id = 'sidebarDisplayRouteButton'
          displayRoute.innerText = "Display Route"

          displayRoute.addEventListener('click', function(){

            var mainMap = sidebarScope.page.map.mainMap;
            mainMap.drawRoute(element.googleResponse)
            
          })

        newLi.appendChild(divP)
        newLi.appendChild(displayRoute);
        newLi.appendChild(doneButton);
        newLi.appendChild(deleteButton);
        wishlistUL.appendChild(newLi);

        var listBr = document.createElement('br')
        wishlistUL.appendChild(listBr)
      })
    })
  },

  revealWishlist: function(){
    var sidebar = document.querySelector('#sidebar');    
    if (sidebar.style.display === 'inline-block'){
      sidebar.style.display = 'none';  
    }
    else if (sidebar.style.display === 'none'){
      sidebar.style.display = 'inline-block';  
    }
  },

}

module.exports = Sidebar;