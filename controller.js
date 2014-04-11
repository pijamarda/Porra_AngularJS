var App = angular.module('App', []);

App.controller('MundialCtrl', function($scope, $http) 
{
	$http.get('mundial2014.json')
		.then(function(res)
		{
		  $scope.mundial = res.data;                
		});
	$scope.findEquipo = function(equipo) {
		for (var i=0; i<$scope.mundial.equipos.length; i++)
	    	if ($scope.mundial.equipos[i].id == equipo)
	    		return $scope.mundial.equipos[i].nombre;
	};

	
});

App.controller('ResultadoCtrl', function($scope, $http) 
{
	$http.get('resultado.json')
		.then(function(res)
		{
		  $scope.resultado = res.data;                
		});
	});