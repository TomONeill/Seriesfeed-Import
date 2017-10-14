/// <reference path="../typings/index.d.ts" />

module SeriesfeedImporter.Config {
    export const BaseUrl = "https://www.seriesfeed.com";
    export const BierdopjeBaseUrl = "http://www.bierdopje.com";
    export const ImdbBaseUrl = "http://www.imdb.com";
    export const Id = {
        MainContent: "mainContent",
        CardContent: "cardContent"
    };
    export const MaxRetries = 3;
    export const MaxAsyncCalls = 3;
}