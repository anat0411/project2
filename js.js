function LoadAllCountriesData() {
  console.log("all countries pressed");
  $.ajax({
    url: `https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag`,
    type: "GET",
    success: function(countries) {
      console.log(countries);
      printCards(countries);
    },
    error: function(xhr) {
      console.log("Error: ", xhr);
    }
  });
}

function LoadCountriesByNameData() {
  let inputSearch = document.querySelector(".countryName").value;
  console.log(inputSearch);
  console.log("searched countries pressed");
  $.ajax({
    url: `https://restcountries.eu/rest/v2/name/${inputSearch}`,
    type: "GET",
    success: function(countries) {
      console.log(countries);
      printCards(countries);
    },
    error: function(xhr) {
      console.log("Error: ", xhr);
    }
  });
}

function buildCountryCard(newCountry) {
  let card = $("<div></div>");
  $(card).attr("class", "col-md-4 card mt-3 mb-3 ml-3 mr-3");

  let card_name = $("<h1></h1>");
  $(card_name).attr("class", "name font-weight-bold");
  card_name.html(newCountry.name);

  let card_topLevelDomain = $("<div></div>");
  card_topLevelDomain.attr("class", "topLevelDomain");
  card_topLevelDomain.html("Top Domain Level: " + newCountry.topLevelDomain);

  let card_capital = $("<div></div>");
  card_capital.attr("class", "capital");
  card_capital.html("Capital: " + newCountry.capital);

  let card_currencies = $("<div></div>");
  card_currencies.attr("class", "currencies");

  for (let i = 0; i < newCountry.currencies.length; i++) {
    card_currencies.append(
      "Currency: " +
        "Code: " +
        newCountry.currencies[i].code +
        ". Name: " +
        newCountry.currencies[i].name +
        ". Symbol: " +
        newCountry.currencies[i].symbol
    );
  }

  let card_flag = $(`<img src='${newCountry.flag}' />`);

  card.append(card_name);
  card.append(card_topLevelDomain);
  card.append(card_capital);
  card.append(card_currencies);
  card.append(card_flag);

  $(".emptyRow").append(card);
}

function printCards(cardsArray) {
  $(".emptyRow").html("");
  for (let i = 0; i < cardsArray.length; i++) {
    console.log(cardsArray[i]);
    buildCountryCard(cardsArray[i]);
  }
}
