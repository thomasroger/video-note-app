
    angular.module('VideoNoteApp')
        .controller('app.auth.controller', Auth)
        .config(($stateProvider, $urlRouterProvider)=>{
                $urlRouterProvider.otherwise("/");
                
                $stateProvider
                    .state("landing", {
                        url: '/',
                        views: {
                            "": {
                                templateUrl: "../views/partials/video-upload.html"
                            },
                            "nav": {
                                templateUrl: "../views/partials/nav.html"
                            }
                        },
                        controller: 'videoController',
                        controllerAs: 'vCtrl'
                    })
                })

    Auth.$inject = ['$http'];

    function Auth($http) { // window.Auth
        console.info('Auth controller loaded!');

        var auth = this,
            alertError = ['alert','alert-danger'];

        auth.loggedIn = "Log Out";


        auth.payload = { // used both for registering and loggin in
            // ng-models are point to properties on this object
            // email (ng-model)
            // password (ng-model)
        };

        auth.login = {
            // happens when the user clicks submit on the login form
            submit: function($event) { // click-event
                console.info('auth.login.submit', $event);

                $http.post('/login', auth.payload)
                    .then(auth.login.success, auth.login.error);
                    // brandon reminds you, that a wiffle bat will strike you if you forget your error callback!
            },
            success: function(res) { // server response callback
                location.href = '/dashboard';
                console.log(res.data)
            },
            error: function(err) {
                console.error('Login.error', err);

                // user feedback stuffs, sets up the alert box on error
                auth.login.alert = alertError;
                auth.login.message = ( err.data && err.data.message ) || 'Login failed, contact us!';
            }
        };

        auth.loginSuccess = ()=>{
            if (auth.login.success){
                auth.loggedIn = "Log In";
            }else{
                auth.loggedIn = "Log Out";
            }
        }

        auth.loginSuccess()



        auth.register = {
            submit: function () {
                // happens when the user clicks submit on the register form
                $http.post('/register', auth.payload)
                    .then(auth.register.success, auth.register.error);
            },
            success: function() {
                // when register is successful, just redirect them into the dashboard (already logged in)
                location.href = "/dashboard";
            },
            error: function(err) {
                console.error('auth.register.error', err);

                // user feedback stuffs, sets up the alert box on error
                auth.register.alert = alertError;
                auth.register.message = ( err.data && err.data.message ) || 'Register failed, contact us!'
            }
        };
    }