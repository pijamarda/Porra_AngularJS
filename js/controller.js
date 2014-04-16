var App = angular.module('App', ['ui.router']);


App.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/faseGrupos");
  //
  // Now set up the states
  $stateProvider
    .state('faseGrupos', {
      url: "/faseGrupos",
      templateUrl: "templates/fase_grupos.html"
    })
    .state('eliminatorias', {
      url: "/eliminatorias",
      templateUrl: "templates/eliminatorias.html"
    })
});

App.factory("Mundial",function($http){

    var obj = {};

    $http.get('mundial2014.json').success(function(data) {
        // you can do some processing here
        obj.content = data;
        for (var i=0; i<obj.content.grupos.length; i++)
			for (var j=0; j<obj.content.grupos[j].partidos.length; j++)
			{
				var partidoId = obj.content.grupos[i].partidos[j].id;
				for (var x=0; x<obj.content.resultados.length;x++)
				{
					if (obj.content.resultados[x].id == partidoId)
					{
						obj.content.grupos[i].partidos[j].golLocal = obj.content.resultados[x].local;
						obj.content.grupos[i].partidos[j].golVisitante = obj.content.resultados[x].visitante;
					}
				}
				//console.log($scope.mundial.grupos[i].partidos[j]);
			}
		for (var i=0; i<obj.content.eliminatorias.seeds.length; i++)			
			for (var x=0; x<obj.content.resultados.length;x++)
			{
				if (obj.content.resultados[x].id == obj.content.eliminatorias.seeds[i].id)
				{
					obj.content.eliminatorias.seeds[i].golLocal = obj.content.resultados[x].local;
					obj.content.eliminatorias.seeds[i].golVisitante = obj.content.resultados[x].visitante;
				}
			}
			//console.log($scope.mundial.grupos[i].partidos[j]);
			
    });    

    return obj;
});


