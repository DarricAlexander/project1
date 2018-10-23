function reset() {
    $("#artistSearchedFor").text("");
    $("#topTracks").text("");
    $("#artistInfo").text("");
    $("#ticketmaster").text("");
    $("#similar-artists").text("");
    $("#ebay").text("");
}

// on click event for click button
$("#searchButton").on("click", function (event) {
    event.preventDefault();
    console.log("clicked me")
    reset();
    $(".hidden").removeClass("hidden")
    // clears out information if user searches multiple times
    var artistName = $("#userSearch").val().trim();
    $("#artistSearchedFor").append("<h1>" + artistName + "</h1>")
    console.log(artistName)
    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"

        // searches for 5 similar artist based on the artist searched
    }).then(function (similarArtist) {
        console.log(similarArtist);
        for (var s = 0; s < 5; s++) {
            console.log(similarArtist.similarartists.artist[s].name)

            var $similarArtitstButton = $("<button>")
            $similarArtitstButton.attr("data-value", similarArtist.similarartists.artist[s].name)
            $similarArtitstButton.addClass("similar-artist-button")
            $similarArtitstButton.text(similarArtist.similarartists.artist[s].name)
            $("#similar-artists").append($similarArtitstButton)
            // // appends the tracks to the to our top tracks list
            // $("#artists-similar").append("<button>" + similarArtist.similarartists.artist[s].name + "</button>")
        }

    });
    // AJAX call taking in the artist name in the search bar 
    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"

        // searches for the top 5 tracks for searched artist 
    }).then(function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
            console.log(data.toptracks.track[i].name)


            // appends the tracks to the to our top tracks list
            $("#topTracks").append("<li>" + data.toptracks.track[i].name + "</li>" + "<br>")
        }

    });
    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"
        // searches for the top 5 tracks for searched artist 

    }).then(function (data) {
        console.log(data);
        for (var j = 0; j < 1; j++) {
            console.log(data.artist.bio.summary)

            // $("#trivia").append("<li>" + response.results[i].question + "</li>")
            // appends the tracks to the to our top tracks list
            $("#artistInfo").append("<p>" + data.artist.bio.summary + "</p>")
        }

    });
    var apiKey = "1oZzmFud6RvK3DwxVSdYRHg5NHrSkxi4"

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistName + "&classificationName=music&countryCode=US&size=5&apikey=1oZzmFud6RvK3DwxVSdYRHg5NHrSkxi4"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        var events = response._embedded.events
        console.log(events)
        var imgArr = []

        for (var x = 0; x < events.length; x++) {
            var $div = $("<div>")
            $div.addClass("card")

            $div2 = $("<div>")
            $div2.addClass("card-body")


            var $p5 = $("<p>")
            $p5.addClass("card-title")
            $p5.html("Event = " + events[x].name)
            $div2.append($p5)


            var $p4 = $("<p>")
            var $img = $("<img>")


            console.log(imgArr.includes(events[x].images[0].url))
            console.log(events[x].images[0].url)
            console.log(imgArr)


            if (imgArr.includes(events[x].images[0].url)) {
                console.log("same image")

            }

            else {
                console.log("different pics")

                imgArr.push(events[x].images[0].url)
                $img.addClass("concertimg")
                $img.attr("src", events[x].images[0].url)
                $p4.append($img)
                $div.append($p4)
            }


            var $p1 = $("<p>")
            $p1.addClass("card-text")
            $p1.html("Genre = " + events[x].classifications[0].genre.name)
            
            $div2.append($p1)

            var $p2 = $("<p>")
            $p2.addClass("card-text")
            $p2.html("Date = " + events[x].dates.start.localDate)
            $div2.append($p2)

            var $p3 = $("<p>")
            $p3.addClass("card-text")
            $p3.html("Start time = " + events[x].dates.start.localTime)
            $div2.append($p3)

            var $p7 = $("<p>")
            $p7.addClass("card-text")
            $p7.html("Location = " + events[x].dates.timezone)
            $div2.append($p7)

            var $p6 = $("<a>")
            $p6.addClass("card-text")
            $p6.attr("href", events[x].url)
            $p6.html(events[x].url)
            $div2.append($p6)

            $div.append($div2)


            $("#ticketmaster").append($div)
        }

    })
    var ebayUrl = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + artistName + "&paginationInput.entriesPerPage=5&GLOBAL-ID=EBAY-US&siteid=0&SECURITY-APPNAME=FadyNagu-CWA-PRD-87f47136f-f149d6f1"


    $.ajax({
        url: ebayUrl,
        method: "GET"
    }).then(function (response) {
        var res = JSON.parse(response);
        var finalRes = res.findItemsByKeywordsResponse[0].searchResult[0].item
        console.log(finalRes)

        for (var a = 0; a < finalRes.length; a++) {

            var $div = $("<div>")
            $div.addClass("card")

            var $div2 = $("<div>")
            $div2.addClass("card-body")


            var $p1 = $("<p>")
            $p1.addClass("card-text")
            $p1.html("Item name = " + finalRes[a].title[0])
            $div2.append($p1)

            var $p2 = $("<p>")
            var $img = $("<img>")
            $img.addClass("concertimg")
            $img.attr("src", finalRes[a].galleryURL[0])
            $p2.append($img)
            $div.append($p2)



            
            var $p4 = $("<p>")
            $p4.addClass("card-text")
            $p4.html("Item Price = " + finalRes[a].sellingStatus[0].currentPrice[0].__value__ + " USD")
            $div2.append($p4)
            
            var $p3 = $("<a>")
            $p3.addClass("card-text")
            $p3.attr("href", "Item Link = " + finalRes[a].viewItemURL[0])
            $p3.html(finalRes[a].viewItemURL[0])
            $div2.append($p3)

            $div.append($div2)
            
            $("#ebay").append($div)

        }



    })
    $("#userSearch").val("");



})


