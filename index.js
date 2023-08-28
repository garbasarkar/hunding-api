const loadPhone = async (searchTextItems = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchTextItems}`
  );
  const data = await res.json();
  const phones = data.data;
  outPutBrowPho(phones, isShowAll);
};
const outPutBrowPho = (items, isShowAll) => {
  const outputLocation = document.getElementById("phone-container");
  outputLocation.textContent = "";

  const showAll = document.getElementById("showAllBtn");
  if (items.length > 10 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //   console.log("browser for output result....", isShowAll);
  if (!isShowAll) {
    items = items.slice(0, 10);
  }
  items.forEach((element) => {
    // console.log(element);
    const createDiv = document.createElement("div");
    createDiv.classList = `card bg-[lightskyblue] p-5 shadow-xl`;
    createDiv.innerHTML = `
    <figure><img src="${element.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${element.phone_name}</h2>
      <p></p>
      <div class="card-actions justify-end">
        <button onclick = "modalDetailsShow('${element.slug}')"class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    outputLocation.appendChild(createDiv);
  });
  toggleLoading(false);
};

// btn button modal show
const modalDetailsShow = async (id) => {
  //   console.log("ldsfjoisdjflkdsjfoijf", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const productDetails = await res.json();

  const modalData = productDetails.data;

  showPhoneDetails(modalData);
};

const showPhoneDetails = (phone) => {
  // console.log(phone);
  const modalDetailsPhone = document.getElementById("show-phone-details");
  modalDetailsPhone.innerHTML = `
  <img class = "style" src="${phone.image}" alt="">
  <h3 class="font-bold text-lg">${phone.name}</h3>
  <p class="py-4">Press ESC key or click the button below to close</p>
  <h5>storage: ${phone.mainFeatures.storage}</h5>
  <h5>Display Size: ${phone.mainFeatures?.displaySize}</h5>
  <h5>Chipset: ${phone.mainFeatures?.chipSet}</h5>
  <h5>Memory: ${phone.mainFeatures?.memory}</h5>
  <h5>Slug: ${phone.mainFeatures?.slug}</h5>
  <h5>Release data: ${phone.others?.releaseDate}</h5>
  <h5>Brand: ${phone.brand}</h5>
  <h5>GPS: ${phone.others?.GPS}</h5>
  <div class="modal-action">
      
    <button class="btn">Close</button>
  </div>
  `;
  my_modal_5.showModal();
};

const eventHeander = (isShowAll) => {
  toggleLoading(true);
  const add = document.getElementById("search-field");
  const addText = add.value;
  loadPhone(addText, isShowAll);
};

const toggleLoading = (isTrue) => {
  const loadding = document.getElementById("LoadingSpener");
  if (isTrue) {
    loadding.classList.remove("hidden");
  } else {
    loadding.classList.add("hidden");
  }
};

const btnShowAllPro = () => {
  eventHeander(true);
};

loadPhone();
