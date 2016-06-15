

app.controller('appCtrl', ['$scope','brandsFactory','interactionsFactory','userFactory' , 'userService' , function ($scope , brandsFactory, interactionsFactory,userFactory, userService ) {
	var vm = $scope;

	vm.brands = [];
	vm.interactions = [];
	

	brandsFactory.list().success(function(ret){
		vm.brands = ret;
	});

	vm.search = function(brand){

		vm.search_brand_selected = brand.name;

		

		interactionsFactory.list().success(function(ret){
			var listInteractions  = ret.filter(function(obj){
				return obj.brand == brand.id;
			});

			var lista = [];
			var listafinal = [];

			vm.loading = true;


			listInteractions.forEach(function(element, index) {
				
				userService.getUser(element.user).then(function(re){
					var obj = {};
					obj.user = re;

					lista[element.user] = [];
				
					listInteractions.forEach(function(element_, index_) {
						if(element.user == element_.user){
							lista[element.user].push(element_);
						}
					});	

					obj.interactions = lista[element.user];
					obj.qtd_interactions = lista[element.user].length;
					listafinal.push(obj);

					var itensOrdenados = listafinal.sort(function(a,b){
						return b.interactions.length - a.interactions.length;
					});

					vm.interactions = itensOrdenados;

					var donutG = [];
					var barG = [];
					itensOrdenados.forEach(function(element, index) {
						var donut = {};
						donut.label = element.user.name.title +" "+element.user.name.first;
						donut.value = element.qtd_interactions;
						donutG.push(donut);

						var bar = {};
						bar.y = element.user.name.title +" "+element.user.name.first;
						bar.a = element.qtd_interactions;
						barG.push(bar);

					});

					vm.loading = false;

					vm.donutgraf = donutG;
					vm.bargraf = barG;

				});				
			});
		});
	}

}])