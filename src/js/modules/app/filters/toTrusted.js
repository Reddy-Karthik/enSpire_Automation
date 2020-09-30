(function() {
    angular.module('app').filter('toTrusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();
