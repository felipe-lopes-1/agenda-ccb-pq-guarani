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
        $http.get("https://opensheet.elk.sh/1sMBzkl3nmXrCkkuTRhCFLX8Kwl4vJc52K31d9E8ZsqM/1").then(function (response) {
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

    $rootScope.exibirTelefone = function(telefone) {
        if(telefone.length >= 11){
            telefone = telefone.substring(0,2) + ' ' + telefone.substring(2,telefone.length);
        }
        return telefone;
    }

    $rootScope.copiarTelefone = function (telefone) {
        navigator.clipboard.writeText(telefone);
    };

    $rootScope.abrirWhatsapp = function(telefone){
        telefone = telefone.split('-').join('');
        let link = `https://wa.me/55${telefone}`;
        window.open(link, '_blank');
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
