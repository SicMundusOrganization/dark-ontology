/* Pop-up individuals */

const ontologyCards =
  document.querySelectorAll(".ontology-card");

const ontologyModals =
  document.querySelectorAll(".ontology-modal");

let lockedScrollPosition =
  0;

let activeOntologyCard =
  null;

function openOntologyModal(card) {
  const modalId =
    card.dataset.modalId;

  const modal =
    document.getElementById(modalId);

  const individualsScroll =
    modal.querySelector(".individuals-scroll");

  activeOntologyCard =
    card;

  lockedScrollPosition =
    window.scrollY;

  document.documentElement.classList.add(
    "modal-open"
  );

  document.body.classList.add(
    "modal-open"
  );

  document.body.style.top =
    `-${lockedScrollPosition}px`;

  modal.showModal();

  if (modal.id === "event-modal") {
    showEventSubclass(
      "apocalypse"
    );
  }

  if (modal.id === "place-modal") {
    showPlaceCategory(
      "direct"
    );
  }

  requestAnimationFrame(
    function () {
      if (individualsScroll) {
        individualsScroll.scrollTop =
          0;
      }
    }
  );
}

function closeOntologyModal(modal) {
  const previousScrollBehavior =
    document.documentElement.style.scrollBehavior;

  document.documentElement.style.scrollBehavior =
    "auto";

  modal.close();

  document.documentElement.classList.remove(
    "modal-open"
  );

  document.body.classList.remove(
    "modal-open"
  );

  document.body.style.top =
    "";

  window.scrollTo(
    0,
    lockedScrollPosition
  );

  if (activeOntologyCard) {
    activeOntologyCard.focus({
      preventScroll: true
    });
  }

  activeOntologyCard =
    null;

  requestAnimationFrame(
    function () {
      document.documentElement.style.scrollBehavior =
        previousScrollBehavior;
    }
  );
}

ontologyCards.forEach(
  function (card) {
    card.addEventListener(
      "click",
      function () {
        openOntologyModal(card);
      }
    );
  }
);

ontologyModals.forEach(
  function (modal) {
    const closeButton =
      modal.querySelector(".modal-close");

    closeButton.addEventListener(
      "click",
      function () {
        closeOntologyModal(modal);
      }
    );

    modal.addEventListener(
      "click",
      function (event) {
        if (event.target === modal) {
          closeOntologyModal(modal);
        }
      }
    );

    modal.addEventListener(
      "cancel",
      function (event) {
        event.preventDefault();

        closeOntologyModal(modal);
      }
    );
  }
);

/*/ Pop up Person Manifestation /*/
/* Person manifestations */

const manifestationData = [
  {
    person: "Jonas Kahnwald",

    manifestations: [
      "Jonas 2019",
      "The Stranger",
      "Adam"
    ]
  },

  {
    person: "Claudia Tiedemann",

    manifestations: [
      "Young Claudia",
      "Claudia",
      "Old Claudia"
    ]
  },

  {
    person: "Helge Doppler",

    manifestations: [
      "Young Helge",
      "Helge",
      "Old Helge"
    ]
  },

  {
    person: "Charlotte Doppler",

    manifestations: [
      "Infant Charlotte",
      "Charlotte"
    ]
  },

  {
    person: "Elisabeth Doppler",

    manifestations: [
      "Elisabeth",
      "Adult Elisabeth"
    ]
  },

  {
    person: "Mikkel Nielsen",

    manifestations: [
      "Mikkel 2019",
      "Michael 2019"
    ]
  },

  {
    person: "Martha Nielsen · Eva World",

    manifestations: [
      "Martha 2019 · Eva World",
      "Eva"
    ]
  },

  {
    person: "Martha Nielsen · Adam World",

    manifestations: [
      "Martha 2019 · Adam World"
    ]
  },

  {
    person: "Agnes Nielsen",

    manifestations: [
      "Agnes"
    ]
  },

  {
    person: "Bartosz Tiedemann",

    manifestations: [
      "Bartosz"
    ]
  },

  {
    person: "Egon Tiedemann",

    manifestations: [
      "Egon"
    ]
  },

  {
    person: "Erik Obendorf",

    manifestations: [
      "Erik"
    ]
  },

  {
    person: "Franziska Doppler",

    manifestations: [
      "Franziska"
    ]
  },

  {
    person: "Hannah Kahnwald",

    manifestations: [
      "Hannah"
    ]
  },

  {
    person: "H. G. Tannhaus",

    manifestations: [
      "Tannhaus"
    ]
  },

  {
    person: "Ines Kahnwald",

    manifestations: [
      "Ines"
    ]
  },

  {
    person: "Katharina Nielsen",

    manifestations: [
      "Katharina"
    ]
  },

  {
    person: "Mads Nielsen",

    manifestations: [
      "Mads"
    ]
  },

  {
    person: "Magnus Nielsen",

    manifestations: [
      "Magnus"
    ]
  },

  {
    person: "Noah Tauber",

    manifestations: [
      "Noah"
    ]
  },

  {
    person: "Peter Doppler",

    manifestations: [
      "Peter"
    ]
  },

  {
    person: "Regina Tiedemann",

    manifestations: [
      "Regina"
    ]
  },

  {
    person: "Silja Tiedemann",

    manifestations: [
      "Silja"
    ]
  },

  {
    person: "Ulrich Nielsen",

    manifestations: [
      "Ulrich"
    ]
  },

  {
    person: "Yasin Friese",

    manifestations: [
      "Yasin"
    ]
  }
];

