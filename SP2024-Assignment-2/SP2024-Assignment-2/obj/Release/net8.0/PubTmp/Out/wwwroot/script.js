var len;

var results = '';

function search() {
    var query = document.getElementById('query').value;

    if (query.trim() === '') {
        alert("Please enter a search query.");
        return;
    }

    var params = {
        "q": query,
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "a33247904ceb4cc19de283b8aa99ddd9");
        },
        type: "GET",
    })

        .done(function (data) {
            results = ''; //Will clear the previous result
            if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                data.webPages.value.forEach(function (page) {
                    results += "<p><a href='" + page.url + "' target='_blank'>" + page.name + "</a>: " + page.snippet + "</p>";
                });
            } else {
                results = "<p>No results found.</p>";
            }

            $("#searchResults").html(results);
            $("#searchResults").dialog({
                title: "Search Results",
                position: { my: "center bottom", at: "center bottom", of: $("#target") }, //Set position for dialog box
                modal: true,
                width: 1250,
                height: 1000
            }); 
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " - " + errorThrown);
        });
    console.log(query);
}

function displayTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    //Calculation to recieve a two digit value for hours and minutes
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    var currentTime = hours + ":" + minutes;

    $('#time').text("Current time: " + currentTime);
    $('#time').dialog({
        title: "Current Time",
        modal: true,
        width: 300
    });
}

function changeBackground() {
    var body = document.querySelector("body");
    var currentBackground = body.style.backgroundImage;

    // Change background image based on the current image
    if (currentBackground.includes('./img/Ajax1.jpg')) {
        body.style.backgroundImage = "url('./img/Ajax2.jpg')";
    } else if (currentBackground.includes('./img/Ajax2.jpg')) {
        body.style.backgroundImage = "url('./img/Ajax3.jpg')";
    } else {
        body.style.backgroundImage = "url('./img/Ajax1.jpg')";
    }
}

function feelingLucky() {
    if (results === '' || results.includes("No results found.")) {
        alert("No search results available.");
        return;
    }
    // Extract the URL of the first search result
    var firstResultUrl = $(results).find("a").eq(0).attr("href");
  
    window.open(firstResultUrl, "_blank");
}