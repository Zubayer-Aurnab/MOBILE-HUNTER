const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`
    https://openapi.programming-hero.com/api/phones?search=${searchText}
    `);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = "";

    const showAllContainer = document.getElementById("show-all");
    if (phones.length > 12){
        showAllContainer.classList.remove("hidden")
    }else{
        showAllContainer.classList.add("hidden")
    }
    // console.log("is show all",isShowAll);
    if(!isShowAll){
        phones = phones.slice(0,12);
    }else{
        showAllContainer.classList.add("hidden")
    }

    
    phones.forEach((phone) => {
        // console.log(phone);
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card  bg-white shadow-xl p-4 text-black`;
        phoneCard.innerHTML = ` 
        <figure>
            <img src=${phone.image} />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS </button>
            </div>
          </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    loadSpinner(false)
};

const handelShowDetails = async (id) =>{  
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json() 
   
    const phoneData = data.data
    ShowModal(phoneData)
    console.log(phoneData);
}

// modal sction

const ShowModal = (phone) =>{
    const title = document.getElementById("modal-titel")
    title.innerText = phone.name 
    const modalContainer = document.getElementById("modal-container")
    
    modalContainer.innerHTML = `
    <img class="mt-8" src=${phone.image} alt="">
    <p class="font-semibold">storage : <span>${phone.mainFeatures.storage}</span></p>
    <p class="font-semibold">Display : <span>${phone.mainFeatures.displaySize}</span></p>
    <p class="font-semibold">Chipset : <span>${phone.mainFeatures.chipSet}</span></p>
    <p class="font-semibold">Memory : <span>${phone.mainFeatures.memory}</span></p>
    <p class="font-semibold">Release data : <span>${phone.releaseDate}</span></p>
    `


    my_modal_5.showModal()
}
// modal sction

// search btn
const handelSearch = (isShowAll) => {
    loadSpinner(true)
    const searchFiled = document.getElementById("search-filed");
    const searchText = searchFiled.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
   
};

// load spinenr 

const loadSpinner = (isLoading) => {
    const Spinner = document.getElementById("spinner");
    if(isLoading){
        Spinner.classList.remove("hidden")
    }
    else{
        Spinner.classList.add("hidden")
    }

}
// handel show all 
const handelShowAll = () =>{
    handelSearch(true)
    const searchFiled = document.getElementById("search-filed");
    searchFiled.value = ""
}


// loadPhone();
