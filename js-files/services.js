
// Einblenden der mobilen Servicedeatails und anschließendes dorthin Scrollen

function openServiceDetailAndScroll(param1, param2) {

    // einblenden
    removeDNone(param1, param2);

    const el = document.getElementById(param1);

    // ein Frame warten, damit Layout neu berechnet ist
    requestAnimationFrame(() => {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    closeOtherServiceDeatails(param1);
}

// Closes other open service Detail Divs
function closeOtherServiceDeatails(param1) {
    let serviceIDs = [
        'serviceDetail_Wegbeschreibungen',
        'serviceDetail_Wissenschaftliche_Forschung',
        'serviceDetail_Wissenschaftliche_Publikationen',
    ];

    serviceIDs.forEach(serviceID => {
        if (param1 != serviceID) {
            // console.log('element nicht vorhanden');
            removeDNone(serviceID, 'add');
        }
    });
}