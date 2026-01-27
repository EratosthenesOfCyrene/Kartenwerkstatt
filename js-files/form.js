

const submitBtn = document.getElementById("submitBtn");

function showForm() {
    document.getElementById('formOverlay').classList.add('show-form-overlay');
    removeDNone('formContent', 'remove');
    removeDNone('successDiv', 'add');
    // RESET
    /*const form = document.getElementById("contactForm");
    const formContent = document.querySelector('form-content');
    form.hidden = false;
    formContent.hidden = false;
    successBox.hidden = true;*/
    disableScroll();
    //restoreForm(); // die im Formular gespeicherten Kudeneingaben laden
}

function hideForm() {
    document.getElementById('formOverlay').classList.remove('show-form-overlay');
    enableScroll();
}

function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "";
}


/*
// Succes form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const formContent = document.querySelector(".form-content");
    const successBox = document.querySelector(".form-success");

    if (!form || !formContent || !successBox) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            /*formContent.hidden = true;
            successBox.hidden = false; *//*
formContent.classList.add('d-none');
successBox.classList.remove('d-none');
/*    } else {
alert("Beim Absenden ist ein Fehler aufgetreten.");
}
});
});  */


function closeSuccessAlert() {
    removeDNone('successDiv', 'add');
    /*const successBox = document.querySelector(".form-success");
    successBox.hidden = true; */
    hideForm();
    // document.getElementById('formOverlay').classList.remove('show-form-overlay');
    enableScroll();
}









