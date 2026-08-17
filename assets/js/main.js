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

  if (modal.id === "device-modal") {
  showDeviceCategory(
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
    person: "Unknown",

    manifestations: [
      "The Unknown"
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
            manifestationOf
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
      "Charlotte Meets Infant Charlotte · 1971",
      "Claudia Meets Old Claudia · 1987",
      "Final Dinner · 2019",
      "Helge Meets Old Helge · 1986",
      "Helge Meets Young Helge · 1986",
      "Jonas Meets Adam · 1921",
      "Jonas Meets Martha · 1986",
      "Jonas Meets Michael · 2019",
      "Jonas Meets The Stranger · 1986",
      "Martha Meets Eva · 2019"
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
    "#place-modal .place-category-button"
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


/* Time Travel Device categories */

const deviceIndividuals = {
  direct: {
    title: "Direct devices",

    individuals: [
      "Bunker Portal",
      "God Particle",
      "Golden Sphere",
      "Portable Time Machine",
      "Time Travel Chair"
    ]
  },

  cavePassage: {
    title: "Cave Passage",

    individuals: [
      "Cave Passage · Adam World",
      "Cave Passage · Eva World"
    ]
  }
};

const deviceCategoryButtons =
  document.querySelectorAll(
    "#device-modal .device-category-button"
  );

const deviceCategoryTitle =
  document.querySelector(
    "#device-category-title"
  );

const deviceRecordCount =
  document.querySelector(
    "#device-record-count"
  );

const deviceIndividualsList =
  document.querySelector(
    "#device-individuals-list"
  );

const deviceIndividualsScroll =
  document.querySelector(
    "#device-modal .individuals-scroll"
  );

function showDeviceCategory(deviceType) {
  const selectedCategory =
    deviceIndividuals[deviceType];

  if (!selectedCategory) {
    return;
  }

  deviceCategoryTitle.textContent =
    selectedCategory.title;

  const recordWord =
    selectedCategory.individuals.length === 1
      ? "RECORD"
      : "RECORDS";

  deviceRecordCount.textContent =
    `${selectedCategory.individuals.length} ${recordWord}`;

  deviceIndividualsList.replaceChildren();

  selectedCategory.individuals.forEach(
    function (individualName) {
      const listItem =
        document.createElement("li");

      listItem.textContent =
        individualName;

      deviceIndividualsList.appendChild(
        listItem
      );
    }
  );

  deviceIndividualsScroll.scrollTop =
    0;

  deviceCategoryButtons.forEach(
    function (button) {
      const isSelected =
        button.dataset.deviceType === deviceType;

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

deviceCategoryButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        showDeviceCategory(
          button.dataset.deviceType
        );
      }
    );
  }
);

showDeviceCategory(
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

  function resetCaseStudiesCarousel() {
    showCaseStudy(
      0
    );
  }

  resetCaseStudiesCarousel();

    window.addEventListener(
    "pageshow",
    function () {
        requestAnimationFrame(
        resetCaseStudiesCarousel
        );
    }
    );

    let carouselWasVisible =
    false;

    const caseStudiesObserver =
    new IntersectionObserver(
        function (entries) {
        const carouselEntry =
            entries[0];

        if (
            carouselWasVisible &&
            !carouselEntry.isIntersecting
        ) {
            resetCaseStudiesCarousel();
        }

        carouselWasVisible =
            carouselEntry.isIntersecting;
        },
        {
        threshold: 0.05
        }
    );

    caseStudiesObserver.observe(
    caseStudiesCarousel
    );

}

/* Caricamento ttl */

const ttlCode =
  document.querySelector("#ttl-code code");

const ttlDownload =
  document.querySelector("#ttl-download");

const ttlFileUrl =
  new URL(
    "dark_ontology_populated.ttl",
    document.baseURI
  );

let ttlObjectUrl =
  null;

fetch(ttlFileUrl)
  .then(
    function (response) {
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status}`
        );
      }

      return response.text();
    }
  )
  .then(
    function (source) {
      ttlCode.textContent =
        source;

      const ttlBlob =
        new Blob(
          [source],
          {
            type: "text/turtle;charset=utf-8"
          }
        );

      ttlObjectUrl =
        URL.createObjectURL(ttlBlob);

      ttlDownload.href =
        ttlObjectUrl;

      ttlDownload.download =
        "dark_ontology_populated.ttl";
    }
  )
  .catch(
    function (error) {
      ttlCode.textContent =
        "Ontology source unavailable.";

      ttlDownload.removeAttribute(
        "href"
      );

      ttlDownload.setAttribute(
        "aria-disabled",
        "true"
      );

      console.error(
        "Unable to load the ontology:",
        error
      );
    }
  );

window.addEventListener(
  "beforeunload",
  function () {
    if (ttlObjectUrl) {
      URL.revokeObjectURL(
        ttlObjectUrl
      );
    }
  }
);


// ========================================
// QUERY CAROUSEL 
// ========================================

const QUERIES_CONFIG = [
  {
    id: 'CQ1',
    title: 'Multiple Temporal Manifestations',
    competency: 'Which persons have multiple temporal manifestations, and what are those manifestations?',
    queryFile: 'query1.txt',
    resultsFile: 'results1.csv'
  },
  {
    id: 'CQ2',
    title: 'Time Travel Events',
    competency: 'Which time-travel events occur, who travels, and how and when does each journey take place?',
    queryFile: 'query2.txt',
    resultsFile: 'results2.csv'
  },
  {
    id: 'CQ3',
    title: 'Family Relationships',
    competency: 'What family and interpersonal relationships connect each person to others and to their family?',
    queryFile: 'query3.txt',
    resultsFile: 'results3.csv'
  },
  {
    id: 'CQ4a',
    title: 'Events Across Worlds',
    competency: 'Which events occur across the different worlds, when and where do they take place, and who participates in them?',
    queryFile: 'query4a.txt',
    resultsFile: 'results4a.csv'
  },
  {
    id: 'CQ4b',
    title: 'Meetings with oneself',
    competency: 'Which events involve different temporal manifestations of the same person meeting each other?',
    queryFile: 'query4b.txt',
    resultsFile: 'results4b.csv'
  },
  {
    id: 'CQ5',
    title: 'Time Travellers',
    competency: 'Which persons can be automatically classified as time travelers based on their temporal manifestations?',
    queryFile: 'query5.txt',
    resultsFile: 'results5.csv'
  }
];

const GITHUB_BASE_QUERIES = 'https://raw.githubusercontent.com/SicMundusOrganization/dark-ontology/main/queries/';

let currentQueryIndex = 0;
let isQueryLoading = false;

// ========================================
// QUERIES INITIALIZATION
// ========================================

async function initQueryCarousel() {
  const track = document.getElementById('queries-track');
  const dotsContainer = document.getElementById('queries-dots');
  
  if (!track || !dotsContainer) {
    console.warn('Query carousel elements not found');
    return;
  }

  QUERIES_CONFIG.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'queries-dot';
    dot.dataset.index = index;
    dot.setAttribute('aria-label', `Vai alla query ${index + 1}`);
    dot.addEventListener('click', () => goToQuery(index));
    dotsContainer.appendChild(dot);
  });

  await loadQuery(0, false);
  updateDots(0);
}

// ========================================
// EVENT LISTENER 
// ========================================

// Delegazione eventi per i pulsanti inline
document.addEventListener('click', function(e) {
  const prevBtn = e.target.closest('#queries-prev-inline');
  if (prevBtn) {
    e.preventDefault();
    if (currentQueryIndex > 0) {
      goToQuery(currentQueryIndex - 1);
    }
    return;
  }
  
  const nextBtn = e.target.closest('#queries-next-inline');
  if (nextBtn) {
    e.preventDefault();
    if (currentQueryIndex < QUERIES_CONFIG.length - 1) {
      goToQuery(currentQueryIndex + 1);
    }
    return;
  }
});

// ========================================
// LOADING QUERIES
// ========================================

async function loadQuery(index, shouldScroll = true) {
  if (isQueryLoading) return;
  isQueryLoading = true;

  const config = QUERIES_CONFIG[index];
  const track = document.getElementById('queries-track');
  
  if (!track) {
    isQueryLoading = false;
    return;
  }

  track.innerHTML = `
    <div class="query-slide active" data-query-index="${index}">
      <div class="query-loading">Loading query ${config.id}...</div>
    </div>
  `;

  try {
    const [queryText, resultsCSV] = await Promise.all([
      fetchFile(`${GITHUB_BASE_QUERIES}${config.id}/${config.queryFile}`),
      fetchFile(`${GITHUB_BASE_QUERIES}${config.id}/${config.resultsFile}`)
    ]);

    track.innerHTML = renderQueryCard(config, queryText, resultsCSV, index);
    
    if (shouldScroll) {
      requestAnimationFrame(() => {
        const slide = track.querySelector('.query-slide.active');
        if (slide) {
          const headerHeight = 68;
          const slideRect = slide.getBoundingClientRect();
          const scrollTarget = window.scrollY + slideRect.top - headerHeight - 20;
          
          window.scrollTo({
            top: Math.max(0, scrollTarget),
            behavior: 'smooth'
          });
        }
      });
    }
    
  } catch (error) {
    console.error('Error loading query:', error);
    track.innerHTML = `
      <div class="query-slide active" data-query-index="${index}">
        <div class="query-error">
          Error loading query ${config.id}.<br>
          <small style="color: #8f887b; margin-top: 8px; display: block;">${escapeHtml(error.message)}</small>
        </div>
      </div>
    `;
  } finally {
    isQueryLoading = false;
  }
}

async function fetchFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return await response.text();
}

// ========================================
// RENDERIZZAZIONE
// ========================================

function renderQueryCard(config, queryText, resultsCSV, index) {
  const resultsHTML = parseCSVToTable(resultsCSV);
  const totalQueries = QUERIES_CONFIG.length;
  
  return `
    <div class="query-slide active" data-query-index="${index}">
      <div class="dossier-head">
        <span>
          SPARQL QUERY
          <br>
          <b>${config.id}</b>
        </span>
        <span>
          Ref: ${config.id}
          <br>
          Status: Executed
        </span>
      </div>

      <!-- TITOLO SINGOLO (eliminato il duplicato) -->
      <h3 style="margin: 18px 0 0 0; font-family: var(--serif); font-size: clamp(24px, 2.5vw, 36px); font-weight: 400; color: var(--paper);">
        ${escapeHtml(config.title)}
      </h3>

      <!-- COMPETENCY QUESTION CON PULSANTI -->
      <div class="query-competency-with-nav">
        <div class="query-competency">
          <h4>Competency Question</h4>
          <p>${escapeHtml(config.competency)}</p>
        </div>
        
        <!-- PULSANTI DI NAVIGAZIONE -->
        <div class="query-nav-controls">
          <button class="queries-arrow queries-prev-inline" id="queries-prev-inline" aria-label="Previous query" ${index === 0 ? 'disabled' : ''}>
            ←
          </button>
          <span class="query-counter">${index + 1}/${totalQueries}</span>
          <button class="queries-arrow queries-next-inline" id="queries-next-inline" aria-label="Next query" ${index === totalQueries - 1 ? 'disabled' : ''}>
            →
          </button>
        </div>
      </div>

      <!-- CODICE SPARQL -->
      <div class="query-code-wrapper">
        <pre class="query-code"><code>${escapeHtml(queryText)}</code></pre>
      </div>

      <!-- RISULTATI -->
      <div class="query-results-wrapper">
        <h4>Results</h4>
        <div class="query-results">
          ${resultsHTML}
        </div>
      </div>
    </div>
  `;
}

// ========================================
// PARSING CSV IN TABLE
// ========================================

function parseCSVToTable(csv) {
  if (!csv || csv.trim() === '') {
    return '<div style="padding: 20px; color: #8f887b; text-align: center;">No results available.</div>';
  }

  const lines = csv.trim().split('\n');
  if (lines.length === 0) {
    return '<div style="padding: 20px; color: #8f887b; text-align: center;">No results available.</div>';
  }

  // Parsing CSV rispettando le virgolette
  const parseRow = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map(parseRow);

  let table = '<div class="query-results-scroll">'; // Wrapper per lo scroll
  table += '<table><thead><tr>';
  headers.forEach(header => {
    table += `<th>${escapeHtml(header)}</th>`;
  });
  table += '</tr></thead><tbody>';

  if (rows.length === 0) {
    table += '<tr><td colspan="' + headers.length + '" style="text-align: center; color: #8f887b; padding: 20px;">No data rows</td></tr>';
  } else {
    rows.forEach(row => {
      table += '<tr>';
      headers.forEach((_, index) => {
        const value = row[index] || '';
        table += `<td>${escapeHtml(value)}</td>`;
      });
      table += '</tr>';
    });
  }

  table += '</tbody></table>';
  table += '</div>'; // Chiusura wrapper
  
  return table;
}

// ========================================
// UTILITY
// ========================================

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// NAVIGATION
// ========================================

function goToQuery(index) {
  if (index === currentQueryIndex || isQueryLoading) return;
  if (index < 0 || index >= QUERIES_CONFIG.length) return;
  
  currentQueryIndex = index;
  loadQuery(index, true);
  updateDots(index);
}

function updateDots(index) {
  document.querySelectorAll('.queries-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// ========================================
// AVVIA ALL'AVVIO
// ========================================

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQueryCarousel);
} else {
  // DOM già pronto
  initQueryCarousel();
}

// ========================================
// ALTERNATE MANIFESTATIONS POPUP
// ========================================

const alternateManifestations = {
  'Jonas Kahnwald': {
    manifestations: [
      { name: 'Jonas (2019)', age: '16', img: 'assets/img/characters/jonas.png' },
      { name: 'The Stranger (2052)', age: '50', img: 'assets/img/characters/stranger.png' },
      { name: 'Adam (1921)', age: '~84', img: 'assets/img/characters/adam.png' }
    ]
  },
  'Charlotte Doppler': {
    manifestations: [
      { name: 'Infant Charlotte (1971)', age: '0', img: 'assets/img/characters/infantch.png' },
      { name: 'Charlotte (2019)', age: '48', img: 'assets/img/characters/charl.png' }
    ]
  },
  'Elisabeth Doppler': {
    manifestations: [
      { name: 'Elisabeth (2019)', age: '10', img: 'assets/img/characters/elis.png' },
      { name: 'Adult Elisabeth (2052)', age: '43', img: 'assets/img/characters/elisadult.png' }
    ]
  },
  'Claudia Tiedemann': {
    manifestations: [
      { name: 'Young Claudia (1953)', age: '9', img: 'assets/img/characters/claudiayoung.png' },
      { name: 'Claudia (1986)', age: '42', img: 'assets/img/characters/claudia.png' },
      { name: 'Old Claudia (2052)', age: '80', img: 'assets/img/characters/claudiaold.png' }
    ]
  },
  'Helge Doppler': {
    manifestations: [
      { name: 'Young Helge (1953)', age: '9', img: 'assets/img/characters/helgeyoung.png' },
      { name: 'Helge (1986)', age: '42', img: 'assets/img/characters/helge.png' },
      { name: 'Old Helge (2019)', age: '75', img: 'assets/img/characters/helgeold.png' },
    ]
  },
  'Martha Nielsen': {
    manifestations: [
      { name: 'Martha', age: '16', img: 'assets/img/characters/martha.png' },
      { name: 'Eva (Eva World)', age: '80', img: 'assets/img/characters/eva.png' }
    ]
  },
  'Mikkel Nielsen': {
    manifestations: [
      { name: 'Mikkel (2019)', age: '11', img: 'assets/img/characters/mikkel.png' },
      { name: 'Michael Kahnwald (2019)', age: '44', img: 'assets/img/characters/mich.png' }
    ]
  }
};

function createAlternateModal(characterName) {
  const data = alternateManifestations[characterName];
  if (!data) return;

  const existing = document.querySelector('.alternate-modal');
  if (existing) existing.remove();

  const modal = document.createElement('dialog');
  modal.className = 'alternate-modal';
  modal.setAttribute('aria-labelledby', 'alternate-modal-title');

  const manifestationsHtml = data.manifestations.map((m, index) => {
    const isLast = index === data.manifestations.length - 1;
    return `
      <div class="manifestation-wrapper">
        <div class="manifestation-card">
          <img src="${m.img}" alt="${m.name}" loading="lazy">
          <h4>${m.name}</h4>
          <p class="manifestation-detail">Age: ${m.age}</p>
        </div>
        ${!isLast ? `<div class="manifestation-arrow"><span>⟶</span></div>` : ''}
      </div>
    `;
  }).join('');

  modal.innerHTML = `
    <div class="alternate-modal-header">
      <div>
        <p class="modal-label">TEMPORAL MANIFESTATIONS</p>
        <h2 id="alternate-modal-title">${characterName}</h2>
      </div>
      <button class="modal-close" type="button" aria-label="Close">×</button>
    </div>
    <div class="alternate-modal-body">
      <p style="color: #8f887b; font-size: 12px; margin: 0 0 16px;">
        Different temporal manifestations of the same persistent person.
      </p>
      <div class="alternate-manifestation">
        ${manifestationsHtml}
      </div>
    </div>
    <div class="alternate-modal-footer">
      SIC MUNDUS · IDENTITY ARCHIVE
    </div>
  `;

  document.body.appendChild(modal);

  // Close button
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // Close on Escape
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.close();
  });

  modal.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.character-card.has-alternate').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.character-info h4')?.textContent;
      if (name && alternateManifestations[name]) {
        createAlternateModal(name);
      }
    });
  });
});

// ========================================
// COLLAPSIBLE SUBSECTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.doc-subsection.collapsible').forEach(section => {
    const toggle = section.querySelector('.subsection-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isExpanded = section.classList.contains('expanded');
      
      if (isExpanded) {
        
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
       
        window.scrollTo({
          top: sectionTop - 20,
          behavior: 'smooth'
        });
      }
      
      section.classList.toggle('expanded');
      
      
      const textSpan = toggle.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Read more' : 'Read less';
      }
      
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
});