document.addEventListener("DOMContentLoaded", () => {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = '/jesus-na-web-3/';
    const basePath = isGitHubPages ? repoName : '/';

    // 1. Carrega o Header
    fetch(`${basePath}header.html`)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o header.");
            return response.text();
        })
        .then(html => {
            const headerContainer = document.getElementById("header");
            if (headerContainer) {
                headerContainer.innerHTML = html;
                corrigirLinksMenu(headerContainer, isGitHubPages, repoName);
            }
        })
        .catch(err => console.error(err));

    // 2. Carrega o Footer
    fetch(`${basePath}footer.html`)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o footer.");
            return response.text();
        })
        .then(html => {
            const footerContainer = document.getElementById("footer");
            if (footerContainer) {
                footerContainer.innerHTML = html;
                // CORREÇÃO DOS LINKS DO RODAPÉ: Ajusta a navegação da coluna do footer
                corrigirLinksMenu(footerContainer, isGitHubPages, repoName);
            }
        })
        .catch(err => console.error(err));
});

// Função mágica que ajusta os links internos dependendo da profundidade da pasta
function corrigirLinksMenu(container, isGitHubPages, repoName) {
    const links = container.querySelectorAll("a"); // Seleciona todas as tags de link <a>
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    if (isGitHubPages && pathSegments[0] === 'jesus-na-web-3') {
        pathSegments.shift();
    }

    const profundidade = pathSegments.length > 1 ? pathSegments.length - 1 : 0;
    const prefixoRelativo = "../".repeat(profundidade);

    links.forEach(link => {
        const hrefOriginal = link.getAttribute("href");
        // Ignora links externos, links vazios (#) ou caminhos absolutos (/)
        if (hrefOriginal && hrefOriginal !== "#" && !hrefOriginal.startsWith("http") && !hrefOriginal.startsWith("/")) {
            link.setAttribute("href", prefixoRelativo + hrefOriginal);
        }
    });
}

