(function() {
    'use strict';


    angular.module('restangularbknd-orm', ['restangular', 'ngCookies'])

    .factory('RestangularBknd', ['Restangular', 'CONSTS',
        function (Restangular, CONSTS) {
            return {
                config: function () {
                    Restangular.setResponseExtractor(function (response, operation) {
                        if (operation === 'getList' && !angular.isArray(response)) {
                            var newResponse = response.data;
                            return newResponse;
                        }
                        return response;
                    });

                    Restangular.setRestangularFields({
                        id: "__metadata.id",
                        route: "restangularRoute",
                        selfLink: "self.href"
                    });

                    Restangular.setBaseUrl(CONSTS.backandUrl + "/1/table/data");
                },
                setCredentials: function (token) {
                    Restangular.setDefaultHeaders({ Authorization: token });
                },
                clearCredentials: function () {
                    Restangular.setDefaultHeaders({ Authorization: '' });

                }
            }
        }


    ])
    .constant('CONSTS', { backandUrl: 'https://api.backand.com:8080' });
})();
