

function loadFullscreenServicesPage(param) {
    let imgPath = param;
    removeDNone('fullscreemImgDivOuterServicePage', 'remove');
    document.getElementById('fulscreenImg').src = imgPath;
    disableScroll();
}

function closeFullscreenServicePage(param) {
    removeDNone('fullscreemImgDivOuterServicePage', 'add');
    enableScroll();
}



