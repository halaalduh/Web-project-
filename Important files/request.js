

// attach submit event to the form
document.querySelector(".service-form").onsubmit = function(e) {

    e.preventDefault();

    // read input values using DOM
    var service = document.getElementById("service").value;
    var name = document.getElementById("name").value.trim();
    var date = document.getElementById("date").value;
    var desc = document.getElementById("desc").value.trim();

    // date validation
    var today = new Date();
    var selected = new Date(date);
    var diff = (selected - today) / (1000 * 3600 * 24);

    // validation rules
    if (service === "service") {
        alert("Please select a service.");
        return;
    }

    // using Regular Expressions (from lecture 12)
    if (!/^[A-Za-z ]+$/.test(name) || name.split(" ").length < 2) {
        alert("Please enter a valid full name.");
        return;
    }

    if (diff < 3) {
        alert("Due date is too soon. Choose a date at least 3 days later.");
        return;
    }

    if (desc.length < 100) {
        alert("Description must be at least 100 characters.");
        return;
    }

    // confirmation dialog (from lecture 9)
    var stay = confirm("Your request was sent successfully! Stay here or go to dashboard?");

    if (stay === true) {

        // create new request section using DOM
        var list = document.createElement("div");
        list.className = "added-request";

        list.innerHTML =
            "<p><strong>Service:</strong> " + service + "</p>" +
            "<p><strong>Name:</strong> " + name + "</p>" +
            "<p><strong>Date:</strong> " + date + "</p>" +
            "<p><strong>Description:</strong> " + desc + "</p><hr>";

        document.querySelector(".dashboard-card").appendChild(list);

    } else {

        // redirect to dashboard
        window.location.href = "customer-dashboard.html";
    }
};

