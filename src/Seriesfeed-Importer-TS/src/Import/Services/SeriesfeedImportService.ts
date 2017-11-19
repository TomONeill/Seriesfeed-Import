/// <reference path="../../typings/index.d.ts" />

module SeriesfeedImporter.Services {
    export class SeriesfeedImportService {
        public static findShowByTheTvdbId(theTvdbId: string): Promise<Models.Show> {
            const localShow = this.findShowByTheTvdbIdFromStorage(theTvdbId);
            
            if (localShow != null) {
                return Promise.resolve(localShow);
            }

            return this.findShowByTheTvdbIdFromApi(theTvdbId)
                .then((show) => {
                    show.theTvdbId = theTvdbId;
                    this.addShowToStorage(show);
                    return show;
                });
        }

        private static findShowByTheTvdbIdFromStorage(theTvdbId: string): Models.Show | null {
            const localShows = Services.StorageService.get(Enums.LocalStorageKey.SeriesfeedShows) as Array<Models.Show>;

            if (localShows != null) {
                return localShows.find((show) => show.theTvdbId === theTvdbId);
            }

            return null;
        }

        private static findShowByTheTvdbIdFromApi(theTvdbId: string): Promise<Models.Show> {
            const postData = {
                type: 'tvdb_id',
                data: theTvdbId
            };

            return Services.AjaxService.post("/ajax/serie/find-by", postData)
                .then((result: any) => {
                    const show = new Models.Show();
                    show.seriesfeedId = result.id;
                    show.name = result.name;
                    show.slug = result.slug;
                    return show;
                })
                .catch((error) => {
                    console.error(`Could not convert The TVDB id ${theTvdbId} on ${Config.BaseUrl}: ${error.responseText}`);
                    return error;
                });
        }

        private static addShowToStorage(show: Models.Show): void {
            let localShows = Services.StorageService.get(Enums.LocalStorageKey.SeriesfeedShows) as Array<Models.Show> | null;

            if (localShows == null) {
                localShows = new Array<Models.Show>();
            }

            localShows.push(show);
            Services.StorageService.set(Enums.LocalStorageKey.SeriesfeedShows, localShows);
        }

        public static addFavouriteByShowId(showId: number): Promise<void> {
            const postData = {
                series: showId,
                type: 'favourite',
                selected: '0'
            };

            return Services.AjaxService.post("/ajax/serie/favourite", postData)
                .catch((error) => {
                    console.error(`Could not favourite show id ${showId} on ${Config.BaseUrl}: ${error.responseText}`);
                    return error;
                });
        }

        public static getEpisodeId(showId: number, episodeTag: string): Promise<any> {
            const postData = {
                type: 'series_season_episode',
                serie: showId,
                data: episodeTag
            };

            return Services.AjaxService.post("/ajax/serie/episode/find-by", postData)
                .catch((error) => {
                    console.error(`Could not get episode for show id ${showId} with episode tag ${episodeTag} on ${Config.BaseUrl}: ${error.responseText}`);
                    return error;
                });
        }
    }
}