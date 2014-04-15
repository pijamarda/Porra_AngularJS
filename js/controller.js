var App = angular.module('App', ['ui.router']);


App.controller('MundialCtrl', function($scope, $http) 
{

	$scope.mundial = {};
	//$scope.partidos = {};

	$http.get('mundial2014.json')
		.then(function(res)
		{
			$scope.mundial = res.data;
			//console.log($scope.mundial.equipos[0]);
			for (var i=0; i<$scope.mundial.grupos.length; i++)
				for (var j=0; j<$scope.mundial.grupos[j].partidos.length; j++)
				{
					var partidoId = $scope.mundial.grupos[i].partidos[j].id;
					for (var x=0; x<$scope.mundial.resultados.length;x++)
					{
						if ($scope.mundial.resultados[x].id == partidoId)
						{
							$scope.mundial.grupos[i].partidos[j].golLocal = $scope.mundial.resultados[x].local;
							$scope.mundial.grupos[i].partidos[j].golVisitante = $scope.mundial.resultados[x].visitante;
						}
					}
					//console.log($scope.mundial.grupos[i].partidos[j]);
				}
		});

	/*$http.get('resultado.json')
		.then(function(res)
		{
		  $scope.partidos = res.data;                
		});*/

	$scope.findEquipo = function(equipo) {
		for (var i=0; i<$scope.mundial.equipos.length; i++)
	    	if ($scope.mundial.equipos[i].id == equipo)
	    		return $scope.mundial.equipos[i].nombre;
	};

	$scope.findEquipoLocal = function(partido) {
		
		var resultados = $scope.partidos.resultados;

		if (resultados)
			for (var i=0; i<resultados.length; i++)
		    	if (resultados[i].id == partido)
		    		return resultados[i].local;
		    	
	};

	$scope.findResultadoLocal = function(partido) {		

		var resultados = $scope.mundial.resultados;
		
		{
			//console.log(resultados.length)
			for (var i=0; i<resultados.length; i++)
			{
				//console.log(resultados[i].id)
		    	if (resultados[i].id == partido)
		    	{
		    		//console.log("partidoId "+partido + " resultado: "+ resultados[i].local);
		    		return resultados[i].local;
		    	}
		    		
			}
		}
	};

	$scope.findResultadoVisitante = function(partido) {		

		var resultados = $scope.mundial.resultados;		
			for (var i=0; i<resultados.length; i++)
		    	if (resultados[i].id == partido)
		    	{
		    		//console.log("partidoId "+partido + " resultado: "+ resultados[i].visitante);
		    		return resultados[i].visitante;
		    	}
		    		
	};



	getIndice = function(partido) {
		var resultados = $scope.partidos.resultados;
		console.log(resultados);
		for (var i=0; i<resultados.length; i++)
		    	if (resultados[i].id == partido)
		    		return i;
	};

	$scope.calculaPuntos = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;		

		
		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{					
					
					if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)
						calculos += 3;
					else if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 1;
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{				
					
					if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 3;
					else if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 1;

						
				}
		
		return calculos;
	}

	$scope.calculaGanados = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;		

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{	
					if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)							
						calculos += 1;							
					else if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 0;						
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{			
					if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 1;							
					else if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 0;
				}
		return calculos;
	}

	$scope.calculaEmpatados = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;		

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{					
					
					if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)							
						calculos += 0;							
					else if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 1;
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{					
					
					if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 0;							
					else if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)
						calculos += 0;
					else
						calculos += 1;
						
				}
		return calculos;
	}

	$scope.calculaPerdidos = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;
		var resultados = $scope.mundial.resultados;

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{					
					
					if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)							
						calculos += 0;							
					else if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 1;
					else
						calculos += 0;
						
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{					
					
					if (grupos[i].partidos[j].golLocal < grupos[i].partidos[j].golVisitante)
						calculos += 0;							
					else if (grupos[i].partidos[j].golLocal > grupos[i].partidos[j].golVisitante)
						calculos += 1;
					else
						calculos += 0;
						
				}
		return calculos;
	}

	$scope.calculaGolesFavor = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;		

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{				
																			
					calculos += grupos[i].partidos[j].golLocal;
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{				
					
					calculos += grupos[i].partidos[j].golVisitante;						
				}
		return calculos;
	}

	$scope.calculaGolesContra = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;		

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{				
																			
					calculos += grupos[i].partidos[j].golVisitante;
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{				
					
					calculos += grupos[i].partidos[j].golLocal;						
				}
		return calculos;
	}

	$scope.calculaPartidosJugados = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.grupos;
		var resultados = $scope.mundial.resultados;

		for (var i=0; i<grupos.length; i++)
			for (var j=0; j<grupos[i].partidos.length; j++)
				if (grupos[i].partidos[j].local == equipo)
				{					
					calculos +=1;
						
				}
				else if (grupos[i].partidos[j].visitante == equipo)
				{					
					calculos +=1;
						
				}
		return calculos;
	}


});

