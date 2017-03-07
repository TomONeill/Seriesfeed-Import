/// <reference path="./typings/index.d.ts" />

module SeriesfeedImporter {
    class App {
        public static main(): void {
            $(() => this.initialise());
        }

        private static initialise(): void {
            new Controllers.NavigationController()
                .initialise();

            new Controllers.RoutingController()
                .initialise();
        }
    }

    App.main();
}