(function() {
    angular.module('app').filter("md5", [ "$md5", function($md5) {
        return function(text) {
            return text ? $md5.createHash(text.toString().toLowerCase()) : text;
        };
    } ]);
})();
