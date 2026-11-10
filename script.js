/* =====================================
   NEXUS CITY
   JAVASCRIPT
===================================== */


/* =====================================
   PRELOADER
===================================== */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(function () {
            preloader.classList.add("hide");
        }, 700);

    }

});


/* =====================================
   MENU MOBILE
===================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });


    const links = nav.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/* =====================================
   SIMULADOR DE ENCHENTES
===================================== */

const waterSlider = document.getElementById("waterSlider");
const water = document.getElementById("water");
const waterValue = document.getElementById("waterValue");
const systemStatus = document.getElementById("systemStatus");
const simMessage = document.getElementById("simMessage");

function updateWaterLevel() {

    if (
        !waterSlider ||
        !water ||
        !waterValue ||
        !systemStatus ||
        !simMessage
    ) {
        return;
    }

    const level = Number(waterSlider.value);

    water.style.height = level + "%";
    waterValue.textContent = level;

    systemStatus.classList.remove(
        "safe",
        "warning",
        "danger"
    );

    if (level < 40) {

        systemStatus.classList.add("safe");

        systemStatus.textContent =
            "SITUAÇÃO NORMAL";

        simMessage.textContent =
            "O nível da água está seguro. Nenhum alerta é necessário.";

    } else if (level < 70) {

        systemStatus.classList.add("warning");

        systemStatus.textContent =
            "ATENÇÃO";

        simMessage.textContent =
            "O nível da água está aumentando. O sistema recomenda monitoramento.";

    } else {

        systemStatus.classList.add("danger");

        systemStatus.textContent =
            "NÍVEL CRÍTICO";

        simMessage.textContent =
            "Alerta! O sistema identificou risco de enchente e recomenda uma resposta rápida.";

    }

}

if (waterSlider) {

    waterSlider.addEventListener(
        "input",
        updateWaterLevel
    );

    updateWaterLevel();

}


/* =====================================
   FORMULÁRIO DA EQUIPE
===================================== */

const teamName = document.getElementById("teamName");
const className = document.getElementById("className");
const members = document.getElementById("members");
const saveTeam = document.getElementById("saveTeam");
const savedMessage = document.getElementById("savedMessage");

function loadTeamData() {

    try {

        const savedData =
            localStorage.getItem("nexusCityTeam");

        if (!savedData) {
            return;
        }

        const data = JSON.parse(savedData);

        if (teamName) {
            teamName.value = data.teamName || "";
        }

        if (className) {
            className.value = data.className || "";
        }

        if (members) {
            members.value = data.members || "";
        }

    } catch (error) {

        console.log(
            "Não foi possível carregar os dados da equipe."
        );

    }

}

if (saveTeam) {

    saveTeam.addEventListener("click", function () {

        const data = {

            teamName: teamName
                ? teamName.value.trim()
                : "",

            className: className
                ? className.value.trim()
                : "",

            members: members
                ? members.value.trim()
                : ""

        };

        try {

            localStorage.setItem(
                "nexusCityTeam",
                JSON.stringify(data)
            );

            if (savedMessage) {

                savedMessage.textContent =
                    "✓ Informações salvas neste dispositivo!";

            }

            showToast(
                "Informações da equipe salvas!"
            );

        } catch (error) {

            if (savedMessage) {

                savedMessage.textContent =
                    "Não foi possível salvar os dados.";

            }

        }

    });

}

loadTeamData();


/* =====================================
   TOAST
===================================== */

const toast = document.getElementById("toast");

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================
   BOTÃO VOLTAR AO TOPO
===================================== */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function () {

    if (!backTop) {
        return;
    }

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================
   ANIMAÇÃO DOS CARDS
===================================== */

const cards = document.querySelectorAll(
    ".problem-card, .tech-card, .benefit, .risk-card, .security-grid > div"
);

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


cards.forEach(function (card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});


/* =====================================
   ANO AUTOMÁTICO NO CONSOLE
===================================== */

console.log(
    "NEXUS CITY iniciado com sucesso."
);

console.log(
    "Sistema IoT: ONLINE"
);