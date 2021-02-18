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
                    
                    adjustLayout()
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    const adjustLayout = function() {
        const bodyStyle = window.getComputedStyle(document.body)
        const bar = document.getElementById('sbn-bar')
        
        // zero out insiet
        if(bodyStyle.margin !== '0px') {
            bar.style.marginTop = '-' + bodyStyle.marginTop;
            bar.style.marginLeft = '-' + bodyStyle.marginLeft;
            bar.style.marginRight = '-' + bodyStyle.marginRight;
        }

        const elems = document.body.getElementsByTagName("*");
        // adjust fixed elements
        for (node of elems) {
            const nodeStyle = window.getComputedStyle(node)
            if (nodeStyle.position === 'fixed') {
                const top = parseFloat(nodeStyle.top);
                node.style.top = (top + 57) + 'px';
            }

        }
    }

    let sbnheader = document.createElement('header')
    document.body.prepend(sbnheader)
    makeRequest('https://sbn.psi.edu/sbn-bar/sbn-bar.html', sbnheader)

    let css = document.createElement('link');
    css.href = 'https://sbn.psi.edu/sbn-bar/sbn-bar.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.body.appendChild(css)

    console.log(document.cookie)
    const cookie = document.cookie ? document.cookie.split('; ').find(row => row.startsWith('SBNTHEME=')) : null
    const currentTheme = cookie ? cookie.split('=')[1] : null

    if (!!currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

})(document, window);