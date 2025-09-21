// Select all nav links
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove("active"));
    // Add active to the clicked one
    link.classList.add("active");
  });
});

// LIST OF PROGRAMS TABS

let listOfPrograms = []; // store CSV data globally

Papa.parse("./list-of-programs-category.csv", {
  download: true,
  header: true,
  complete: function (results) {
    console.log("CSV Loaded ✅", results.data); // <--- log
    listOfPrograms = results.data.filter((row) => row.PROGRAM);
    console.log("Filtered Programs ✅", listOfPrograms); // <--- log
    renderCards(listOfPrograms);
  },
});

function renderCards(data) {
  console.log("Rendering cards for:", data.length, "programs"); // <--- log

  const categories = [
    "tech",
    "it",
    "biz",
    "edu",
    "culinary",
    "creative",
    "agri",
    "tourism",
    "health",
  ];
  categories.forEach((cat) => {
    const container = document.querySelector(`#${cat} .row`);
    if (container) container.innerHTML = "";
  });

  data.forEach((row) => {
    console.log("Placing card in:", row.CATEGORY); // <--- log

    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-3";

    card.innerHTML = `
      <div class="card h-100 shadow-sm text-center p-3 pop-up">
        <img src="./Asset/programs/${row.IMAGE}" class="card-img-top img-fixed">
        <h5 class="fs-5 my-3">${row.PROGRAM}</h5>
        <span  class="fw-semibold fs-6 mb-3 text-danger">${row.TAHAP}</span>
        <p>${row.DESCRIPTION || ""}</p>
      </div>
    `;

    const container = document.querySelector(`#${row.CATEGORY} .row`);
    if (container) {
      container.appendChild(card);
    } else {
      console.warn("⚠️ No container found for:", row.CATEGORY);
    }
  });
}

AOS.init();
