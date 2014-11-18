var albumsApp = angular.module('albumsApp',[]);

albumsApp.controller('albumsCtrl',
	function ($scope, $http) {
		$http({
			method:'POST',
			url:'http://localhost:8080/albums/albumname/rename.json,',//http://localhost:8080/albums/italy2012.json?page=1&page_size=20
			data:{"album_name": "new album name" }
		}).success( function (data) {
			console.log(data);
			$scope.message = data;
		}).error( function (data) {
			console.log(data);
			$scope.message = data;
		});
	}
);