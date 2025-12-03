// script.js — renderização de projetos, rolagem suave e envio simulado

document.addEventListener('DOMContentLoaded', function () {
    var projects = [
        { title: 'Quiz de animais',
            description: 'Um quiz simples e de conhecimento básico sobre animais.',
            image: 'imagens/quiz-animais.png',
            link: 'https://github.com/carolinadummer/Quiz-Animal'
        },
        { title: 'ToDo', 
            description: 'Uma lista de tarefas simples para organizar seu dia.', 
            image: 'imagens/lista-de-tarefas-ToDo.png',
            link: 'https://github.com/carolinadummer/ToDo' 
        },
        { title: 'Busca de CEP', 
            description: 'Uma aplicação para buscar informações de CEPs no Brasil.', 
            image: 'imagens/busca-cep.png',
            link: 'https://github.com/carolinadummer/BuscaCep' 
        },
        { title: 'Cardápio', 
            description: 'Uma aplicação para exibir um cardápio digital de pizzaria', 
            image: 'imagens/cardápio.png',
            link: 'https://github.com/carolinadummer/Cardapio' 
        },
        { title: 'Star Wars', 
            description: 'Uma página sobre o mundo de Star Wars.', 
            image: 'imagens/star-wars.png',
            link: 'https://github.com/carolinadummer/Star-Wars'
        },
        { title: 'Frases Motivacionais Meninas na TI',
            description: 'Uma aplicação que exibe frases motivacionais para meninas na área de TI.', 
            image: 'imagens/frases-motivacionais.png',
            link: 'https://github.com/carolinadummer/frases-motivacionais' 
        },
        { title: 'Site Bootstrap 5', 
            description: 'Um site simples utilizando o framework Bootstrap 5.', 
            image: 'imagens/site-bootstrap-5.png',
            link: 'https://github.com/carolinadummer/site-bootstrap-5' 
        }
    ];
    
    function renderProjects(list) {
        var container = document.getElementById('projectsGrid');
        if (!container) return;
        container.innerHTML = '';
        list.forEach(function (p) {
            var col = document.createElement('div');
            col.className = 'col-md-4 mb-3 d-flex project-col';
            
            var card = document.createElement('div');
            card.className = 'card h-100 d-flex flex-column';
            
            var img = document.createElement('img');
            img.className = 'card-img-top';
            // Usar imagem do projeto se existir, caso contrário usar um placeholder SVG inline
            if (p.image) {
                img.src = p.image;
            } else {
                var svg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="100%" height="100%" fill="#e9ecef"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial, Helvetica, sans-serif" font-size="18">Imagem do projeto</text></svg>');
                img.src = 'data:image/svg+xml;charset=UTF-8,' + svg;
            }
            img.alt = p.title || '';
            
            var body = document.createElement('div');
            body.className = 'card-body';
            
            var h5 = document.createElement('h5');
            h5.className = 'card-title';
            h5.textContent = p.title || '';
            
            var pDesc = document.createElement('p');
            pDesc.className = 'card-text';
            pDesc.textContent = p.description || '';
            
            var a = document.createElement('a');
            a.className = 'btn btn-primary mt-auto';
            a.href = p.link || '#';
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = 'Ver Projeto';
            
            body.appendChild(h5);
            body.appendChild(pDesc);
            body.appendChild(a);
            
            card.appendChild(img);
            card.appendChild(body);
            col.appendChild(card);
            container.appendChild(col);
        });
    }
    
    renderProjects(projects);
    
    // Rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Enviar via mailto: abre o cliente de email do visitante com mensagem pré-preenchida
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = (document.getElementById('name') || {}).value || '';
            var email = (document.getElementById('email') || {}).value || '';
            var message = (document.getElementById('message') || {}).value || '';

            var subject = 'Mensagem do portfólio: ' + (name || 'Contato');
            var bodyLines = [];
            if (name) bodyLines.push('Nome: ' + name);
            if (email) bodyLines.push('Email: ' + email);
            bodyLines.push('---');
            bodyLines.push(message);
            var body = bodyLines.join('\n');

            var mailto = 'mailto:dummercarolina@gmail.com'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);

            // Tenta abrir o cliente de e-mail do usuário
            try {
                window.location.href = mailto;
            } catch (err) {
                // fallback: mostrar a mensagem para copiar manualmente
                alert('Não foi possível abrir o cliente de email. Por favor, envie manualmente para dummercarolina@gmail.com\n\n' + message);
            }
            // opcional: resetar formulário após abrir o mail client
            form.reset();
        });
    }

    // Inicializar tooltips do Bootstrap (para os botões de contato)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (el) {
        try { new bootstrap.Tooltip(el); } catch (e) { /* bootstrap não disponível */ }
    });
});
