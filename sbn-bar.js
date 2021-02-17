var makeRequest = function(url, sourceElement) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sourceElement.innerHTML = this.responseText;

            }
            if (this.status == 404) {
                sourceElement.innerHTML = "Included html not found.";
            }

            // unwrap
            var parent = sourceElement.parentNode
            while (sourceElement.firstChild) { parent.insertBefore(sourceElement.firstChild, sourceElement)}
            parent.removeChild(sourceElement)

            window.dispatchEvent(new Event("PDSSBN_contentLoaded"))
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

let sbnheader = document.createElement('header')
document.body.prepend(sbnheader)
makeRequest('sbn/sbn-bar.html', sbnheader)