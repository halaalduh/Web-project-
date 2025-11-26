/***********************
   REQUEST A SERVICE PAGE
************************/

// نتحقق إذا كنا داخل صفحة request-service
var requestForm = document.querySelector(".service-form");

if (requestForm && document.getElementById("service")) {

    requestForm.onsubmit = function (e) {

        e.preventDefault();

        // قراءة البيانات
        var service = document.getElementById("service").value;
        var name = document.getElementById("name").value.trim();
        var date = document.getElementById("date").value;
        var desc = document.getElementById("desc").value.trim();

        // التحقق من التاريخ
        var today = new Date();
        var selected = new Date(date);
        var diff = (selected - today) / (1000 * 3600 * 24);

        // التحقق من اختيار الخدمة
        if (service === "service") {
            alert("Please select a service.");
            return;
        }

        // Regex للتحقق من الاسم (محاضرة RegEx)
        if (!/^[A-Za-z ]+$/.test(name) || name.split(" ").length < 2) {
            alert("Please enter a valid full name.");
            return;
        }

        // التحقق من الموعد
        if (diff < 3) {
            alert("Due date is too soon. Choose a date at least 3 days later.");
            return;
        }

        // التحقق من الوصف
        if (desc.length < 100) {
            alert("Description must be at least 100 characters.");
            return;
        }

        // مربع التأكيد (confirm)
        var stay = confirm("Your request was sent successfully! Stay here or go to dashboard?");

        if (stay) {

            // إنشاء عنصر جديد لعرض الطلب
            var list = document.createElement("div");
            list.className = "added-request";

            list.innerHTML =
                "<p><strong>Service:</strong> " + service + "</p>" +
                "<p><strong>Name:</strong> " + name + "</p>" +
                "<p><strong>Date:</strong> " + date + "</p>" +
                "<p><strong>Description:</strong> " + desc + "</p><hr>";

            document.querySelector(".dashboard-card").appendChild(list);

        } else {

            window.location.href = "customer-dashboard.html";
        }
    };
}



/***********************
    SERVICE EVALUATION PAGE
************************/

// نتحقق إذا كنا داخل صفحة evaluation
var stars = document.querySelectorAll(".stars span");

if (stars.length > 0) {

    var rating = 0;

    // حدث الضغط على النجوم
    stars.forEach(function (star, index) {
        star.onclick = function () {

            rating = index + 1;

            // تصفير الألوان
            stars.forEach(function (s) {
                s.style.color = "#ccc";
            });

            // تلوين النجوم المختارة
            for (var i = 0; i <= index; i++) {
                stars[i].style.color = "gold";
            }
        };
    });

    // حدث الإرسال
    document.querySelector(".service-form").onsubmit = function (e) {
        e.preventDefault();

        var service = document.getElementById("previous-service").value;
        var feedback = document.getElementById("feedback").value.trim();

        // التحقق من اختيار الخدمة
        if (service === "previous service") {
            alert("Please select a service.");
            return;
        }

        // التحقق من التقييم
        if (rating === 0) {
            alert("Please add a rating.");
            return;
        }

        // التحقق من النص
        if (feedback === "") {
            alert("Please enter your feedback.");
            return;
        }

        // رسائل حسب التقييم
        if (rating >= 4) {
            alert("Thank you for your positive feedback!");
        } else {
            alert("We are sorry your experience was not perfect. We will improve.");
        }

        window.location.href = "customer-dashboard.html";
    };
}

/***********************
        FAQ PAGE
************************/

// ACCORDION EFFECT FOR FAQ ITEMS
var faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {

    faqItems.forEach(function(item) {
        var question = item.querySelector("h4");
        var answer = item.querySelector("p");

        // إخفاء الجواب بالبداية
        answer.style.display = "none";

        // عند الضغط على السؤال
        question.onclick = function() {
            if (answer.style.display === "none") {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        };
    });
}

// ADD NEW QUESTION FROM FORM
var faqForm = document.querySelector(".faq-form");

if (faqForm) {

    faqForm.onsubmit = function(e) {
        e.preventDefault();

        var text = faqForm.querySelector("textarea").value.trim();

        if (text === "") {
            alert("Please write a question.");
            return;
        }

        // إنشاء عنصر جديد
        var newItem = document.createElement("div");
        newItem.className = "faq-item";

        newItem.innerHTML =
            "<h4>" + text + "</h4>" +
            "<p>Thank you! Our team will respond soon.</p>";

        // إضافة العنصر في قسم FAQ
        document.querySelector(".faq-section").appendChild(newItem);

        // تفريغ الفورم
        faqForm.querySelector("textarea").value = "";

        alert("Your question was submitted successfully!");

        // تفعيل خاصية الفتح/الإغلاق للسؤال الجديد
        var newQuestion = newItem.querySelector("h4");
        var newAnswer = newItem.querySelector("p");
        newAnswer.style.display = "none";

        newQuestion.onclick = function() {
            if (newAnswer.style.display === "none") {
                newAnswer.style.display = "block";
            } else {
                newAnswer.style.display = "none";
            }
        };
    };
}