$(document).on("click", ".similar-artist-button", function (event) {
    event.preventDefault();
    console.log("similar artist button clicked")
    reset();
    // clears out information if user searches multiple times
    var artistName = $(this).data("value");
    console.log(artistName)
    $("#artistSearchedFor").append("<h1>" + artistName + "</h1>")


    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"

        // searches for 5 similar artist based on the artist searched
    }).then(function (similarArtist) {
        console.log(similarArtist);
        for (var s = 0; s < 5; s++) {
            console.log(similarArtist.similarartists.artist[s].name)

            var $similarArtitstButton = $("<button>")
            $similarArtitstButton.attr("data-value", similarArtist.similarartists.artist[s].name)
            $similarArtitstButton.addClass("similar-artist-button")
            $similarArtitstButton.text(similarArtist.similarartists.artist[s].name)
            $("#similar-artists").append($similarArtitstButton)
            // // appends the tracks to the to our top tracks list
            // $("#artists-similar").append("<button>" + similarArtist.similarartists.artist[s].name + "</button>")
        }

    });
    // AJAX call taking in the artist name in the search bar 
    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"

        // searches for the top 5 tracks for searched artist 
    }).then(function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
            console.log(data.toptracks.track[i].name)


            // appends the tracks to the to our top tracks list
            $("#topTracks").append("<li>" + data.toptracks.track[i].name + "</li>" + "<br>")
        }

    });
    $.ajax({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=650a431e2e1dc51e90af7ed56bc008d8&format=json"
        // searches for the top 5 tracks for searched artist 

    }).then(function (data) {
        console.log(data);
        for (var j = 0; j < 1; j++) {
            console.log(data.artist.bio.summary)

            // $("#trivia").append("<li>" + response.results[i].question + "</li>")
            // appends the tracks to the to our top tracks list
            $("#artistInfo").append("<p>" + data.artist.bio.summary + "</p>")
        }

    });
    var apiKey = "1oZzmFud6RvK3DwxVSdYRHg5NHrSkxi4"

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistName + "&classificationName=music&countryCode=US&size=5&apikey=1oZzmFud6RvK3DwxVSdYRHg5NHrSkxi4"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        var events = response._embedded.events
        console.log(events)
        var imgArr = []

        for (var x = 0; x < events.length; x++) {

            var $div = $("<div>")
            $div.addClass("card")

            $div2 = $("<div>")
            $div2.addClass("card-body")


            var $p5 = $("<p>")
            $p5.addClass("card-title")
            $p5.html("Event = " + events[x].name)
            $div2.append($p5)


            var $p4 = $("<p>")
            var $img = $("<img>")


            console.log(imgArr.includes(events[x].images[0].url))
            console.log(events[x].images[0].url)
            console.log(imgArr)


            if (imgArr.includes(events[x].images[0].url)) {
                console.log("same image")

            }

            else {
                console.log("different pics")

                imgArr.push(events[x].images[0].url)
                $img.addClass("concertimg")
                $img.attr("src", events[x].images[0].url)
                $p4.append($img)
                $div.append($p4)
            }


            var $p1 = $("<p>")
            $p1.addClass("card-text")
            $p1.html("Genre = " + events[x].classifications[0].genre.name)
            
            $div2.append($p1)

            var $p2 = $("<p>")
            $p2.addClass("card-text")
            $p2.html("Date = " + events[x].dates.start.localDate)
            $div2.append($p2)

            var $p3 = $("<p>")
            $p3.addClass("card-text")
            $p3.html("Start time = " + events[x].dates.start.localTime)
            $div2.append($p3)

            var $p7 = $("<p>")
            $p7.addClass("card-text")
            $p7.html("Location = " + events[x].dates.timezone)
            $div2.append($p7)

            var $p6 = $("<a>")
            $p6.addClass("card-text")
            $p6.attr("href", events[x].url)
            $p6.html(events[x].url)
            $div2.append($p6)

            $div.append($div2)


            $("#ticketmaster").append($div)

        }
        var ebayUrl = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + artistName + "&paginationInput.entriesPerPage=5&GLOBAL-ID=EBAY-US&siteid=0&SECURITY-APPNAME=FadyNagu-CWA-PRD-87f47136f-f149d6f1"


        $.ajax({
            url: ebayUrl,
            method: "GET"
        }).then(function (response) {
            var res = JSON.parse(response);
            var finalRes = res.findItemsByKeywordsResponse[0].searchResult[0].item
            console.log(finalRes)

            for (var a = 0; a < finalRes.length; a++) {

                var $div = $("<div>")
                $div.addClass("card")
    
                var $div2 = $("<div>")
                $div2.addClass("card-body")
    
    
                var $p1 = $("<p>")
                $p1.addClass("card-text")
                $p1.html("Item name = " + finalRes[a].title[0])
                $div2.append($p1)
    
                var $p2 = $("<p>")
                var $img = $("<img>")
                $img.addClass("concertimg")
                $img.attr("src", finalRes[a].galleryURL[0])
                $p2.append($img)
                $div.append($p2)
    
    
    
                
                var $p4 = $("<p>")
                $p4.addClass("card-text")
                $p4.html("Item Price = " + finalRes[a].sellingStatus[0].currentPrice[0].__value__ + " USD")
                $div2.append($p4)
                
                var $p3 = $("<a>")
                $p3.addClass("card-text")
                $p3.attr("href", "Item Link = " + finalRes[a].viewItemURL[0])
                $p3.html(finalRes[a].viewItemURL[0])
                $div2.append($p3)
    
                $div.append($div2)
                
                $("#ebay").append($div)
            }



        })

    })

    $("#userSearch").val("");






});




