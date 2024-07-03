window.onload = function() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenWidth >= 800) {
            window.location.href = 'pc.html';
        } else {
            window.location.href = 'mobile.html';
        }
    };