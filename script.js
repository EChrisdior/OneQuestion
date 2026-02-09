const questions = [
  "Would you restart your life if you could?",
  "Do you think most people are pretending to be okay?",
  "If nobody judged you, would you live differently?",
  "Do you trust your future self?",
  "Would you rather be lucky than smart?",
  "Is comfort more dangerous than pain?",
  "Would you press a button that erases yesterday?"
];

const today = new Date().toISOString().slice(0, 10);
const questionIndex = new Date().getDate() % questions.length;
const question = questions[questionIndex];

document.getElementById("question").innerText = question;

const storageKey = `vote-${today}`;
let data = JSON.parse(localStorage.getItem(storageKey)) || {
  yes: 0,
  no: 0,
  voted: false
};

function updateResults() {
  const total = data.yes + data.no || 1;
  const yesPercent = Math.round((data.yes / total) * 100);
  const noPercent = 100 - yesPercent;

  document.getElementById("yesBar").style.width = yesPercent + "%";
  document.getElementById("noBar").style.width = noPercent + "%";
  document.getElementById("percentages").innerText =
    `Yes: ${yesPercent}% · No: ${noPercent}%`;
  document.getElementById("count").innerText =
    `${data.yes + data.no} people answered today`;

  document.getElementById("results").classList.remove("hidden");
}

function vote(choice) {
  if (data.voted) return;

  data[choice]++;
  data.voted = true;
  localStorage.setItem(storageKey, JSON.stringify(data));

  document.getElementById("yesBtn").disabled = true;
  document.getElementById("noBtn").disabled = true;

  updateResults();
}

document.getElementById("yesBtn").onclick = () => vote("yes");
document.getElementById("noBtn").onclick = () => vote("no");

if (data.voted) {
  document.getElementById("yesBtn").disabled = true;
  document.getElementById("noBtn").disabled = true;
  updateResults();
}
