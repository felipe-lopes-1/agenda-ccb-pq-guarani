var app = angular.module('meuApp', []);
app.run(function ($rootScope, $location, $http) {

    /**
     * INITIALIZE
     */
    $rootScope.carregando = false;
    $rootScope.erro = false;
    $rootScope.dados = [];
    $rootScope.tipos = ['Todos'];

    /**
     * FUNCTIONS
     */
    (function getDados() {
        $rootScope.carregando = true;
        // $http.get("https://felipe-lopes-1.github.io/agenda-ccb-pq-guarani/dados.json").then(function (response) {
        $http.get("https://opensheet.elk.sh/1yKFVfnEdAkHfj_7-WvfJ9xotRlle6dlyjCIctrwggHE/1").then(function (response) {
            $rootScope.carregando = false;
            $rootScope.erro = false;
            $rootScope.dados = response.data;
            $rootScope.dados = $rootScope.dados.filter(x => x.ATIVO == 'TRUE');

            var tipos = Array.from(
                new Map($rootScope.dados.map(obj => [obj.TIPO, obj])).values()
            );
            tipos.forEach(element => {
                $rootScope.tipos.push(element.TIPO)
            });
        }, function error(e) {
            $rootScope.carregando = false;
            $rootScope.erro = true;
            console.log('ERROR LOG: ' + e);
        });
    })();

    $rootScope.orderByMe = function (coluna) {
        $rootScope.minhaOrdem = coluna;
    };

    $rootScope.filtrarDados = function () {
        $rootScope.dadosFiltrados = $rootScope.dados.filter(x => x.TIPO == $rootScope.filtroPorTipo);
        $rootScope.filtro = '';
    };

    $rootScope.copiarTelefone = function (telefone) {
        navigator.clipboard.writeText(telefone);
    };

    $rootScope.customFiltro = function (item) {
        if (!$rootScope.filtro) return true;

        const normalizar = str =>
            (str || '').toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const termo = normalizar($rootScope.filtro);

        return (
            normalizar(item.NOME).includes(termo) ||
            normalizar(item.TIPO).includes(termo) ||
            normalizar(item.INGRESSO).includes(termo) ||
            normalizar(item.CONTATO).includes(termo)
        );
    };
});