const manifestationGroups =
  document.querySelector(
    "#manifestation-groups"
  );

const manifestationPersonCount =
  document.querySelector(
    "#manifestation-person-count"
  );

const manifestationRecordCount =
  document.querySelector(
    "#manifestation-record-count"
  );

function renderManifestationGroups() {
  manifestationGroups.replaceChildren();

  let totalManifestations =
    0;

  manifestationData.forEach(
    function (group, groupIndex) {
      totalManifestations +=
        group.manifestations.length;

      const article =
        document.createElement("article");

      article.className =
        "manifestation-group";

      const personBlock =
        document.createElement("div");

      personBlock.className =
        "manifestation-person";

      const personIndex =
        document.createElement("small");

      personIndex.textContent =
        String(groupIndex + 1).padStart(
          2,
          "0"
        );

      const personLabel =
        document.createElement("span");

      personLabel.textContent =
        "Persistent person";

      const personName =
        document.createElement("h3");

      personName.textContent =
        group.person;

      personBlock.append(
        personIndex,
        personLabel,
        personName
      );

      const relationship =
        document.createElement("div");

      relationship.className =
        "manifestation-relationship";

      relationship.innerHTML = `
        <span>
            isManifestationOf
        </span>

        <i aria-hidden="true"></i>
        `;

      const manifestationsBlock =
        document.createElement("div");

      manifestationsBlock.className =
        "manifestation-items";

      group.manifestations.forEach(
        function (manifestationName) {
          const item =
            document.createElement("div");

          item.className =
            "manifestation-item";

          const label =
            document.createElement("small");

          label.textContent =
            "Person Manifestation";

          const name =
            document.createElement("strong");

          name.textContent =
            manifestationName;

          item.append(
            label,
            name
          );

          manifestationsBlock.appendChild(
            item
          );
        }
      );

     article.append(
     manifestationsBlock,
     relationship,
     personBlock
     );

      manifestationGroups.appendChild(
        article
      );
    }
  );

  manifestationPersonCount.textContent =
    manifestationData.length;

  manifestationRecordCount.textContent =
    totalManifestations;
}

renderManifestationGroups();


/* Event subclasses */

