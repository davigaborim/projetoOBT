document.addEventListener("DOMContentLoaded", () => {
  const cardsData = [
    {
      id: 1,
      img: "./img/densidade óssea e muscular.jpeg",
      caption: "Densidade óssea e muscular em microgravidade",
      status: "avariado",
    },
    {
      id: 2,
      img: "./img/radiaçao.jpeg",
      caption: "Materiais resistentes à radiação espacial",
      status: "intacto",
    },
    {
      id: 3,
      img: "./img/fluidos.jpeg",
      caption: "Comportamento de fluidos em microgravidade",
      status: "intacto",
    },
    {
      id: 4,
      img: "./img/mosca.jpeg",
      caption: "Microorganismos em ambiente extremo",
      status: "avariado",
    },
    {
      id: 5,
      img: "./img/microorganismos em ambiente extremo.jpeg",
      caption: "Microrganismos em ambiente extremo",
      status: "intacto",
    },
    {
      id: 6,
      img: "./img/regeneraçao de tecidos.jpeg",
      caption: "Regeneração de tecidos em microgravidade",
      status: "intacto",
    },
    {
      id: 7,
      img: "./img/bacteriapedra.jpeg",
      caption: "Mineração microbiana",
      status: "avariado",
    },
    {
      id: 8,
      img: "./img/cristalizaçao de proteinas.jpeg",
      caption: "Cristalização de proteínas em microgravidade",
      status: "avariado",
    },
    {
      id: 9,
      img: "./img/rabanetes.jpeg",
      caption: "Fazenda espacial",
      status: "avariado",
    },
    {
      id: 10,
      img: "./img/comunicaçao por radio.jpeg",
      caption: "Comunicação por rádio no espaço",
      status: "intacto",
    },
    {
      id: 11,
      img: "./img/trajes espaciais.jpeg",
      caption: "Trajes espaciais aprimorados",
      status: "avariado",
    },
    {
      id: 12,
      img: "./img/chip.jpeg",
      caption: "Tissue chips",
      status: "avariado",
    },
  ]; //definir aq já os itens pra dar pra manipular os dados

  const cardsPerPage = 8; //numero maximo de cards por pagina
  const totalPages = Math.ceil(cardsData.length / cardsPerPage); //aq é só a continha pra calcular a quantidade de paginas
  let currentPage = 1; //setar a pagina inicial em 1

  const sec2 = document.getElementById("sec2"); //aq é definir a pagina "principal" cassio
  const pagination = document.querySelector(".pagination"); //definir pagination

  function renderCards(page) {
    sec2.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToDisplay = cardsData.slice(start, end);
    cardsToDisplay.forEach((card) => {
      const cardHtml = `
        <div class="img-container" data-modal="modal${card.id}">
          <figure>
            <img src="${card.img}" alt="imagem-autoral">
            <figcaption>${card.caption}</figcaption>
            <span class="status ${card.status}">${
        card.status.charAt(0).toUpperCase() + card.status.slice(1)
      }</span>
          </figure>
        </div>
      `;
      sec2.innerHTML += cardHtml;
    });
    addEventListeners();
  }

  function renderPagination() {
    //renderizar o pagination(q definimos la em cima)
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `<a href="#" data-page="${i}">${i}</a>`;
    }
    const pageLinks = pagination.querySelectorAll("a");
    pageLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = parseInt(event.target.getAttribute("data-page"));
        renderCards(currentPage);
        highlightCurrentPage();
      });
    });
  }

  function highlightCurrentPage() {
    //mostrar a pagina atual
    const pageLinks = pagination.querySelectorAll("a");
    pageLinks.forEach((link) => {
      link.classList.remove("active");
      if (parseInt(link.getAttribute("data-page")) === currentPage) {
        link.classList.add("active");
      }
    });
  }

  function addEventListeners() {
    const searchInput = document.querySelector(".search-input");
    const figures = document.querySelectorAll("figure");
    const filterStatus = document.getElementById("filter-status");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      figures.forEach((figure) => {
        const caption = figure
          .querySelector("figcaption")
          .innerText.toLowerCase();
        if (caption.includes(query)) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      });
    });

    filterStatus.addEventListener("change", () => {
      const status = filterStatus.value;
      figures.forEach((figure) => {
        const figureStatus = figure
          .querySelector(".status")
          .classList.contains(status);
        if (status === "all" || figureStatus) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      });
    });

    const imgContainers = document.querySelectorAll(".img-container"); //container de imagem
    const closeButtons = document.querySelectorAll(".close");

    imgContainers.forEach((container) => {
      container.addEventListener("click", () => {
        const modalId = container.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "block";
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
      }
    });

    const addStepButtons = document.querySelectorAll("[id^=add-step]");
    addStepButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = button.id.split("-")[2];
        const newStep = document.getElementById(`new-step-${modalId}`).value;
        if (newStep) {
          const li = document.createElement("li");
          li.innerHTML = `<input type="checkbox" /> ${newStep}`;
          document.getElementById(`steps-list-${modalId}`).appendChild(li);
          document.getElementById(`new-step-${modalId}`).value = "";
          document.getElementById(`new-step-${modalId}`).style.display = "none";
          document.getElementById(`add-step-${modalId}`).style.display = "none";
          document.getElementById(`show-input-${modalId}`).style.display =
            "inline";
        }
      });
    });

    const showInputLinks = document.querySelectorAll("[id^=show-input]");
    showInputLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const modalId = link.id.split("-")[2];
        document.getElementById(`new-step-${modalId}`).style.display =
          "inline-block";
        document.getElementById(`add-step-${modalId}`).style.display =
          "inline-block";
        link.style.display = "none";
      });
    });
  }

  renderCards(currentPage); //currentPage já falamos la em cima sobre isso cassio, tem no docs tb
  renderPagination();
  highlightCurrentPage();
  const openAddCardModal = document.getElementById("open-add-card-modal");
  const addCardModal = document.getElementById("add-card-modal");
  const closeModal = addCardModal.querySelector(".close");

  openAddCardModal.addEventListener("click", () => {
    addCardModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    addCardModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    //"quando clicado -> acontece parara"
    if (event.target == addCardModal) {
      addCardModal.style.display = "none";
    }
  });
});
