


// select all stars using DOM
var stars = document.querySelectorAll(".stars span");
var rating = 0;

// event for clicking stars
stars.forEach(function(star, index) {
    star.onclick = function() {

        // store rating value
        rating = index + 1;

        // reset colors
        stars.forEach(function(s) {
            s.style.color = "#ccc";
        });

        // color selected stars
        for (var i = 0; i <= index; i++) {
            stars[i].style.color = "gold";
        }
    };
});

// form submission event
document.querySelector(".service-form").onsubmit = function(e) {
    e.preventDefault();

    var service = document.getElementById("previous-service").value;
    var feedback = document.getElementById("feedback").value.trim();

    // validation
    if (service === "previous service") {
        alert("Please select a service.");
        return;
    }

    if (rating === 0) {
        alert("Please add a rating.");
        return;
    }

    if (feedback === "") {
        alert("Please enter your feedback.");
        return;
    }

    // output message according to rating
    if (rating >= 4) {
        alert("Thank you for your positive feedback!");
    } else {
        alert("We are sorry your experience was not perfect. We will improve.");
    }

    // redirect to dashboard
    window.location.href = "customer-dashboard.html";
};


