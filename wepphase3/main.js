window.onload = function () {

    var backBtn = document.getElementById("backToTopBtn");

    if (backBtn) {
        window.onscroll = function () {
            if (window.scrollY > 300) {
                backBtn.classList.add("show");
            } else {
                backBtn.classList.remove("show");
            }
        };

        backBtn.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

    var clockSpan = document.getElementById("footerClock");

    if (clockSpan) {
        function updateClock() {
            var now = new Date();
            clockSpan.innerHTML = now.toLocaleTimeString("en-SA", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    var body = document.body;
    var storedTheme = localStorage.getItem("pbTheme");

    if (storedTheme === "dark") {
        body.classList.add("theme-dark");
    }

    var themeToggleBtn = document.getElementById("themeToggle");

    if (themeToggleBtn) {

        function updateThemeButtonText() {
            if (body.classList.contains("theme-dark")) {
                themeToggleBtn.innerHTML = "Light Theme";
            } else {
                themeToggleBtn.innerHTML = "Dark Theme";
            }
        }

        updateThemeButtonText();

        themeToggleBtn.onclick = function () {
            body.classList.toggle("theme-dark");

            var isDark = body.classList.contains("theme-dark");

            if (isDark) {
                localStorage.setItem("pbTheme", "dark");
            } else {
                localStorage.setItem("pbTheme", "light");
            }

            updateThemeButtonText();
        };
    }

    var sortSelect = document.getElementById("sort");
    var cardGrid = document.getElementsByClassName("cardgrid")[0];

    if (sortSelect && cardGrid) {

        function getCardName(card) {
            var titleElement = card.getElementsByClassName("cardtitle")[0];
            if (titleElement) {
                return titleElement.innerHTML.toLowerCase();
            }
            return "";
        }

        function getCardPrice(card) {
            var priceElement = card.getElementsByClassName("price-tag")[0];
            if (!priceElement) {
                return 0;
            }

            var text = priceElement.innerHTML;
            var match = text.match(/(\d+(\.\d+)?)/);
            if (match) {
                return parseFloat(match[1]);
            }
            return 0;
        }

        function shuffleCards() {
            var cards = cardGrid.getElementsByClassName("servcard");
            var tempArray = [];
            var i, j, temp;

            for (i = 0; i < cards.length; i++) {
                tempArray.push(cards[i]);
            }

            for (i = tempArray.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = tempArray[i];
                tempArray[i] = tempArray[j];
                tempArray[j] = temp;
            }

            cardGrid.innerHTML = "";
            for (i = 0; i < tempArray.length; i++) {
                cardGrid.appendChild(tempArray[i]);
            }
        }

        function sortAndRender(criteria) {
            var cards = cardGrid.getElementsByClassName("servcard");
            var cardsArray = [];
            var i;

            for (i = 0; i < cards.length; i++) {
                cardsArray.push(cards[i]);
            }

            cardsArray.sort(function (a, b) {
                if (criteria === "name_az") {
                    var nameA = getCardName(a);
                    var nameB = getCardName(b);
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                }

                if (criteria === "name_za") {
                    var nameA2 = getCardName(a);
                    var nameB2 = getCardName(b);
                    if (nameA2 > nameB2) return -1;
                    if (nameA2 < nameB2) return 1;
                    return 0;
                }

                if (criteria === "price_low") {
                    return getCardPrice(a) - getCardPrice(b);
                }

                if (criteria === "price_high") {
                    return getCardPrice(b) - getCardPrice(a);
                }

                return 0;
            });

            cardGrid.innerHTML = "";
            for (i = 0; i < cardsArray.length; i++) {
                cardGrid.appendChild(cardsArray[i]);
            }
        }

        shuffleCards();

        sortSelect.onchange = function () {
            var selectedValue = sortSelect.value;
            sortAndRender(selectedValue);
        };
    }

};