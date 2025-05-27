$(document).ready(function () {
    const isDarkSaved = localStorage.getItem('modoEscuro') === 'true';

    if (isDarkSaved) {
        $('body').addClass('dark-mode');
        $('#toggleTheme i').removeClass('fa-moon-o').addClass('fa-sun-o');
        $('img[src="logo-ccb-light.png"]').attr('src', 'logo-ccb-dark.png');
    } else {
        $('#toggleTheme i').removeClass('fa-sun-o').addClass('fa-moon-o');
        $('img[src="logo-ccb-dark.png"]').attr('src', 'logo-ccb-light.png');
    }

    /**
     * Botão Voltar ao Topo
     */
    const $btn = $('#backToTop');
    // Mostra/esconde o botão conforme rolagem
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $btn.fadeIn();
        } else {
            $btn.fadeOut();
        }
    });

    // Anima rolagem até o topo
    $btn.click(function () {
        $('html, body').animate({ scrollTop: 0 }, 0);
        return false;
    });

    /**
     * Alternar entre os temas Claro e Escuro
     */
    $('#toggleTheme').click(function () {
        $('body').toggleClass('dark-mode');

        const isDark = $('body').hasClass('dark-mode');
        localStorage.setItem('modoEscuro', isDark); // salva a escolha

        // Troca o ícone do botão
        const icon = $(this).find('i');
        if ($('body').hasClass('dark-mode')) {
            icon.removeClass('fa-moon-o').addClass('fa-sun-o');
            // Altere o logo, se necessário
            $('img[src="logo-ccb-light.png"]').attr('src', 'logo-ccb-dark.png');
        } else {
            icon.removeClass('fa-sun-o').addClass('fa-moon-o');
            $('img[src="logo-ccb-dark.png"]').attr('src', 'logo-ccb-light.png');
        }
    });
});
