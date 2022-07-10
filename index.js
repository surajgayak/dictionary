const inputs = document.querySelector(".inputs");
const info = document.querySelector(".info");
const times = document.querySelector(".fa-times");
const happy = document.querySelector(".happy");
const meanings = document.querySelector(".meanings");
const examples = document.querySelector(".examples");
const synos = document.querySelector(".synos");
const descs = document.querySelector(".desc");
const vol = document.querySelector(".fa-volume-up");

function returnapidata(result, ans) {
  console.log(result);
  if (result.title) {
    info.innerText = `Cant find the meaning of '${ans}'`;
  } else {
    meanings.innerText = result[0].meanings[3].definitions[0].definition;
    descs.innerText = result[0].meanings[3].partOfSpeech;
    const synoss = result[0].meanings[3].synonyms;
    synos.innerText = synoss.splice(0, 5);
  }
}

function apifetch(ans) {
  info.innerText = `Searching for the result '${ans}' !`;
  happy.innerText = ans;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${ans}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => returnapidata(result, ans));
}
inputs.addEventListener("keyup", (e) => {
  if (inputs.value.length == 0) {
    times.style.display = "none";
  } else {
    times.style.display = "block";
  }
  if (e.key == "Enter" && e.target.value) {
    var c = e.target.value;
    apifetch(c);
  }
});

times.addEventListener("click", () => {
  inputs.value = "";
  info.innerText = "Type a word and press enter to get meaning!";
});