const eventIndividuals = {
  apocalypse: {
    title: "Apocalypse Event",

    individuals: [
      "Apocalypse 2019 · Eva World",
      "Apocalypse 2020 · Adam World"
    ]
  },

  disappearance: {
    title: "Disappearance Event",

    individuals: [
      "Erik Obendorf Disappearance · 2019",
      "Mads Nielsen Disappearance · 1986",
      "Mikkel Disappearance · 2019",
      "Yasin Friese Disappearance · 2019"
    ]
  },

  meeting: {
    title: "Meeting Event",

    individuals: [
      "Jonas Meets Adam · 1921"
    ]
  },

  timeTravel: {
    title: "Time Travel Event",

    individuals: [
      "Adam Travel 01 · 1921 → 2020",
      "Adam Travel 02 · 2053 → 2020",
      "Adam Travel 03 · 2020 → 2019",
      "Adam Travel 04 · 2019 → 2052",

      "Bartosz Travel 01 · 2020 → 1987",
      "Bartosz Travel 02 · 1987 → 2020",

      "Charlotte Travel 01 · 2020 → 2053",

      "Claudia Travel 01 · 1987 → 2020",
      "Claudia Travel 02 · 2020 → 1987",

      "Elisabeth and Charlotte Travel 01 · 2053 → 2041",
      "Elisabeth and Charlotte Travel 02 · 2041 → 1971",

      "Hannah Travel 01 · 2020 → 1954",

      "Jonas Final Travel 01 · 2019 → 1986",
      "Jonas Final Travel 02 · 1986 → 1971",

      "Jonas Travel 01 · 2019 → 1986",
      "Jonas Travel 02 · 1986 → 2019",
      "Jonas Travel 03 · 2019 → 1986",
      "Jonas Travel 04 · 1986 → 2052",
      "Jonas Travel 05 · 2053 → 1921",
      "Jonas Travel 06 · 1921 → 2019",
      "Jonas Travel 07 · 1987 → 2020",
      "Jonas Travel 08 · 2020 → 2019",
      "Jonas Travel 09 · 2019 → 2052",
      "Jonas Travel 10 · 2052 → 2019",

      "Katharina Travel 01 · 2020 → 1987",

      "Martha Travel 01 · 2019 → 1888",
      "Martha Travel 02 · 1888 → 2053",

      "Mikkel Travel · 2019 → 1986",

      "Noah Travel 01 · 2020 → 1920",

      "Old Claudia Travel 01 · 2053 → 1987",
      "Old Claudia Travel 02 · 1987 → 1954",

      "Old Helge Travel 01 · 2019 → 1986",

      "Stranger Travel 01 · 2052 → 2019",
      "Stranger Travel 02 · 2019 → 1986",
      "Stranger Travel 03 · 1986 → 2019",
      "Stranger Travel 04 · 2020 → 1987",
      "Stranger Travel 05 · 1987 → 2020",
      "Stranger Travel 06 · 2020 → 1888",

      "Ulrich Travel 01 · 2019 → 1953",

      "Young Helge Travel 01 · 1953 → 1986",
      "Young Helge Travel 02 · 1986 → 1954"
    ]
  }
};

const eventSubclassButtons =
  document.querySelectorAll(
    ".event-subclass-button"
  );

const eventSubclassTitle =
  document.querySelector(
    "#event-subclass-title"
  );

const eventRecordCount =
  document.querySelector(
    "#event-record-count"
  );

const eventIndividualsList =
  document.querySelector(
    "#event-individuals-list"
  );

const eventIndividualsScroll =
  document.querySelector(
    "#event-modal .individuals-scroll"
  );

function showEventSubclass(eventType) {
  const selectedSubclass =
    eventIndividuals[eventType];

  eventSubclassTitle.textContent =
    selectedSubclass.title;

  const recordWord =
    selectedSubclass.individuals.length === 1
      ? "RECORD"
      : "RECORDS";

  eventRecordCount.textContent =
    `${selectedSubclass.individuals.length} ${recordWord}`;

  eventIndividualsList.replaceChildren();

  selectedSubclass.individuals.forEach(
    function (individualName) {
      const listItem =
        document.createElement("li");

      listItem.textContent =
        individualName;

      eventIndividualsList.appendChild(
        listItem
      );
    }
  );

  eventIndividualsScroll.scrollTop =
    0;

  eventSubclassButtons.forEach(
    function (button) {
      const isSelected =
        button.dataset.eventType === eventType;

      button.classList.toggle(
        "is-active",
        isSelected
      );

      button.setAttribute(
        "aria-selected",
        String(isSelected)
      );
    }
  );
}

eventSubclassButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        showEventSubclass(
          button.dataset.eventType
        );
      }
    );
  }
);

showEventSubclass(
  "apocalypse"
);


/* Place categories */

