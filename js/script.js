document.addEventListener('DOMContentLoaded', () => {

    // MENU PARA CELULAR

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {

        toggle.addEventListener('click', () => {

            const opened = nav.classList.toggle('open');

            toggle.setAttribute('aria-expanded', String(opened));

            toggle.textContent = opened ? '×' : '☰';

        });

    }


    // ANO AUTOMÁTICO NO RODAPÉ

    document.querySelectorAll('.year').forEach(el => {

        el.textContent = new Date().getFullYear();

    });


    // IMPEDIR ESCOLHA DE DATA PASSADA

    const dateInput = document.querySelector('#data');

    if (dateInput) {

        const today = new Date();

        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split('T')[0];

        dateInput.min = localToday;

    }


    // RECEBER PROCEDIMENTO ESCOLHIDO NA PÁGINA DE TRATAMENTOS

    const params = new URLSearchParams(window.location.search);

    const treatmentParam = params.get('tratamento');

    const treatmentSelect = document.querySelector('#tratamento');

    if (treatmentParam && treatmentSelect) {

        const match = [...treatmentSelect.options].find(option =>
            option.text.toLowerCase() === treatmentParam.toLowerCase()
        );

        if (match) {
            treatmentSelect.value = match.value;
        }

        else if (treatmentParam.toLowerCase().includes('botox')) {
            treatmentSelect.value = 'Toxina botulínica (Botox)';
        }

    }


    // FORMULÁRIO DE AGENDAMENTO PELO WHATSAPP

    const form = document.querySelector('#booking-form');

    if (form) {

        form.addEventListener('submit', event => {

            event.preventDefault();

            if (!form.reportValidity()) return;

            const data = new FormData(form);

            const message = [

                'Olá! Gostaria de solicitar um agendamento na Ilumini Estética.',

                '',

                `Nome: ${data.get('nome')}`,

                `Telefone: ${data.get('telefone')}`,

                `Procedimento: ${data.get('tratamento')}`,

                `Data desejada: ${data.get('data')}`,

                `Horário preferido: ${data.get('horario')}`,

                data.get('mensagem')
                    ? `Observações: ${data.get('mensagem')}`
                    : ''

            ].filter(Boolean).join('\n');


            window.open(
                `https://wa.me/5551991524603?text=${encodeURIComponent(message)}`,
                '_blank',
                'noopener'
            );

        });

    }

});