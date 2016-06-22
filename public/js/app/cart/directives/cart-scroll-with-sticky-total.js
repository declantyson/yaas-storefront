/**
 * Created by declan.tyson on 22/06/2016.
 */



'use strict';

angular.module('ds.cart')
/**
 * cart-scroll-with-sticky-total
 * This directive manages the scrollable area within the cart
 * @return {Object}
 */
    .directive('cartScrollWithStickyTotal',['$rootScope', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('scroll', function(){
                    var stickyHeight = angular.element('#cart .sticky').height();
                    angular.element('.cart-items').css({
                        paddingBottom: stickyHeight
                    });
                });
            }
        };
    }]);