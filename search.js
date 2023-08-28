const pracDataLoad = async (searchData = "13", isShowProduct) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchData}`
  );
  const data = await res.json();
  const dataCall = data.data;
  funLoadedData(dataCall, isShowProduct);
};

const funLoadedData = (dataItems, isShowProduct) => {
  const outputLocation = document.getElementById("card_container");
  outputLocation.textContent = "";

  const showAllButton = document.getElementById("show_container");
  if (dataItems.length > 10 && !isShowProduct) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  if (!isShowProduct) {
    dataItems = dataItems.slice(0, 10);
  }

  for (let element of dataItems) {
    const createDiv = document.createElement("div");
    createDiv.classList = `card w-96 bg-base-100 shadow-xl p-5`;
    createDiv.innerHTML = `
    <figure><img src="${element.image}" /></figure>
    <div class="card-body">
      <h3 class = "text-xl font-semibold">${element.phone_name}</h3>
      <p>There are many variations of passages of available, but the majority have suffered?</p>
      <h2 class ="text-center text-2xl font-semibold">$421</h2>
      <div class="card-actions justify-center">
        <button onclick = "modalDataDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    outputLocation.appendChild(createDiv);
  }
  loadingSearch(false);
};

const btnSearchClick = (isShowProduct) => {
  loadingSearch(true);
  const inputField = document.getElementById("input_Field");
  const values = inputField.value;
  pracDataLoad(values, isShowProduct);
};

const loadingSearch = (isLoadding) => {
  const toggleLoading = document.getElementById("search_loading");
  if (isLoadding) {
    toggleLoading.classList.remove("hidden");
  } else {
    toggleLoading.classList.add("hidden");
  }
};

const productShowAll = () => {
  btnSearchClick(true);
};

const modalDataDetails = async (phoneDetails) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${phoneDetails}`
  );
  const detailsData = await res.json();
  const phoneData = detailsData.data;
  productDetails(phoneData);
};

const productDetails = (phone) => {
  const modalLocation = document.getElementById("product-details-showModal");
  const createModalDiv = document.createElement("div");
  createModalDiv.innerHTML = `
  <img class = "justify-center" src="${phone.image}" alt="">
    <h3 class="font-bold text-lg">${phone.name}</h3>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h5>Storage: ${phone.mainFeatures?.storage}</h5>
    <h5>Display Size: ${phone.mainFeatures?.displaySize}</h5>
    <h5>Chipset: ${phone.mainFeatures?.chipSet}</h5>
    <h5>Slug: ${phone?.slug}</h5>
    <h5>Release data: ${phone?.releaseDate}</h5>
    <h5>Brand: ${phone?.brand}</h5>
    <h5>GPS: ${phone.others?.GPS}</h5>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
    `;
  modalLocation.appendChild(createModalDiv);
  my_modal_1.showModal();
};

pracDataLoad();
