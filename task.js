const dataLoad = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/01`
  );
  const resData = await res.json();
  const data = resData.data;
  funLoadData(data);
};

const funLoadData = (items) => {
  const taskContainer = document.getElementById('task-container');
  
//   items.forEach(element => {
    const teskCreateContai = document.createElement('div');
  teskCreateContai.classList = `card card-compact w-96 bg-base-100 shadow-xl`;
  teskCreateContai.innerHTML = `
  <figure><img src="${items.image_link}" /></figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
  `;
  taskContainer.appendChild = teskCreateContai;
//   })
};
dataLoad();