const placeIndividuals = {
  direct: {
    title: "Direct Places",

    individuals: [
      "Doppler Bunker",
      "Sic Mundus Headquarters",
      "Winden",
      "Winden Cave",
      "Winden Nuclear Plant"
    ]
  },

  interworld: {
    title: "Interworld Space",

    individuals: [
      "Between Worlds"
    ]
  }
};

const placeCategoryButtons =
  document.querySelectorAll(
    ".place-category-button"
  );

const placeCategoryTitle =
  document.querySelector(
    "#place-category-title"
  );

const placeRecordCount =
  document.querySelector(
    "#place-record-count"
  );

const placeIndividualsList =
  document.querySelector(
    "#place-individuals-list"
  );

const placeIndividualsScroll =
  document.querySelector(
    "#place-modal .individuals-scroll"
  );

function showPlaceCategory(placeType) {
  const selectedCategory =
    placeIndividuals[placeType];

  placeCategoryTitle.textContent =
    selectedCategory.title;

  const recordWord =
    selectedCategory.individuals.length === 1
      ? "RECORD"
      : "RECORDS";

  placeRecordCount.textContent =
    `${selectedCategory.individuals.length} ${recordWord}`;

  placeIndividualsList.replaceChildren();

  selectedCategory.individuals.forEach(
    function (individualName) {
      const listItem =
        document.createElement("li");

      listItem.textContent =
        individualName;

      placeIndividualsList.appendChild(
        listItem
      );
    }
  );

  placeIndividualsScroll.scrollTop =
    0;

  placeCategoryButtons.forEach(
    function (button) {
      const isSelected =
        button.dataset.placeType === placeType;

      button.classList.toggle(
        "is-active",
        isSelected
      );

      button.setAttribute(
        "aria-selected",
        String(isSelected)
      );
    }
  );
}

placeCategoryButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        showPlaceCategory(
          button.dataset.placeType
        );
      }
    );
  }
);

showPlaceCategory(
  "direct"
);


/* Case study carousel */

const caseStudiesCarousel =
  document.querySelector(
    "#case-studies"
  );

if (caseStudiesCarousel) {
  const caseStudiesTrack =
    caseStudiesCarousel.querySelector(
      ".case-studies-track"
    );

  const caseStudySlides =
    caseStudiesCarousel.querySelectorAll(
      ".case-study-slide"
    );

  const nextCaseButtons =
    caseStudiesCarousel.querySelectorAll(
      "[data-case-next]"
    );

  const previousCaseButtons =
    caseStudiesCarousel.querySelectorAll(
      "[data-case-previous]"
    );

  let activeCaseStudy =
    0;

  function showCaseStudy(caseStudyIndex) {
    const lastCaseStudyIndex =
      caseStudySlides.length - 1;

    activeCaseStudy =
      Math.max(
        0,
        Math.min(
          caseStudyIndex,
          lastCaseStudyIndex
        )
      );

    caseStudiesTrack.style.transform =
      `translate3d(-${activeCaseStudy * 100}%, 0, 0)`;

    caseStudySlides.forEach(
      function (slide, slideIndex) {
        const isActive =
          slideIndex === activeCaseStudy;

        slide.setAttribute(
          "aria-hidden",
          String(!isActive)
        );

        if ("inert" in slide) {
          slide.inert =
            !isActive;
        }
      }
    );
  }

  nextCaseButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          showCaseStudy(
            activeCaseStudy + 1
          );
        }
      );
    }
  );

  previousCaseButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          showCaseStudy(
            activeCaseStudy - 1
          );
        }
      );
    }
  );

  showCaseStudy(
    0
  );
}

/* Caricamento ttl */
const ttlCode =
  document.querySelector("#ttl-code code");

fetch("../dark_ontology_populated.ttl")
  .then(
    function (response) {
      if (!response.ok) {
        throw new Error(
          "Impossibile caricare il file TTL."
        );
      }

      return response.text();
    }
  )
  .then(
    function (ontologySource) {
      ttlCode.textContent =
        ontologySource;
    }
  )
  .catch(
    function (error) {
      ttlCode.textContent =
        "Ontology source unavailable.";

      console.error(error);
    }
  );