/// <reference path="../../../../typings/index.d.ts" />

module SeriesfeedImporter.Controllers {
    export class BierdopjeFavouriteSelectionController {
        private username: string;

        constructor(username: string) {
            this.username = username;

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
                new Models.Breadcrumb(this.username, `${Enums.ShortUrl.ImportBierdopje}${this.username}`)
            ];
            card.setBreadcrumbs(breadcrumbs);
            card.setWidth();
            card.setContent();
        }

        private initialise(): void {
            const cardContent = $('#' + Config.Id.CardContent);

            const table = new Models.Table();
            const checkboxAll = $('<fieldset><input type="checkbox" name="select-all" class="hideCheckbox"><label for="select-all"><span class="check"></span></label></fieldset>');
            const selectAll = $('<th/>').append(checkboxAll);
            const series = $('<th/>').text('Serie');
            table.addTheadItems([selectAll, series]);
            const loadingData = $('<div><h4 style="margin-bottom: 15px;">Favorieten ophalen...</h4></div>');

            cardContent.append(loadingData);

            Services.BierdopjeService.getFavouritesByUsername(this.username).then((favourites) => {
                favourites.each((index, favourite) => {
                    const bdShowName = $(favourite).text();
                    const bdShowSlug = $(favourite).attr('href');
                    const bdShowUrl = Config.BierdopjeBaseUrl + bdShowSlug;

                    const checkbox = '<fieldset><input type="checkbox" name="show_' + index + '" id="show_' + index + '" class="hideCheckbox"><label for="show_' + index + '" class="checkbox-label"><span class="check" data-list-id="' + index + '" data-list-name="' + bdShowName + '" data-list-url="' + bdShowUrl + '"></span></label></fieldset>';
                    const item = $('<tr><td>' + checkbox + '</td><td><a href="' + bdShowUrl + '" target="_blank">' + bdShowName + '</a></td></tr>');

                    table.addRow(item);
                });
                loadingData.html(<any>table.instance)

                checkboxAll.click(() => this.toggleAllCheckboxes());

                // $('.checkbox-label').on('click', (event) => {
                //     const checkbox = $(event.currentTarget).find(".check");

                //     if (!checkbox.hasClass("checked")) {
                //         const listItem = {
                //             id: checkbox.data("list-id"),
                //             name: checkbox.data("list-name"),
                //             url: checkbox.data("list-url")
                //         };

                //         this._selectedLists.push(listItem);

                //         checkbox.addClass("checked");
                //     } else {
                //         const pos = this._selectedLists.map((list: any) => list.id).indexOf(checkbox.data("list-id"));
                //         this._selectedLists.splice(pos, 1);
                //         checkbox.removeClass("checked");
                //     }

                //     if (this._selectedLists.length > 0) {
                //         nextStep.show();
                //     } else {
                //         nextStep.hide();
                //     }
                // });
            });
        }

        private toggleAllCheckboxes(): void {
            console.log("check all");
        }
    }
}