document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const formContent = document.getElementById("formContent");
    const successDiv = document.getElementById("successDiv");
    const alertDiv = document.getElementById('duplicateConfirmOuter');

    if (!form || !formContent || !successDiv || !alertDiv) return;

    // ---------------------- Storage Keys ----------------------
    const DRAFT_KEY = "draftContactForm";
    const LAST_SUBMIT_KEY = "lastSubmittedForm";

    // ---------------------- Hilfsfunktionen ----------------------

    function collectFormData(form) {
        const fd = new FormData(form);
        const data = {};

        for (let [key, value] of fd.entries()) {
            value = value.trim();

            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    function normalizeData(data) {
        const normalized = {};

        for (const key in data) {
            if (Array.isArray(data[key])) {
                normalized[key] = [...data[key]].sort();
            } else {
                normalized[key] = data[key];
            }
        }

        return JSON.stringify(normalized);
    }

    // ---------------------- Auto-Save ----------------------

    form.addEventListener("input", () => {
        const data = collectFormData(form);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    });

    // ---------------------- Restore ----------------------

    function restoreForm() {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (!saved) return;

        const data = JSON.parse(saved);

        for (const [name, value] of Object.entries(data)) {
            const safeName = CSS.escape(name);
            const fields = form.querySelectorAll(`[name="${safeName}"]`);
            if (!fields.length) continue;

            fields.forEach(field => {
                if (field.type === "checkbox") {
                    if (Array.isArray(value)) {
                        field.checked = value.includes(field.value);
                    } else {
                        field.checked = field.value === value;
                    }
                } else {
                    field.value = value;
                }
            });
        }
    }

    restoreForm();

    // ---------------------- Submit + Duplikat-Check ----------------------
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentData = collectFormData(form);
        const fingerprint = normalizeData(currentData);
        const lastFingerprint = localStorage.getItem(LAST_SUBMIT_KEY);

        // ⚠️ Duplikat erkannt
        if (lastFingerprint === fingerprint) {
            const allowSubmit = await showDuplicateConfirm();
            if (!allowSubmit) {
                return; // 🚫 Nutzer bleibt im Formular
            }
        }

        // ✅ Ab hier darf gesendet werden
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                alert("Beim Absenden ist ein Fehler aufgetreten.");
                return;
            }

            localStorage.setItem(LAST_SUBMIT_KEY, fingerprint);
            localStorage.removeItem(DRAFT_KEY);

            form.reset();
            formContent.classList.add("d-none");
            successDiv.classList.remove("d-none");

        } catch (err) {
            alert("Netzwerkfehler beim Absenden.");
        }
    });



    function showDuplicateConfirm() {
        return new Promise(resolve => {
            const alertDiv = document.getElementById("duplicateConfirmOuter");
            const yesBtn = document.getElementById("confirmYes");
            const noBtn = document.getElementById("confirmNo");

            alertDiv.classList.remove("d-none");
            submitBtn.disabled = true; // "Anfrage Senden"-Button disabled


            function cleanup(result) {
                alertDiv.classList.add("d-none");
                yesBtn.removeEventListener("click", onYes);
                noBtn.removeEventListener("click", onNo);
                resolve(result);
            }

            function onYes() {
                cleanup(true);
                submitBtn.disabled = false; // "Anfrage Senden"-Button enabled
            }

            function onNo() {
                cleanup(false);
                submitBtn.disabled = false; // "Anfrage Senden"-Button enabled
            }

            yesBtn.addEventListener("click", onYes);
            noBtn.addEventListener("click", onNo);
        });
    }







    /*
    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentData = collectFormData(form);
    const fingerprint = normalizeData(currentData);
    const lastFingerprint = localStorage.getItem(LAST_SUBMIT_KEY);

    let allowSubmit = true;

    // ⚠️ Duplikat erkannt
    if (lastFingerprint === fingerprint) {
        allowSubmit = confirm(
            "Diese Anfrage wurde bereits mit identischen Angaben gesendet.\n\nMöchten Sie sie erneut absenden?"
        ); 
        alertDiv.classList.remove('d-none');
    }

    // 🚫 Nutzer hat abgebrochen → KEIN Submit
    if (!allowSubmit) {
        return;
    }

    // ✅ Ab hier ist Senden ausdrücklich erlaubt
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: "application/json" }
        });

        if (!response.ok) {
            alert("Beim Absenden ist ein Fehler aufgetreten.");
            return;
        }

        // Erfolg
        localStorage.setItem(LAST_SUBMIT_KEY, fingerprint);
        localStorage.removeItem(DRAFT_KEY);

        form.reset();
        formContent.classList.add("d-none");
        successDiv.classList.remove("d-none");

    } catch (err) {
        alert("Netzwerkfehler beim Absenden.");
    }
});
/*
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentData = collectFormData(form);
        const fingerprint = normalizeData(currentData);
        const lastFingerprint = localStorage.getItem(LAST_SUBMIT_KEY);

        // ⚠️ Duplikat erkannt
        if (lastFingerprint === fingerprint) {
            const confirmResubmit = confirm(
                "Diese Anfrage wurde bereits mit identischen Angaben gesendet.\n\nMöchten Sie sie erneut absenden?"
            );
            if (!confirmResubmit) return;
        }

        // ✅ Senden
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                alert("Beim Absenden ist ein Fehler aufgetreten.");
                return;
            }

            // Erfolg
            localStorage.setItem(LAST_SUBMIT_KEY, fingerprint);
            localStorage.removeItem(DRAFT_KEY);

            form.reset();
            formContent.classList.add("d-none");
            successDiv.classList.remove("d-none");

        } catch (err) {
            alert("Netzwerkfehler beim Absenden.");
        }
    });*/
});



















