var App = angular.module('App', []);

App.controller('MundialCtrl', function($scope, $http) 
{

	$scope.mundial = {};
	$scope.partidos = {};

	$http.get('mundial2014.json')
		.then(function(res)
		{
		  $scope.mundial = res.data;                
		});

	$http.get('resultado.json')
		.then(function(res)
		{
		  $scope.partidos = res.data;                
		});

	$scope.findEquipo = function(equipo) {
		for (var i=0; i<$scope.mundial.equipos.length; i++)
	    	if ($scope.mundial.equipos[i].id == equipo)
	    		return $scope.mundial.equipos[i].nombre;
	};

	$scope.findEquipoLocal = function(partido) {
		//console.log($scope.partidos.resultados.length)

		var resultados = $scope.partidos.resultados;

		if (resultados)
			for (var i=0; i<resultados.length; i++)
		    	if (resultados[i].id == partido)
		    		return resultados[i].local;
		    	//console.log(j);//$scope.partidos.resultados.length)
	    		
	};


});

