(function(document, window) {
    
    var makeRequest = function(url, sourceElement) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    sourceElement.innerHTML = this.responseText;

                    var parent = sourceElement.parentNode
                    while (sourceElement.firstChild) { parent.insertBefore(sourceElement.firstChild, sourceElement)}
                    parent.removeChild(sourceElement)    
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    let sbnheader = document.createElement('header')
    document.body.prepend(sbnheader)
    makeRequest('https://sbn.psi.edu/sbn-bar/sbn-bar.html', sbnheader)

    let css = document.createElement('link');
    css.href = 'https://sbn.psi.edu/sbn-bar/sbn-bar.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.body.appendChild(css)

})();