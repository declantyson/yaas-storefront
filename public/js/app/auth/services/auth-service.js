/**
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2014 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

'use strict';

/**
 *  Encapsulates access to the "authorization" service.
 */
angular.module('ds.auth')
    .factory('AuthSvc', ['AuthREST', 'settings', 'CookiesStorage', function(AuthREST, settings, Storage){

        var AuthenticationService = {

            signup: function (user) {
                return AuthREST.Customers.all('signup').customPOST(user);
            },

            customerSignin: function(user) {
                return AuthREST.Customers.all('login').customPOST(user, '', { apiKey: settings.apis.customers.apiKey });
            },

            anonymousSignin: function() {
                return AuthREST.Customers.all('login').all('anonymous').customGET('', { apiKey: settings.apis.customers.apiKey });
            },

            /**
             * Sign in promise resolver function used for resolving the type of signin
             * If user parameter is not provided than anonymous login will be performed, otherwise it'll initiate customer signup with provided credentials.
             * 
             * @param user JSON object (with email, password properties) 
             */
            signin: function (user) {
                var signinPromise = user ? this.customerSignin(user) : this.anonymousSignin();
                
                signinPromise.then(function(response) {
                    Storage.setToken(response.accessToken, user ? user.email : null);
                });

                return signinPromise;
            },

            signout: function() {
                var signoutPromise = AuthREST.Customers.all('logout').customGET('', { accessToken: Storage.getToken().getAccessToken() }),
                    self = this;
                
                signoutPromise.then(function() {
                    Storage.unsetToken(settings.accessTokenKey);
                    self.signin();  // Obtain access_token as anonymous user
                });

                return signoutPromise;
            },

            setToken: Storage.setToken,

            getToken: Storage.getToken,

            isAuthenticated: function() {
                var token = Storage.getToken();
                return !!token.getAccessToken() && !!token.getUsername();
            }

        };

        return AuthenticationService;

    }]);