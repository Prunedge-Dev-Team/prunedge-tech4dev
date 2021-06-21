document.querySelector("a[data-target=tw]").href = 'https://twitter.com/intent/tweet?url=' + decodeURI(location.href)
document.querySelector("a[data-target=fb]").href = 'http://www.facebook.com/sharer.php?u=' + decodeURI(location.href)
document.querySelector("a[data-target=ln]").href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + decodeURI(location.href)