const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".doropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (const select of dropdowns) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    let respose = await fetch(URL);
    let data = await respose.json();
    let main = data[fromCurr.value.toLowerCase()]
    let Rate = main[toCurr.value.toLowerCase()];
    let FinalAmount = amtVal*Rate;
    console.log(FinalAmount);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${FinalAmount} ${toCurr.value}`
});