App.controller('MundialCtrl', function($scope, $http, Mundial) 
{

	//$scope.mundial = {};
	$scope.mundial = Mundial;
	//$scope.partidos = {};
	/*
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
	*/
	/*$http.get('resultado.json')
		.then(function(res)
		{
		  $scope.partidos = res.data;                
		});*/

	$scope.findEquipo = function(equipo) {
		var equipos = $scope.mundial.content.equipos
		for (var i=0; i<equipos.length; i++)
	    	if (equipos[i].id == equipo)
	    		return equipos[i].nombre;
	};

	$scope.findEquipoLocal = function(partido) {
		
		var resultados = $scope.content.partidos.resultados;

		if (resultados)
			for (var i=0; i<resultados.length; i++)
		    	if (resultados[i].id == partido)
		    		return resultados[i].local;
		    	
	};

	$scope.findResultadoLocal = function(partido) {		

		var resultados = $scope.mundial.content.resultados;
		
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

		var resultados = $scope.mundial.content.resultados;		
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

	setPuntos = function(equipo,puntos) {
		var grupos = $scope.mundial.content.grupos;
		if (grupos)
		{
			for (var i=0; i<grupos.length; i++)
				for (var j=0; j<grupos[i].equipos.length; j++)
			    	if (grupos[j].equipos[i].id == equipo)
			    		grupos[j].equipos[i].puntos = 2;
		}
	};

	$scope.calculaPuntos = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.content.grupos;		
		var temp = 0;
		
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

		for (var i=0; i<grupos.length; i++)
				for (var j=0; j<grupos[i].equipos.length; j++)					
			    	if (grupos[i].equipos[j].id == equipo)
			    	{
			    		$scope.mundial.content.grupos[i].equipos[j].puntos=calculos;			    		
			    	}
		
		return calculos;
	}

	$scope.calculaGanados = function(equipo)
	{
		var calculos = 0;
		var grupos = $scope.mundial.content.grupos;		

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
		var grupos = $scope.mundial.content.grupos;		

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
		var grupos = $scope.mundial.content.grupos;
		var resultados = $scope.mundial.content.resultados;

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
		var grupos = $scope.mundial.content.grupos;		

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
		var grupos = $scope.mundial.content.grupos;		

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
		var grupos = $scope.mundial.content.grupos;
		var resultados = $scope.mundial.content.resultados;

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

	$scope.$watch('mundial', function() {	
    	var mundialTemp = $scope.mundial;
    	var idPrimero = 0;
    	var idSegundo = 0;
    	if (mundialTemp.content)
    	{
    		var grupos = mundialTemp.content.grupos;
    		if (grupos)
    		{
    			for (var i=0; i<grupos.length; i++)
    			{  	
    				
    				var idPrimeroActual = grupos[i].pasan[0].id;
    				var idSegundoActual = grupos[i].pasan[1].id;

    				var posPrimero = 0;
    				var posSegundo = 0;

    				for (var x=0; x<grupos[i].equipos.length; x++)
    				{
    					if(grupos[i].equipos[x].id == idPrimeroActual)
    						posPrimero = x;
    					if(grupos[i].equipos[x].id == idSegundoActual)
    						posSegundo = x;
    				}
    				for (var j=0; j<grupos[i].equipos.length; j++)
    				{
	    				if (grupos[i].equipos[j].puntos > grupos[i].equipos[posPrimero].puntos)
	    				{
	    					if (grupos[i].equipos[j].id == grupos[i].equipos[posSegundo].id)
	    						idSegundoActual = grupos[i].equipos[posPrimero].id;
	    					idPrimeroActual = grupos[i].equipos[j].id;
	    					
	    						
	    				}
	    				else if (grupos[i].equipos[j].puntos > grupos[i].equipos[posSegundo].puntos)
	    				{
	    					if (grupos[i].equipos[j].id != grupos[i].equipos[posPrimero].id)
	    						idSegundoActual = grupos[i].equipos[j].id;
	    				}
    				}

    				if (i==0)
    					console.log(idPrimeroActual+" "+idSegundoActual);
    				$scope.mundial.content.grupos[i].pasan[0].id = idPrimeroActual;
    				$scope.mundial.content.grupos[i].pasan[1].id = idSegundoActual;

    				//GRUPO A
    				if (i==0)
    				{
    					$scope.mundial.content.eliminatorias.seeds[0].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[0].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[2].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[2].nombreVisitante = $scope.findEquipo(idSegundoActual);

    				}
    				//GRUPO B
    				else if (i==1)
    				{
    					$scope.mundial.content.eliminatorias.seeds[2].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[2].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[0].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[0].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO C
    				else if (i==2)
    				{
    					$scope.mundial.content.eliminatorias.seeds[1].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[1].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[3].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[3].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO D
    				else if (i==3)
    				{
    					$scope.mundial.content.eliminatorias.seeds[3].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[3].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[1].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[1].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO E
    				else if (i==4)
    				{
    					$scope.mundial.content.eliminatorias.seeds[4].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[4].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[6].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[6].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO F
    				else if (i==5)
    				{
    					$scope.mundial.content.eliminatorias.seeds[6].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[6].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[4].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[4].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO G
    				else if (i==6)
    				{
    					$scope.mundial.content.eliminatorias.seeds[5].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[5].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[7].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[7].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				//GRUPO H
    				else if (i==7)
    				{
    					$scope.mundial.content.eliminatorias.seeds[7].local=idPrimeroActual;
    					$scope.mundial.content.eliminatorias.seeds[7].nombreLocal = $scope.findEquipo(idPrimeroActual);
    					$scope.mundial.content.eliminatorias.seeds[5].visitante= idSegundoActual;
    					$scope.mundial.content.eliminatorias.seeds[5].nombreVisitante = $scope.findEquipo(idSegundoActual);
    				}
    				
    			}
    		}
    		var eliminatorias =  mundialTemp.content.eliminatorias;
    		var partidos =  mundialTemp.content.resultados;
    		if (eliminatorias && partidos)
    		{
    			for (var x=0; x<eliminatorias.seeds.length; x++)
    			{
	    			var p1 = eliminatorias.seeds[x].id;
	    			for (var i=0; i<partidos.length; i++)
	    				if (partidos[i].id == p1)
			    			if (partidos[i].local > partidos[i].visitante)
			    			{
			    				$scope.mundial.content.eliminatorias.cuartos[x].local=eliminatorias.seeds[x].local;
			    				$scope.mundial.content.eliminatorias.cuartos[x].Nombrelocal=$scope.findEquipo(eliminatorias.seeds[x].local);
			    			}
			    			else
			    			{
			    				$scope.mundial.content.eliminatorias.cuartos[x].local=eliminatorias.seeds[x].visitante;
			    				$scope.mundial.content.eliminatorias.cuartos[x].Nombrelocal=$scope.findEquipo(eliminatorias.seeds[x].visitante);
			    			}
			    	
		    	}
    		}
    	}
	    
	}, true);

});

App.controller("FinalCtrl", function($scope,Mundial){

    $scope.mundial = Mundial;
    $scope.updated = -1;
    /*
    $scope.$watch('mundial', function() {	
    	var mundialTemp = $scope.mundial;
    	if (mundialTemp.content)
    	{
    		var grupos = mundialTemp.content.grupos;
    		for (var i=0; i<grupos.length; i++)
    		{

    			grupos[i].pasan[0].id=5;
    		}
    	}
	    
	}, true);
	*/
});

