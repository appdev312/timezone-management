'use strict';

/* Controllers */
app.controller('LoginCtrl', ['$scope', 'Auth', '$location',
					function( $scope ,  Auth ,  $location ) {
    
	$scope.user = {};
    $scope.authError = null;

    $scope.login = function(form) {
		$scope.submitted = true;

		if(form.$valid) {
			Auth.login({
				email: $scope.user.email,
				password: $scope.user.password
			})
			.then( function() {
				// Logged in, redirect to home
				$location.path('/');
			})
			.catch( function(err) {
				$scope.authError = err.message;
			});
		}
    };
}]);