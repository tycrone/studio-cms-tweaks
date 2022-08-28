(function () {
    let base = `https://${location.hostname}`;

    if (!base.includes('.s4')) {
        let index = base.indexOf('q4web');
        if (index > -1) {
            base = base.substr(0, index) + 's4.' + base.substr(index, base.length);
        }
    }
    location.href = base + "/admin/studio/#/?pageMenuOpen=true";
})();