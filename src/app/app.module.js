var app = angular.module("mainApp", ["ngRoute", "pascalprecht.translate", "ngDialog", "ngAnimate", "ngFileUpload"]);

//Add Translation
app.config(function($translateProvider, $translatePartialLoaderProvider, $qProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translatePartialLoaderProvider.addPart('menu');
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'i18n/{lang}.json'
    });

    var defaultLang = localStorage.getItem('lang');
    if (defaultLang) {
        $translateProvider.preferredLanguage(defaultLang);
    } else {
        $translateProvider.preferredLanguage('el');
        localStorage.setItem('lang', 'el');
    }

    $qProvider.errorOnUnhandledRejections(false);

});