/*

// ---------------------- Konfiguration ----------------------
const STORAGE_KEY = "draftContactForm";       // Auto-Save
const LAST_SUBMIT_KEY = "lastSubmittedForm";  // Duplicate-Check
const form = document.getElementById("contactForm");

// ---------------------- Hilfsfunktion: Daten normalisieren ----------------------
function normalizeData(data) {
    const normalized = {};
    for (let key in data) {
        let value = data[key];
        if (Array.isArray(value)) {
            normalized[key] = value.map(v => v.trim()).sort(); // Array sortieren
        } else {
            normalized[key] = value.trim();
        }
    }
    return normalized;
}

// ---------------------- Auto-Save ----------------------
form.addEventListener("input", () => {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        value = value.trim();
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
});

// ---------------------- Restore ----------------------
function restoreForm() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    for (const [name, value] of Object.entries(data)) {
        const fields = form.querySelectorAll(`[name="${name}"]`);
        if (!fields.length) continue;

        fields.forEach((field) => {
            if (field.type === "checkbox") {
                if (Array.isArray(value)) {
                    field.checked = value.includes(field.value);
                } else {
                    field.checked = field.value === value;
                }
            } else {
                field.value = value;
            }
        });
    }
}
restoreForm();

// ---------------------- Modal-Warnung vorbereiten ----------------------
const warningContainer = document.createElement("div");
warningContainer.id = "duplicateWarning";
warningContainer.style.display = "none";
warningContainer.style.padding = "1em";
warningContainer.style.marginBottom = "1em";
warningContainer.style.backgroundColor = "#fff3cd";
warningContainer.style.border = "1px solid #ffeeba";
warningContainer.style.borderRadius = "5px";
warningContainer.style.color = "#856404";
warningContainer.style.fontWeight = "bold";
form.prepend(warningContainer);

// ---------------------- Submit + Duplicate Check ----------------------
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stoppt zunächst den Submit

    const formData = new FormData(form);
    const currentData = {};

    for (let [key, value] of formData.entries()) {
        value = value.trim();
        if (currentData[key]) {
            if (Array.isArray(currentData[key])) {
                currentData[key].push(value);
            } else {
                currentData[key] = [currentData[key], value];
            }
        } else {
            currentData[key] = value;
        }
    }

    const normalizedCurrent = JSON.stringify(normalizeData(currentData));
    const lastSubmitted = localStorage.getItem(LAST_SUBMIT_KEY);

    if (lastSubmitted && lastSubmitted === normalizedCurrent) {
        // ⚡ Zeige Warnung im Modal
        warningContainer.textContent = "Es sieht so aus, als hättest du genau diese Anfrage bereits abgeschickt. Bitte überprüfe, ob du sie wirklich erneut senden willst.";
        warningContainer.style.display = "block";

        // Button zum Fortfahren einfügen, falls noch nicht vorhanden
        if (!document.getElementById("resubmitBtn")) {
            const resubmitBtn = document.createElement("button");
            resubmitBtn.id = "resubmitBtn";
            resubmitBtn.type = "button";
            resubmitBtn.textContent = "Trotzdem senden";
            resubmitBtn.className = "cta-btn form-cta-btn";
            resubmitBtn.style.marginTop = "0.5em";
            warningContainer.appendChild(resubmitBtn);

            resubmitBtn.addEventListener("click", () => {
                localStorage.setItem(LAST_SUBMIT_KEY, normalizedCurrent);
                localStorage.removeItem(STORAGE_KEY);
                form.reset();
                warningContainer.style.display = "none";
                form.submit(); // Formular wirklich absenden
            });
        }

        return; // Stoppt den normalen Submit
    }

    // Kein Duplikat → normal absenden
    localStorage.setItem(LAST_SUBMIT_KEY, normalizedCurrent);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    form.submit();
});

// gespeicherte Daten nach dem Submitten löschen
form.addEventListener("submit", () => {
    // Localstorage leeren
    localStorage.removeItem(STORAGE_KEY);

    // Formular leeren
    form.reset();
});

*/

/*
// eingegebene Daten im Browser speichern, bis Daten submitted wurden
const STORAGE_KEY = "draftContactForm";
const form = document.getElementById("contactForm");

form.addEventListener("input", () => {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        // Arrays speichern
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
});

// gespeicherte Daten Abrufen
function restoreForm() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    for (const [name, value] of Object.entries(data)) {
        const fields = form.querySelectorAll(`[name="${name}"]`);
        if (!fields.length) continue;

        fields.forEach((field) => {
            if (field.type === "checkbox") {
                if (Array.isArray(value)) {
                    field.checked = value.includes(field.value);
                } else {
                    field.checked = field.value === value;
                }
            } else {
                field.value = value;
            }
        });
    }
}

// gespeicherte Daten nach dem Submitten löschen
form.addEventListener("submit", () => {
    // Localstorage leeren
    localStorage.removeItem(STORAGE_KEY);

    // Formular leeren
    form.reset();
});
*/








/*

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successBox = document.querySelector(".form-success");

    if (!form || !successBox) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            form.hidden = true;
            successBox.hidden = false;
        } else {
            alert("Beim Absenden ist ein Fehler aufgetreten.");
        }
    });
}); */