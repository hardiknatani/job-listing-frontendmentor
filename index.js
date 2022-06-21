const main = document.getElementById("main");
const filtersTab = document.getElementById("filtersTab")
const filters =[]
const labelSectionArray = document.getElementsByClassName("labelSection")


async function getData(data) {
  const resp = await fetch(data);
  const respData = await resp.json();

  // console.log(respData)
  displayJobs(respData);
}

displayJobs = (data) => {
  // console.log(data)
  data.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job");
    jobElement.classList.add("job");
    jobElement.appendChild(createCompanyLogoSection(job.logo));
    jobElement.appendChild(
      createJobDetailsSection(
        job.company,
        job.position,
        job.postedAt,
        job.contract,
        job.location
      )
    );
    jobElement.appendChild(
      createLabelSection([job.role, job.level, ...job.languages, ...job.tools])
    );
    jobElement.setAttribute("data-labels",[job.role, job.level, ...job.languages, ...job.tools])
    main.appendChild(jobElement);
  });
};

const createCompanyLogoSection = (imagePath) => {
  const companyLogoSection = document.createElement("div");
  companyLogoSection.classList.add("logo__container");
  companyLogoSection.innerHTML = `
  <img class="img" src=${imagePath}>
  `;
  //   comp
  return companyLogoSection;
};

const createJobDetailsSection = (
  company,
  position,
  postedAt,
  contract,
  location
) => {
  const jobDetailsSection = document.createElement("div");
  jobDetailsSection.classList.add("description");
  jobDetailsSection.innerHTML = `
    <p class = "company">${company}</p>
    <p class = "position">${position}</p>
<div>
<p class = "postedAt">${postedAt} • </p>

<p class = "contract"> ${contract} • </p>

<p class = "location"> ${location}</p>
</div>
    `;

  return jobDetailsSection;
};

function createLabel(label){
    const labelElement = document.createElement("button");
    labelElement.classList.add("label");
    labelElement.innerText = label;
    labelElement.addEventListener("click",addFilters)
    return labelElement
}



const createLabelSection = (labelsArray) => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("labelSection")
  labelsArray.forEach((label) => {
   labelContainer.appendChild(createLabel(label)  )
   })
  return labelContainer;
};


function addFilters(event){
    const labelSelected = event.target.innerText;

    if(!filters.includes(labelSelected)){
        filters.push(labelSelected)
        updateFiltersTab(filters)
        updateCards(filters)
        
    }
    console.log(filters)

}

function removeFilter(event){
const labelSelected = event.target.innerText
console.log(labelSelected)
filters.findIndex((filter)=>{
return filter ==labelSelected
})
filters.splice(filters.findIndex((filter)=>{
    return filter ==labelSelected
    }),1)
console.log(filters)
updateFiltersTab(filters)
updateCards(filters)
}

function updateFiltersTab(filtersApplied){

    filtersTab.innerHTML = ""

    if (filtersApplied.length > 0) {
        filtersTab.style.visibility="visible"
        filtersApplied.forEach((filter) => {
            const filterContainer = document.createElement("div");
            filterContainer.classList.add("filter__container");

            const filterLabel = document.createElement("span");
            filterLabel.innerText = filter;
            filterLabel.classList.add("filter_label");

            filterContainer.addEventListener("click", removeFilter);

            filterContainer.appendChild(filterLabel);
            const removeIconContainer = document.createElement("a");
            removeIconContainer.classList.add("remove__icon");
            removeIconContainer.insertAdjacentHTML("beforeend", "<img src='images/icon-remove.svg'>")

            filterContainer.appendChild(removeIconContainer);
            
            filtersTab.appendChild(filterContainer)
        })
    } else {
        filtersTab.style.visibility= "hidden"
    }

    
}

function updateCards(filters) {
  const cards = [...document.getElementsByClassName("job")]

  cards.forEach((cardElement) => {
    const cardLabels = cardElement.getAttribute("data-labels");
    let isValidFilter = true;
    filters.forEach((filter) => {
        if (!cardLabels.includes(filter)) {
          isValidFilter = false;
        }
        
      })

      if(isValidFilter){
        cardElement.style.visibility="visible"
      }else{
        cardElement.style.visibility="hidden"
        cardElement.style.display="none"


      }
  
  });
}










getData("data.json");
