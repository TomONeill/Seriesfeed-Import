/// <reference path="../../../../typings/index.d.ts" />

module SeriesfeedImporter.Controllers {
    export class BierdopjeFavouriteSelectionController {
        private _username: string;
        private _selectedSeries: Array<Models.Show>;
        private _nextButton: JQuery<HTMLElement>;

        constructor(username: string) {
            this._username = username;
            this._selectedSeries = [];
            this._nextButton = Providers.ReadMoreButtonProvider.provide("Doorgaan");
            this._nextButton.hide();

            this.initialiseCard();
            this.initialise();
        }

        private initialiseCard(): void {
            const card = Services.CardService.getCard();
            card.setTitle("Bierdopje favorieten selecteren");
            card.setBackButtonUrl(Enums.ShortUrl.ImportBierdopje);
            const breadcrumbs = [
                new Models.Breadcrumb("Soort import", Enums.ShortUrl.Import),
                new Models.Breadcrumb("Bronkeuze", Enums.ShortUrl.ImportSourceSelection),
                new Models.Breadcrumb("Gebruiker", Enums.ShortUrl.ImportBierdopje),
                new Models.Breadcrumb(this._username, `${Enums.ShortUrl.ImportBierdopje}${this._username}`)
            ];
            card.setBreadcrumbs(breadcrumbs);
            card.setWidth();
            card.setContent();
        }

        private initialise(): void {
            const cardContent = $('#' + Config.Id.CardContent);

            const table = new Models.Table();
            const checkboxAll = new Models.Checkbox('select-all');
            checkboxAll.subscribe((isEnabled) => this.toggleAllCheckboxes(isEnabled));
            const selectAllColumn = $('<th/>').append(checkboxAll.instance);
            const seriesColumn = $('<th/>').text('Serie');
            table.addTheadItems([selectAllColumn, seriesColumn]);
            const loadingData = $('<div><h4 style="padding: 15px;">Favorieten ophalen...</h4></div>');

            cardContent.append(loadingData);

            Services.BierdopjeService.getFavouritesByUsername(this._username).then((favourites) => {
                favourites.each((index, favourite) => {
                    const show = new Models.Show();
                    show.id = index;
                    show.name = $(favourite).text();
                    show.slug = $(favourite).attr('href');

                    const row = $('<tr/>');
                    const selectColumn = $('<td/>');
                    const showColumn = $('<td/>');

                    const checkbox = new Models.Checkbox(`show_${index}`);
                    checkbox.subscribe((isEnabled) => {
                        if (isEnabled) {
                            this._selectedSeries.push(show);
                        } else {
                            const position = this._selectedSeries.map((show) => show.id).indexOf(show.id);
                            this._selectedSeries.splice(position, 1);
                        }

                        if (this._selectedSeries.length > 0) {
                            this._nextButton.show();
                        } else {
                            this._nextButton.hide();
                        }

                        console.log("new", this._selectedSeries);
                    });

                    selectColumn.append(checkbox.instance);
                    showColumn.append($('<a href="' + Config.BierdopjeBaseUrl + show.slug + '" target="_blank">' + show.name + '</a>'));

                    row.append(selectColumn);
                    row.append(showColumn);

                    table.addRow(row);
                });
                loadingData.replaceWith(table.instance);
                cardContent.append(this._nextButton);
            });
        }

        private toggleAllCheckboxes(result: boolean): void {
            console.log("check all?", result);
        }
    }
}