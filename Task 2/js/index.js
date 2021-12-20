let upload = document.querySelector(".upload");
let image = document.querySelector(".image")
let nameInput = document.getElementById("nameInput");
let surnameInput = document.getElementById("surnameInput");
let salaryInput = document.getElementById("salaryInput");
let filterIcon = document.querySelector(".filter")
let searchIcon = document.querySelector(".search")
let popup = document.querySelector(".popup");
let biggestImage = document.querySelector(".popup img");
let filterInput = document.querySelector(".filters input")
let searchInput=document.querySelector(".search input")
image.addEventListener("click", () => {
    upload.click();
})
let imagesSrc;
upload.addEventListener("change", (e) => {
    const { files } = e.target;
    for (let file of files) {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            const { result } = e.target;
            const image = document.createElement("img");
            image.setAttribute("src", result);
            imagesSrc=result           
        };

        fileReader.readAsDataURL(file);
    }
})
document.querySelector(".addBtn").addEventListener("click", () => {
    document.querySelector(".inputs").style.display = "none"
   
    let table = document.querySelector(".feature");
    let row = table.insertRow(1);
    let cellName = row.insertCell(0);
    let cellSurname = row.insertCell(1);
    let cellSalary = row.insertCell(2);
    let cellImg = row.insertCell(3);
    let img = document.createElement("img")
    img.setAttribute("src", imagesSrc)
    img.style.width = "100px"
    img.style.height = "50px"
    cellImg.appendChild(img)

    img.addEventListener("click", () => {
        popup.style.display = "block"
        changeImage(biggestImage)
    })

    function changeImage(img) {
        biggestImage.setAttribute("src", imagesSrc)
    };

    let nameSpan = document.createElement("span")
    let surnameSpan = document.createElement("span")
    let salarySpan = document.createElement("span")

    nameSpan.innerText = nameInput.value
    cellName.appendChild(nameSpan)
    surnameSpan.innerText = surnameInput.value
    cellSurname.appendChild(surnameSpan)
    salarySpan.innerText = salaryInput.value
    cellSalary.appendChild(salarySpan)

    filterInput.value=""
    filterIcon.addEventListener("click", () => {
        salarySpan.style.color="white"
        if (Number(filterInput.value) <= Number(salarySpan.innerText)) {
            salarySpan.style.color="green"
        }
    });
    
    searchInput.value=""
    searchIcon.addEventListener("click",()=>{
        nameSpan.style.fontSize="16px"
        nameSpan.style.color="white"
    if (searchInput.value.toUpperCase()===nameSpan.innerText) {
    nameSpan.style.color="green"
        nameSpan.style.fontSize="25px"
    }
    });
   
    nameInput.value = ""
    surnameInput.value = ""
    salaryInput.value = ""

   
    nameSpan.addEventListener("click", () => {
        nameSpan.style.color="white"
        let changeInput = document.createElement("input")
        changeInput.value = nameSpan.innerText;
        nameSpan.style.display = "none"
        cellName.appendChild(changeInput)
        changeInput.addEventListener("blur", () => {
            nameSpan.innerText = changeInput.value
            changeInput.remove()
            nameSpan.style.display = "block"
        })
    });

    surnameSpan.addEventListener("click", () => {
        let changeInputt = document.createElement("input")
        changeInputt.value = surnameSpan.innerText;
        surnameSpan.style.display = "none"
        cellSurname.appendChild(changeInputt)
        changeInputt.addEventListener("blur", () => {
            surnameSpan.innerText = changeInputt.value
            changeInputt.remove()
            surnameSpan.style.display = "block"
        })
    })
});
document.querySelector(".close-icon").addEventListener("click", closeImage);

function closeImage() {
    popup.style.display = "none"
};


document.querySelector(".featureRow").addEventListener("click", () => {
    document.querySelector(".inputs").style.display = "flex"
});