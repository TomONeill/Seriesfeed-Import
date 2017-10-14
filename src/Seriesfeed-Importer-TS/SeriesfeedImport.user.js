var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    class App {
        static main() {
            $(() => this.initialise());
        }
        static initialise() {
            SeriesfeedImporter.Services.StyleService.loadGlobalStyle();
            new SeriesfeedImporter.Controllers.NavigationController()
                .initialise();
            new SeriesfeedImporter.Controllers.RoutingController()
                .initialise();
        }
    }
    App.main();
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Config;
    (function (Config) {
        Config.BaseUrl = "https://www.seriesfeed.com";
        Config.Id = {
            MainContent: "mainContent",
            CardContent: "cardContent"
        };
        Config.MaxRetries = 3;
        Config.MaxAsyncCalls = 3;
    })(Config = SeriesfeedImporter.Config || (SeriesfeedImporter.Config = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class ExportController {
            constructor() {
                const card = SeriesfeedImporter.Services.CardService.getCard();
                card.setTitle("Series exporteren");
                const text = $('<p/>').append('Dit onderdeel komt binnenkort.');
                text.css({ marginBottom: '0' });
                card.setContent(text);
            }
        }
        Controllers.ExportController = ExportController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class ImportController {
            constructor() {
                this.initialise();
                const cardContent = $('#' + SeriesfeedImporter.Config.Id.CardContent);
                const text = $('<p/>').append('Wat wil je importeren?');
                cardContent.append(text);
                this.addFavourites(cardContent);
                this.addTimeWasted(cardContent);
            }
            initialise() {
                const card = SeriesfeedImporter.Services.CardService.getCard();
                card.setTitle("Series importeren");
                const breadcrumbs = [
                    new SeriesfeedImporter.Models.Breadcrumb("Soort import", SeriesfeedImporter.Enums.ShortUrl.Import)
                ];
                card.setBreadcrumbs(breadcrumbs);
            }
            addFavourites(cardContent) {
                const favourites = SeriesfeedImporter.Providers.ButtonProvider.provide(SeriesfeedImporter.Enums.ButtonType.Success, "fa-star-o", "Favorieten", SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection, "100%");
                favourites.css({ marginTop: '0px' });
                cardContent.append(favourites);
            }
            addTimeWasted(cardContent) {
                const timeWasted = SeriesfeedImporter.Providers.ButtonProvider.provide(SeriesfeedImporter.Enums.ButtonType.Success, "fa-clock-o", "Time Wasted", SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje, "100%");
                cardContent.append(timeWasted);
            }
        }
        Controllers.ImportController = ImportController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class FavouritesController {
            constructor() {
                this.initialise();
                const cardContent = $('#' + SeriesfeedImporter.Config.Id.CardContent);
                this.addBierdopje(cardContent);
                this.addImdb(cardContent);
            }
            initialise() {
                const card = SeriesfeedImporter.Services.CardService.getCard();
                card.setTitle("Favorieten importeren");
                card.setBackButtonUrl(SeriesfeedImporter.Enums.ShortUrl.Import);
                const breadcrumbs = [
                    new SeriesfeedImporter.Models.Breadcrumb("Soort import", SeriesfeedImporter.Enums.ShortUrl.Import),
                    new SeriesfeedImporter.Models.Breadcrumb("Bronkeuze", SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection)
                ];
                card.setBreadcrumbs(breadcrumbs);
            }
            addBierdopje(cardContent) {
                const bierdopje = SeriesfeedImporter.Providers.SourceProvider.provide("Bierdopje.com", "http://cdn.bierdopje.eu/g/layout/bierdopje.png", "100%", SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje, "#3399FE");
                cardContent.append(bierdopje);
            }
            addImdb(cardContent) {
                const imdb = SeriesfeedImporter.Providers.SourceProvider.provide("IMDb.com", "http://i1221.photobucket.com/albums/dd472/5xt/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE._V1__zpsrwfm9zf4.png", "40%", SeriesfeedImporter.Enums.ShortUrl.ImportImdb, "#313131");
                cardContent.append(imdb);
            }
        }
        Controllers.FavouritesController = FavouritesController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class ImportBierdopjeController {
            constructor() {
                const card = SeriesfeedImporter.Services.CardService.getCard();
                card.setTitle("Bierdopje favorieten importeren");
                card.setBackButtonUrl(SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection);
                const breadcrumbs = [
                    new SeriesfeedImporter.Models.Breadcrumb("Soort import", SeriesfeedImporter.Enums.ShortUrl.Import),
                    new SeriesfeedImporter.Models.Breadcrumb("Bronkeuze", SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection),
                    new SeriesfeedImporter.Models.Breadcrumb("Bierdopje", SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje)
                ];
                card.setBreadcrumbs(breadcrumbs);
                card.setWidth('800px');
                const formElement = $('<div/>');
                const usernameInput = $('<div/>').append('<input type="text" id="username" class="form-control" placeholder="Gebruikersnaam" />');
                const submitInput = $('<div/>').append('<input type="button" id="fav-import" class="btn btn-success btn-block" value="Favorieten Importeren" />');
                const bottomPane = $('<div/>').addClass('blog-left');
                const detailsTable = $('<table class="table table-hover responsiveTable favourites stacktable large-only" id="details">');
                const colGroup = $('<colgroup/>').append('<col width="15%"><col width="35%"><col width="50%">');
                const detailsHeader = $('<tr/>').append('<th style="padding-left: 30px;">Id</th><th>Serie</th><th>Status</th>');
                const showDetails = $('<div class="blog-content" id="details-content"><input type="button" id="show-details" class="btn btn-block" value="Details" /></div>');
                card.setContent(formElement);
                formElement.addClass('blog-left cardStyle cardForm formBlock');
                bottomPane.addClass('cardStyle');
                detailsTable.addClass('cardStyle');
                formElement.css('padding', '10px');
                formElement.append(usernameInput);
                formElement.append(submitInput);
                detailsTable.append(colGroup);
                detailsTable.append(detailsHeader);
                bottomPane.append(showDetails);
                showDetails.append(detailsTable);
                SeriesfeedImporter.Services.BierdopjeService.getUsername()
                    .then((username) => $('#username').attr('value', username));
                $("#fav-import").click((event) => {
                    const favImportBtn = $(event.currentTarget);
                    const outerProgress = $('<div/>').addClass('progress');
                    const progressBar = $('<div/>').addClass('progress-bar progress-bar-striped active');
                    favImportBtn.prop('disabled', true).attr('value', "Bezig met importeren...");
                    outerProgress.append(progressBar);
                    formElement.append(outerProgress);
                    formElement.after(bottomPane);
                    const username = $('#username').val();
                    const favourites = $('#details');
                    $("#show-details").click(() => detailsTable.toggle());
                    SeriesfeedImporter.Services.BierdopjeService.getFavouritesByUsername(username)
                        .then((bdFavouriteLinks) => {
                        const bdFavouritesLength = bdFavouriteLinks.length;
                        var MAX_RETRIES = SeriesfeedImporter.Config.MaxRetries;
                        function getBierdopjeFavourite(index) {
                            return new Promise((resolve) => {
                                const bdShowName = $(bdFavouriteLinks[index]).text();
                                const bdShowSlug = $(bdFavouriteLinks[index]).attr('href');
                                const bdShowUrl = 'http://www.bierdopje.com';
                                SeriesfeedImporter.Services.BierdopjeService.getTvdbIdByShowSlug(bdShowSlug)
                                    .then((tvdbId) => {
                                    SeriesfeedImporter.Services.SeriesfeedService.getShowIdByTvdbId(tvdbId)
                                        .then((sfShowData) => {
                                        let sfSeriesId = sfShowData.id;
                                        let sfSeriesName = sfShowData.name;
                                        const sfSeriesSlug = sfShowData.slug;
                                        const sfSeriesUrl = 'https://www.seriesfeed.com/series/';
                                        const MAX_RETRIES = SeriesfeedImporter.Config.MaxRetries;
                                        let current_retries = 0;
                                        function addFavouriteByShowId(sfSeriesId) {
                                            SeriesfeedImporter.Services.SeriesfeedService.addFavouriteByShowId(sfSeriesId)
                                                .then((result) => {
                                                const resultStatus = result.status;
                                                let item = "<tr></tr>";
                                                let status = "-";
                                                let showUrl = sfSeriesUrl + sfSeriesSlug;
                                                if (sfSeriesId === -1) {
                                                    sfSeriesId = "Onbekend";
                                                }
                                                if (!sfSeriesName) {
                                                    showUrl = bdShowUrl + bdShowSlug;
                                                    sfSeriesName = bdShowName;
                                                }
                                                if (resultStatus === "success") {
                                                    status = "Toegevoegd als favoriet.";
                                                    item = '<tr><td>' + sfSeriesId + '</td><td><a href="' + showUrl + '" target="_blank">' + sfSeriesName + '</a></td><td>' + status + '</td></tr>';
                                                }
                                                else if (resultStatus === "failed" && sfSeriesId === "Onbekend") {
                                                    status = '<a href="' + sfSeriesUrl + 'voorstellen/" target="_blank">Deze serie staat nog niet op Seriesfeed.</a>';
                                                    item = '<tr class="row-warning"><td>' + sfSeriesId + '</td><td><a href="' + showUrl + '" target="_blank">' + sfSeriesName + '</a></td><td>' + status + '</td></tr>';
                                                }
                                                else {
                                                    status = "Deze serie is al een favoriet.";
                                                    item = '<tr class="row-info"><td>' + sfSeriesId + '</td><td><a href="' + showUrl + '" target="_blank">' + sfSeriesName + '</a></td><td>' + status + '</td></tr>';
                                                }
                                                favourites.append(item);
                                                const progress = (index / bdFavouritesLength) * 100;
                                                progressBar.css('width', Math.round(progress) + "%");
                                                resolve();
                                            })
                                                .catch(() => {
                                                console.log(`Retrying to favourite ${sfSeriesName} (${sfSeriesId}). ${current_retries + 1}/${MAX_RETRIES})`);
                                                current_retries++;
                                                if (current_retries === MAX_RETRIES) {
                                                    const status = "Kon deze serie niet als favoriet instellen.";
                                                    const item = '<tr class="row-error"><td>' + sfSeriesId + '</td><td><a href="' + sfSeriesUrl + sfSeriesSlug + '" target="_blank">' + sfSeriesName + '</a></td><td>' + status + '</td></tr>';
                                                    favourites.append(item);
                                                    const progress = (index / bdFavouritesLength) * 100;
                                                    progressBar.css('width', Math.round(progress) + "%");
                                                    resolve();
                                                }
                                                else {
                                                    addFavouriteByShowId(index);
                                                    resolve();
                                                }
                                            });
                                        }
                                        addFavouriteByShowId(sfSeriesId);
                                    }).catch(() => {
                                        const status = 'Het id kan niet van Seriesfeed worden opgehaald.</a>';
                                        const item = '<tr class="row-error"><td>Onbekend</td><td><a href="' + bdShowUrl + bdShowSlug + '" target="_blank">' + bdShowName + '</a></td><td>' + status + '</td></tr>';
                                        favourites.append(item);
                                        const progress = (index / bdFavouritesLength) * 100;
                                        progressBar.css('width', Math.round(progress) + "%");
                                        resolve();
                                    });
                                }).catch((error) => {
                                    const status = 'Deze serie kan niet gevonden worden op Bierdopje.';
                                    const item = '<tr class="row-error"><td>Onbekend</td><td><a href="' + bdShowUrl + bdShowSlug + '" target="_blank">' + bdShowName + '</a></td><td>' + status + '</td></tr>';
                                    favourites.append(item);
                                    const progress = (index / bdFavouritesLength) * 100;
                                    progressBar.css('width', Math.round(progress) + "%");
                                    resolve();
                                });
                            });
                        }
                        var MAX_ASYNC_CALLS = SeriesfeedImporter.Config.MaxAsyncCalls;
                        let current_async_calls = 0;
                        Promise.resolve(1)
                            .then(function loop(i) {
                            if (current_async_calls < MAX_ASYNC_CALLS) {
                                if (i < bdFavouritesLength) {
                                    current_async_calls += 1;
                                    getBierdopjeFavourite(i)
                                        .then(() => current_async_calls -= 1);
                                    return loop(i + 1);
                                }
                            }
                            else {
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve(loop(i));
                                    }, 80);
                                });
                            }
                        })
                            .then(() => {
                            function checkActiveCalls() {
                                if (current_async_calls === 0) {
                                    favImportBtn.prop('disabled', false);
                                    favImportBtn.attr('value', "Favorieten Importeren");
                                    outerProgress.removeClass('progress');
                                    progressBar.replaceWith("Importeren voltooid.");
                                }
                                else {
                                    setTimeout(checkActiveCalls, 80);
                                }
                            }
                            checkActiveCalls();
                        }).catch((error) => {
                            throw `Unknown error: ${error}`;
                        });
                    });
                });
            }
        }
        Controllers.ImportBierdopjeController = ImportBierdopjeController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class BierdopjeService {
            static getUsername() {
                return Services.AjaxService.get("http://www.bierdopje.com/stats")
                    .then((statsPageData) => {
                    const statsData = $(statsPageData.responseText);
                    return statsData.find("#userbox_loggedin").find("h4").html();
                })
                    .catch((error) => {
                    throw `Could not get username from Bierdopje.com: ${error}`;
                });
            }
            static getFavouritesByUsername(username) {
                const url = "http://www.bierdopje.com/users/" + username + "/shows";
                return Services.AjaxService.get(url)
                    .then((pageData) => {
                    const data = $(pageData.responseText);
                    return data.find(".content").find("ul").find("li").find("a");
                })
                    .catch((error) => {
                    window.alert(`Kan geen favorieten vinden voor ${username}. Dit kan komen doordat de gebruiker niet bestaat, geen favorieten heeft of er is iets mis met je verbinding.`);
                    throw `Could not get favourites from Bierdopje.com: ${error}`;
                });
            }
            static getTvdbIdByShowSlug(showSlug) {
                const url = "http://www.bierdopje.com" + showSlug;
                return Services.AjaxService.get(url)
                    .then((pageData) => {
                    const favouriteData = $(pageData.responseText);
                    return favouriteData.find("a[href^='http://www.thetvdb.com']").html();
                })
                    .catch((error) => {
                    throw `Could not get the TVDB of ${showSlug} from Bierdopje.com: ${error}`;
                });
            }
        }
        Services.BierdopjeService = BierdopjeService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class ImportImdbController {
            constructor() {
                this._selectedLists = [];
                this._selectedSeries = [];
                this.initialise();
            }
            initialise() {
                const mainContent = $('#' + SeriesfeedImporter.Config.Id.MainContent);
                const col = $('<div/>').addClass("col-md-12");
                mainContent.append(col);
                const head = $('<h1/>');
                col.append(head);
                const cardHolder = $('<div/>').addClass("col-md-6");
                col.append(cardHolder);
                const card = $('<div/>').addClass("blog-left cardStyle cardTable");
                cardHolder.append(card);
                this.content = $('<div/>').addClass("blog-content");
                card.append(this.content);
                this.stepTitle = $('<h3/>');
                this.content.append(this.stepTitle);
                this.stepContent = $('<p/>');
                this.content.append(this.stepContent);
                cardHolder.css({
                    margin: '0 auto',
                    float: 'none'
                });
                this.content.css({
                    minHeight: '425px'
                });
                var steps = this.stepFactory(4);
                var importLink = $('<a/>').attr("href", "/series/import/");
                var imdbLink = $('<a/>').attr("href", "http://www.imdb.com/").attr("target", "_blank");
                importLink.append("Favorieten importeren");
                imdbLink.append("IMDb.com");
                head.append(importLink);
                head.append(" - ");
                head.append(imdbLink);
                col.html(head);
                head.after(steps);
                col.after(cardHolder);
                cardHolder.html(card);
                card.html(this.content);
                this.stepOne();
            }
            stepOne() {
                this.selectStep(1);
                var titleCardText = 'Account verifiëren';
                var innerCardText = 'Om je favorieten succesvol te importeren dien je te verifiëren '
                    + 'of het onderstaande account waarop je nu bent ingelogd op '
                    + '<a href="http://www.imdb.com/">www.imdb.com</a> het '
                    + 'account is waarvan je wilt importeren.';
                var userProfile = this.userFactory("Laden...", "http://i1221.photobucket.com/albums/dd472/5xt/MV5BMjI2NDEyMjYyMF5BMl5BanBnXkFtZTcwMzM3MDk0OQ._SY100_SX100__zpshzfut2yd.jpg");
                this.stepTitle.html(titleCardText);
                this.stepContent.html(innerCardText);
                this.content.html(this.stepTitle);
                this.stepTitle.after(this.stepContent);
                this.stepContent.after(userProfile);
                SeriesfeedImporter.Services.ImdbService.getUser()
                    .then((user) => {
                    this._userId = user.id;
                    this._username = user.username;
                    SeriesfeedImporter.Services.ImdbService.getAvatarUrlByUserId(this._userId)
                        .then((avatarUrl) => {
                        const login = '<a href="http://www.imdb.com/" target="_blank">Inloggen</a>';
                        if (!avatarUrl) {
                            avatarUrl = 'http://i1221.photobucket.com/albums/dd472/5xt/MV5BMjI2NDEyMjYyMF5BMl5BanBnXkFtZTcwMzM3MDk0OQ._SY100_SX100__zpshzfut2yd.jpg';
                        }
                        if (!this._username) {
                            this._username = login;
                        }
                        const profile = this.userFactory(this._username, avatarUrl);
                        userProfile.html(profile);
                        if (userProfile.find(".user-name").html() !== login) {
                            const nextStep = this.nextStepFactory("Doorgaan", "step-2");
                            userProfile.after(nextStep);
                            $("#step-2").on('click', () => this.stepTwo());
                        }
                    })
                        .catch((error) => {
                        throw `Could not connect to IMDb to get the avatar of ${this._username}.`;
                    });
                })
                    .catch((error) => {
                    throw `Could not connect to IMDb to get the current username.`;
                });
            }
            stepTwo() {
                this.selectStep(2);
                var titleCardText = 'Lijsten selecteren';
                var innerCardText = 'Vink de lijsten aan met series die je als favoriet wilt toevoegen.';
                this.stepTitle.html(titleCardText);
                this.stepContent.html(innerCardText);
                this.content.html(this.stepTitle);
                var listsTable = $('<table class="table table-hover responsiveTable favourites stacktable large-only" style="margin-bottom: 20px;" id="lists"><tbody>');
                var checkboxAll = $('<fieldset><input type="checkbox" name="select-all" id="select-all" class="hideCheckbox"><label for="select-all"><span class="check"></span></label></fieldset>');
                var tableHeader = $('<tr><th style="padding-left: 30px;">' + checkboxAll[0].outerHTML + '</th><th>Lijst</th></tr>');
                var loadingData = $('<div><h4 style="margin-bottom: 15px;">Lijsten ophalen...</h4></div>');
                this.stepTitle.html(titleCardText);
                this.stepContent.html(innerCardText);
                this.content.html(this.stepTitle);
                this.stepTitle.after(this.stepContent);
                this.stepContent.after(loadingData);
                listsTable.append(tableHeader);
                SeriesfeedImporter.Services.ImdbService.getListsById(this._userId)
                    .then((lists) => {
                    lists.each((index, list) => {
                        const listId = $(list).attr("id");
                        const listName = $(list).find(".name a").html();
                        const listUrl = "http://www.imdb.com" + $(list).find(".name a").attr("href");
                        const checkbox = '<fieldset><input type="checkbox" name="list_' + listId + '" id="list_' + listId + '" class="hideCheckbox"><label for="list_' + listId + '" class="checkbox-label"><span class="check" data-list-id="' + listId + '" data-list-name="' + listName + '" data-list-url="' + listUrl + '"></span></label></fieldset>';
                        const item = '<tr><td>' + checkbox + '</td><td><a href="' + listUrl + '" target="_blank">' + listName + '</a></td></tr>';
                        tableHeader.after(item);
                    });
                    loadingData.html(listsTable);
                    const nextStep = this.nextStepFactory("Doorgaan", "step-3");
                    nextStep.hide();
                    listsTable.append(nextStep);
                    $('#select-all').on('click', () => this.toggleAllCheckboxes());
                    $('.checkbox-label').on('click', (event) => {
                        const checkbox = $(event.currentTarget).find(".check");
                        if (!checkbox.hasClass("checked")) {
                            const listItem = {
                                id: checkbox.data("list-id"),
                                name: checkbox.data("list-name"),
                                url: checkbox.data("list-url")
                            };
                            this._selectedLists.push(listItem);
                            checkbox.addClass("checked");
                        }
                        else {
                            const pos = this._selectedLists.map((list) => list.id).indexOf(checkbox.data("list-id"));
                            this._selectedLists.splice(pos, 1);
                            checkbox.removeClass("checked");
                        }
                        if (this._selectedLists.length > 0) {
                            nextStep.show();
                        }
                        else {
                            nextStep.hide();
                        }
                    });
                    $("#step-3").on('click', () => this.stepThree());
                });
            }
            stepThree() {
                this.selectStep(3);
                const titleCardText = 'Series selecteren';
                const innerCardText = 'Vink de series aan die je als favoriet wilt toevoegen.';
                this.stepTitle.html(titleCardText);
                this.stepContent.html(innerCardText);
                this.content.html(this.stepTitle);
                const listsTable = $('<table class="table table-hover responsiveTable favourites stacktable large-only" style="margin-bottom: 20px;" id="lists"><tbody>');
                const checkboxAll = $('<fieldset><input type="checkbox" name="select-all" id="select-all" class="hideCheckbox"><label for="select-all"><span class="check"></span></label></fieldset>');
                const tableHeader = $('<tr><th style="padding-left: 30px;">' + checkboxAll[0].outerHTML + '</th><th>Serie</th><th>Type</th><th>Lijst</th></tr>');
                const loadingData = $('<div><h4 style="margin-bottom: 15px;">Series ophalen...</h4></div>');
                this.stepTitle.html(titleCardText);
                this.stepContent.html(innerCardText);
                this.content.html(this.stepTitle);
                this.stepTitle.after(this.stepContent);
                this.stepContent.after(loadingData);
                listsTable.append(tableHeader);
                const outerProgress = $('<div class="progress"></div>');
                const progressBar = $('<div class="progress-bar progress-bar-striped active"></div>');
                outerProgress.css({
                    'width': '100%',
                    'margin-top': '10px',
                    'margin-bottom': '0px'
                });
                outerProgress.append(progressBar);
                loadingData.append(outerProgress);
                $(this._selectedLists).each((i, list) => {
                    SeriesfeedImporter.Services.ImdbService.getSeriesByListUrl(list.url)
                        .then((series) => {
                        $(series).each((index, seriesItem) => {
                            const seriesName = seriesItem.name;
                            const seriesUrl = seriesItem.url;
                            const seriesType = seriesItem.type;
                            const listName = list.name;
                            const listUrl = list.url;
                            const checkbox = '<fieldset><input type="checkbox" name="series_' + index + '" id="series_' + index + '" class="hideCheckbox"><label for="series_' + index + '" class="checkbox-label"><span class="check" data-series-id="' + index + '" data-series-name="' + seriesName + '" data-series-url="' + seriesUrl + '" data-list-name="' + listName + '" data-list-url="' + listUrl + '"></span></label></fieldset>';
                            const item = '<tr><td>' + checkbox + '</td><td><a href="' + seriesUrl + '" target="_blank">' + seriesName + '</a></td><td>' + seriesType + '</td><td><a href="' + listUrl + '" target="_blank">' + listName + '</a></td></tr>';
                            tableHeader.after(item);
                            const progress = (index / (this._selectedLists.length - 1)) * 100;
                            progressBar.css('width', Math.round(progress) + "%");
                        });
                        loadingData.html(listsTable);
                        const nextStep = this.nextStepFactory("Importeren", "step-4");
                        nextStep.hide();
                        listsTable.append(nextStep);
                        $('#select-all').on('click', () => this.toggleAllCheckboxes());
                        $('.checkbox-label').on('click', (event) => {
                            const checkbox = $(event.currentTarget).find(".check");
                            if (!checkbox.hasClass("checked")) {
                                const seriesItem = {
                                    id: checkbox.data("series-id"),
                                    name: checkbox.data("series-name"),
                                    url: checkbox.data("series-url")
                                };
                                this._selectedSeries.push(seriesItem);
                                checkbox.addClass("checked");
                            }
                            else {
                                const pos = this._selectedSeries.map((list) => list.id).indexOf(checkbox.data("series-id"));
                                this._selectedSeries.splice(pos, 1);
                                checkbox.removeClass("checked");
                            }
                            if (this._selectedSeries.length > 0) {
                                nextStep.show();
                            }
                            else {
                                nextStep.hide();
                            }
                        });
                        $("#step-4").on('click', () => this.stepFour());
                    });
                });
            }
            stepFour() {
                this.selectStep(4);
                console.log(this._selectedSeries);
            }
            stepFactory(steps) {
                const stepList = $('<div></div>');
                stepList.addClass("import-steps");
                for (let i = 1; i <= steps; i++) {
                    const div = $('<div></div>');
                    const a = $('<a></a>');
                    const h3 = $('<h3></h3>');
                    div.addClass("import-step");
                    div.css({
                        'text-align': 'center',
                        'display': 'inline-block',
                        'width': '175px',
                        'padding': '10px',
                        'margin': '15px'
                    });
                    a.css({
                        'text-align': 'center',
                        'text-decoration': 'none'
                    });
                    div.append(a);
                    a.append(h3);
                    h3.append("Stap " + i);
                    stepList.append(div);
                }
                return stepList;
            }
            selectStep(step) {
                $(".import-step").each((i, currentInScope) => {
                    const selected = "import-selected";
                    const current = $(currentInScope);
                    if (current.hasClass(selected)) {
                        current.removeClass(selected);
                    }
                    if ((i + 1) === step) {
                        current.addClass(selected);
                    }
                });
            }
            nextStepFactory(text, id) {
                const a = $('<a></a>');
                a.addClass("readMore");
                a.attr('id', id);
                a.css({
                    'position': 'absolute',
                    'bottom': '20px',
                    'right': '40px',
                    'cursor': 'pointer'
                });
                a.append(text);
                return a;
            }
            userFactory(user, avatarUrl) {
                const div = $('<div></div>');
                const img = $('<img></img>');
                const h3 = $('<h3></h3>');
                div.addClass("col-md-12 user-img-container");
                img.addClass("user-img");
                h3.addClass("user-name");
                img.attr('src', avatarUrl);
                h3.append(user);
                div.append(img);
                div.append(h3);
                return div;
            }
            toggleAllCheckboxes() {
                $('.check').each((i, checkbox) => {
                    $(checkbox).click();
                });
            }
        }
        Controllers.ImportImdbController = ImportImdbController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class ImdbService {
            static getUser() {
                return Services.AjaxService.get("http://www.imdb.com/helpdesk/contact")
                    .then((pageData) => {
                    const data = $(pageData.responseText);
                    return {
                        id: data.find('#navUserMenu p a').attr('href').split('/')[4],
                        username: data.find('#navUserMenu p a').html().trim()
                    };
                });
            }
            static getAvatarUrlByUserId(userId) {
                const url = "http://www.imdb.com/user/" + userId + "/";
                return Services.AjaxService.get(url)
                    .then((pageData) => {
                    const data = $(pageData.responseText);
                    return data.find('#avatar').attr('src');
                });
            }
            static getListsById(userId) {
                const url = "http://www.imdb.com/user/" + userId + "/lists";
                return Services.AjaxService.get(url)
                    .then((pageData) => {
                    const data = $(pageData.responseText);
                    return data.find('table.lists tr.row');
                });
            }
            static getSeriesByListUrl(listUrl) {
                const url = listUrl + "?view=compact";
                return Services.AjaxService.get(url)
                    .then((pageData) => {
                    const data = $(pageData.responseText);
                    const seriesItems = data.find(".list_item:not(:first-child)");
                    const seriesList = [];
                    seriesItems.each((index, seriesItem) => {
                        var series = {
                            name: $(seriesItem).find(".title a").html(),
                            url: "http://www.imdb.com" + $(seriesItem).find(".title a").attr("href"),
                            type: $(seriesItem).find(".title_type").html()
                        };
                        if (series.type !== "Feature") {
                            seriesList.push(series);
                        }
                    });
                    return seriesList.sort((a, b) => b.name.localeCompare(a.name));
                });
            }
        }
        Services.ImdbService = ImdbService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class SeriesfeedService {
            static getShowIdByTvdbId(tvdbId) {
                const postData = {
                    type: 'tvdb_id',
                    data: tvdbId
                };
                return Services.AjaxService.post("/ajax/serie/find-by", postData)
                    .catch((error) => {
                    throw `Could not convert TVDB id ${tvdbId} on Seriesfeed.com: ${error}`;
                });
            }
            static addFavouriteByShowId(showId) {
                const postData = {
                    series: showId,
                    type: 'favourite',
                    selected: '0'
                };
                return Services.AjaxService.post("/ajax/serie/favourite", postData);
            }
        }
        Services.SeriesfeedService = SeriesfeedService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class NavigationController {
            initialise() {
                SeriesfeedImporter.Services.NavigationService.add(SeriesfeedImporter.Enums.NavigationType.Series, 5, "Importeren", SeriesfeedImporter.Enums.ShortUrl.Import);
                SeriesfeedImporter.Services.NavigationService.add(SeriesfeedImporter.Enums.NavigationType.Series, 6, "Exporteren", SeriesfeedImporter.Enums.ShortUrl.Export);
            }
        }
        Controllers.NavigationController = NavigationController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class NavigationService {
            static add(navigationType, position, text, url) {
                const mainMenuItem = $("ul.main-menu .submenu .inner .top-level:eq(" + navigationType + ")");
                mainMenuItem.find(".main-menu-dropdown li:eq(" + position + ")").before("<li><a href='" + url + "'>" + text + "</a></li>");
            }
        }
        Services.NavigationService = NavigationService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Controllers;
    (function (Controllers) {
        class RoutingController {
            initialise() {
                this.initialVisitRouting();
                this.respondToBrowserNavigationChanges();
            }
            initialVisitRouting() {
                switch (window.location.href) {
                    case SeriesfeedImporter.Config.BaseUrl + SeriesfeedImporter.Enums.ShortUrl.Import:
                        this.initialiseInitialVisit(SeriesfeedImporter.Enums.ShortUrl.Import);
                        SeriesfeedImporter.Services.RouterService.import();
                        break;
                    case SeriesfeedImporter.Config.BaseUrl + SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection:
                        this.initialiseInitialVisit(SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection);
                        SeriesfeedImporter.Services.RouterService.importSourceSelection();
                        break;
                    case SeriesfeedImporter.Config.BaseUrl + SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje:
                        this.initialiseInitialVisit(SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje);
                        SeriesfeedImporter.Services.RouterService.importBierdopje();
                        break;
                    case SeriesfeedImporter.Config.BaseUrl + SeriesfeedImporter.Enums.ShortUrl.ImportImdb:
                        this.initialiseInitialVisit(SeriesfeedImporter.Enums.ShortUrl.ImportImdb);
                        SeriesfeedImporter.Services.RouterService.importImdb();
                        break;
                    case SeriesfeedImporter.Config.BaseUrl + SeriesfeedImporter.Enums.ShortUrl.Export:
                        this.initialiseInitialVisit(SeriesfeedImporter.Enums.ShortUrl.Export);
                        SeriesfeedImporter.Services.RouterService.export();
                        break;
                }
            }
            initialiseInitialVisit(url) {
                window.history.replaceState({ "shortUrl": url }, "", url);
                const mainContent = this.fixPageLayoutAndGetMainContent();
                const card = SeriesfeedImporter.Services.CardService.initialise();
                mainContent.append(card.instance);
            }
            fixPageLayoutAndGetMainContent() {
                const wrapper = $('.contentWrapper .container').last().empty();
                wrapper.removeClass('container').addClass('wrapper bg');
                const container = $('<div></div>').addClass('container').attr('id', SeriesfeedImporter.Config.Id.MainContent);
                wrapper.append(container);
                return container;
            }
            respondToBrowserNavigationChanges() {
                window.onpopstate = (event) => {
                    if (event.state == null) {
                        return;
                    }
                    switch (event.state.shortUrl) {
                        case SeriesfeedImporter.Enums.ShortUrl.Import:
                            SeriesfeedImporter.Services.RouterService.import();
                            break;
                        case SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection:
                            SeriesfeedImporter.Services.RouterService.importSourceSelection();
                            break;
                        case SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje:
                            SeriesfeedImporter.Services.RouterService.importBierdopje();
                            break;
                        case SeriesfeedImporter.Enums.ShortUrl.ImportImdb:
                            SeriesfeedImporter.Services.RouterService.importImdb();
                            break;
                        case SeriesfeedImporter.Enums.ShortUrl.Export:
                            SeriesfeedImporter.Services.RouterService.export();
                            break;
                    }
                };
            }
        }
        Controllers.RoutingController = RoutingController;
    })(Controllers = SeriesfeedImporter.Controllers || (SeriesfeedImporter.Controllers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class RouterService {
            static navigate(url) {
                switch (url) {
                    case SeriesfeedImporter.Enums.ShortUrl.Import:
                        this.import();
                        break;
                    case SeriesfeedImporter.Enums.ShortUrl.ImportSourceSelection:
                        this.importSourceSelection();
                        break;
                    case SeriesfeedImporter.Enums.ShortUrl.ImportBierdopje:
                        this.importBierdopje();
                        break;
                    case SeriesfeedImporter.Enums.ShortUrl.ImportImdb:
                        this.importImdb();
                        break;
                    case SeriesfeedImporter.Enums.ShortUrl.Export:
                        this.export();
                        break;
                }
                window.scrollTo(0, 0);
                window.history.pushState({ "shortUrl": url }, "", url);
            }
            static import() {
                document.title = "Series importeren | Seriesfeed";
                Services.CardService.getCard().clear();
                new SeriesfeedImporter.Controllers.ImportController();
            }
            static importSourceSelection() {
                document.title = "Bronkeuze | Favoriete series importeren | Seriesfeed";
                Services.CardService.getCard().clear();
                new SeriesfeedImporter.Controllers.FavouritesController();
            }
            static importBierdopje() {
                document.title = "Bierdopje favorieten importeren | Seriesfeed";
                Services.CardService.getCard().clear();
                new SeriesfeedImporter.Controllers.ImportBierdopjeController();
            }
            static importImdb() {
                document.title = "IMDb series importeren | Seriesfeed";
                Services.CardService.getCard().clear();
                new SeriesfeedImporter.Controllers.ImportImdbController();
            }
            static export() {
                document.title = "Series exporteren | Seriesfeed";
                Services.CardService.getCard().clear();
                new SeriesfeedImporter.Controllers.ExportController();
            }
        }
        Services.RouterService = RouterService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Enums;
    (function (Enums) {
        Enums.ButtonType = {
            Default: "btn-default",
            Primary: "btn-primary",
            Success: "btn-success",
            Info: "btn-info",
            Warning: "btn-warning",
            Danger: "btn-danger",
            Link: "btn-link"
        };
    })(Enums = SeriesfeedImporter.Enums || (SeriesfeedImporter.Enums = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Enums;
    (function (Enums) {
        let NavigationType;
        (function (NavigationType) {
            NavigationType[NavigationType["Series"] = 0] = "Series";
            NavigationType[NavigationType["Fora"] = 1] = "Fora";
            NavigationType[NavigationType["Nieuws"] = 2] = "Nieuws";
            NavigationType[NavigationType["Community"] = 3] = "Community";
        })(NavigationType = Enums.NavigationType || (Enums.NavigationType = {}));
    })(Enums = SeriesfeedImporter.Enums || (SeriesfeedImporter.Enums = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Enums;
    (function (Enums) {
        Enums.ShortUrl = {
            Import: "/series/import/",
            ImportSourceSelection: "/series/import/source/",
            ImportBierdopje: "/series/import/source/bierdopje/",
            ImportImdb: "/series/import/source/imdb/",
            Export: "/series/export/"
        };
    })(Enums = SeriesfeedImporter.Enums || (SeriesfeedImporter.Enums = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Models;
    (function (Models) {
        class Breadcrumb {
            constructor(text, shortUrl) {
                this.text = text;
                this.shortUrl = shortUrl;
            }
        }
        Models.Breadcrumb = Breadcrumb;
    })(Models = SeriesfeedImporter.Models || (SeriesfeedImporter.Models = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Models;
    (function (Models) {
        class Card {
            constructor() {
                this.instance = $('<div/>').addClass("cardStyle cardForm formBlock").css({ transition: 'max-width .3s ease-in-out' });
                this.backButton = this.createBackButton();
                const titleContainer = $('<h2/>').css({ height: '60px' });
                this.title = $('<span/>');
                this.breadcrumbs = this.createBreadcrumbs();
                this.content = $('<div/>').attr('id', SeriesfeedImporter.Config.Id.CardContent).addClass("cardFormInner");
                this.instance.append(titleContainer);
                titleContainer.append(this.title);
                titleContainer.append(this.backButton);
                this.instance.append(this.breadcrumbs);
                this.instance.append(this.content);
            }
            createBackButton() {
                return $('<i/>').css({
                    display: 'none',
                    float: 'left',
                    padding: '5px',
                    margin: '-5px',
                    cursor: 'pointer'
                }).addClass("fa fa-arrow-left");
            }
            createBreadcrumbs() {
                const breadcrumbs = $('<h2/>').css({
                    display: 'none',
                    fontSize: '12px',
                    padding: '10px 15px',
                    background: '#5f7192',
                    borderRadius: '0 0 0 0',
                    mozBorderRadius: '0 0 0 0',
                    webkitBorderRadius: '0 0 0 0'
                });
                return breadcrumbs;
            }
            setBackButtonUrl(url) {
                if (url == null) {
                    this.backButton.hide();
                    this.backButton.click(() => { });
                    return;
                }
                this.backButton.show();
                this.backButton.click(() => SeriesfeedImporter.Services.RouterService.navigate(url));
            }
            setTitle(title) {
                if (title == null) {
                    title = '';
                }
                this.title.text(title);
            }
            setBreadcrumbs(breadcrumbs) {
                if (breadcrumbs == null || breadcrumbs.length === 0) {
                    this.breadcrumbs.hide();
                    this.breadcrumbs.empty();
                    return;
                }
                for (let i = 0; i < breadcrumbs.length; i++) {
                    const breadcrumb = breadcrumbs[i];
                    const link = $('<span/>')
                        .css({ cursor: 'pointer', color: '#bfc6d2' })
                        .text(breadcrumb.text)
                        .click(() => SeriesfeedImporter.Services.RouterService.navigate(breadcrumb.shortUrl));
                    this.breadcrumbs.append(link);
                    if (i < breadcrumbs.length - 1) {
                        const chevronRight = $('<i/>')
                            .addClass('fa fa-chevron-right')
                            .css({
                            fontSize: '9px',
                            padding: '0 5px',
                            cursor: 'default'
                        });
                        this.breadcrumbs.append(chevronRight);
                    }
                    else {
                        link.css({ color: '#ffffff' });
                    }
                }
                this.breadcrumbs.show();
            }
            setContent(content) {
                if (content == null) {
                    this.content.empty();
                    return;
                }
                this.content.append(content);
            }
            clear() {
                this.setTitle(null);
                this.setBackButtonUrl(null);
                this.setBreadcrumbs(null);
                this.setContent(null);
                this.setWidth();
            }
            setWidth(width) {
                this.instance.css({
                    maxWidth: width != null ? width : '400px'
                });
            }
        }
        Models.Card = Card;
    })(Models = SeriesfeedImporter.Models || (SeriesfeedImporter.Models = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Providers;
    (function (Providers) {
        class ButtonProvider {
            static provide(buttonType, iconClass, text, url, width) {
                const button = $('<div/>').addClass(`btn ${buttonType}`).click(() => SeriesfeedImporter.Services.RouterService.navigate(url));
                const icon = $('<i/>').addClass(`fa ${iconClass}`);
                button.css({
                    width: width == null ? 'auto' : width
                });
                button.append(icon);
                button.append(text);
                return button;
            }
        }
        Providers.ButtonProvider = ButtonProvider;
    })(Providers = SeriesfeedImporter.Providers || (SeriesfeedImporter.Providers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Providers;
    (function (Providers) {
        class SourceProvider {
            static provide(name, image, imageSize, url, colour) {
                const portfolio = $('<div/>').addClass("portfolio mix_all");
                const wrapper = $('<div/>').addClass("portfolio-wrapper cardStyle");
                const hover = $('<div/>').addClass("portfolio-hover").css({ height: '100px' });
                const img = $('<img/>');
                const info = $('<div/>').addClass("portfolio-info");
                const title = $('<div/>').addClass("portfolio-title");
                const h4 = $('<h4/>').text(name);
                portfolio
                    .css({
                    display: 'inline-block',
                    width: '100%',
                    transition: 'all .24s ease-in-out'
                })
                    .hover(() => portfolio.css({
                    webkitBoxShadow: '0px 4px 3px 0px rgba(0, 0, 0, 0.15)',
                    boxShadow: '0px 4px 3px 0px rgba(0, 0, 0, 0.15)'
                }), () => portfolio.css({
                    webkitBoxShadow: '0 0 0 0 rgba(0, 0, 0, 0.0)',
                    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.0)'
                }))
                    .click(() => SeriesfeedImporter.Services.RouterService.navigate(url));
                hover
                    .css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                    background: colour
                });
                img
                    .css({
                    maxWidth: imageSize,
                    padding: '10px'
                })
                    .attr('src', image)
                    .attr('alt', name);
                portfolio.append(wrapper);
                wrapper.append(hover);
                hover.append(img);
                wrapper.append(info);
                info.append(title);
                title.append(h4);
                return portfolio;
            }
        }
        Providers.SourceProvider = SourceProvider;
    })(Providers = SeriesfeedImporter.Providers || (SeriesfeedImporter.Providers = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class AjaxService {
            static get(url) {
                return new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        onload: function (pageData) {
                            resolve(pageData);
                        },
                        onerror: function (error) {
                            reject(error);
                        }
                    });
                });
            }
            static post(url, data) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        dataType: "json"
                    }).done((data) => {
                        resolve(data);
                    }).fail((error) => {
                        reject(error);
                    });
                });
            }
        }
        Services.AjaxService = AjaxService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class CardService {
            static initialise() {
                this.card = new SeriesfeedImporter.Models.Card();
                return this.card;
            }
            static getCard() {
                return this.card;
            }
        }
        Services.CardService = CardService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
var SeriesfeedImporter;
(function (SeriesfeedImporter) {
    var Services;
    (function (Services) {
        class StyleService {
            static loadGlobalStyle() {
                const css = '<style>'
                    + '    .import-selected {'
                    + '        border-bottom: 3px solid #447C6F;'
                    + '    }'
                    + '    input[type="checkbox"] + label span {'
                    + '        position: initial !important'
                    + '    }'
                    + '    '
                    + '    .progress {'
                    + '        width: 90%;'
                    + '        margin: 0 auto;'
                    + '    }'
                    + '    '
                    + '    .progress-bar {'
                    + '        background: #447C6F;'
                    + '    }'
                    + '    '
                    + '    @media only screen and (max-width: 992px)'
                    + '    .favourites i.fa.fa-times:hover:after {'
                    + '        position: fixed;'
                    + '        top: 50px;'
                    + '        left: 10px;'
                    + '        right: 10px;'
                    + '    }'
                    + '    '
                    + '    .favourites i.fa.fa-times:hover:after {'
                    + '        content: "Deze serie staat nog niet op Seriesfeed. Vraag \'m aan via menu-item Series -> Serie voorstellen.";'
                    + '        background: #ffffff;'
                    + '        position: absolute;'
                    + '        min-width: 250px;'
                    + '        padding: 20px;'
                    + '        font-family: "Lato", sans-serif;'
                    + '        border: 1px solid #eaeaea;'
                    + '        border-radius: 3px;'
                    + '        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);'
                    + '        line-height: 18px;'
                    + '    }'
                    + '    '
                    + '    tr.row-error {'
                    + '        background-color: rgba(255, 0, 0, 0.15);'
                    + '    }'
                    + '    '
                    + '    tr.row-warning {'
                    + '        background-color: rgba(255, 231, 150, 0.43);'
                    + '    }'
                    + '    '
                    + '    tr.row-info {'
                    + '        background-color: rgba(240, 248, 255, 1.00);'
                    + '    }'
                    + '</style>';
                $('body').append(css);
            }
        }
        Services.StyleService = StyleService;
    })(Services = SeriesfeedImporter.Services || (SeriesfeedImporter.Services = {}));
})(SeriesfeedImporter || (SeriesfeedImporter = {}));
