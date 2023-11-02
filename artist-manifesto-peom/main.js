let verbs = ["creates", "steals", "plants", "circles", "plays", "draws", "chases", "watched", "holds", "micmics"];
let nouns = ["circles", "triangles", "brushes", "plants", "human", "animals", "a bird", "soul", "the world", "an apple"];
let times = [
  "every moment",
  "while walking",
  "while eating",
  "while thinking",
  "everyday",
  "every morning",
  "every week",
  "every month",
  "every weekend",
  "every night",
  "every afternoon",
  "in a corner",
  "under the tree",
  "while sitting in the grass"
];

const sentenceHistory = [];

// Function to generate a sentence based on user input
function generateUserSentence() {
  const verbInput = document.getElementById("verbInput").value;
  const nounInput = document.getElementById("nounInput").value;
  const timeInput = document.getElementById("timeInput").value;

  if (verbInput || nounInput || timeInput) {
    const randomVerb = verbInput ? verbInput.split(",")[Math.floor(Math.random() * verbInput.split(",").length)].trim() : verbs[Math.floor(Math.random() * verbs.length)];
    const randomNoun = nounInput ? nounInput.split(",")[Math.floor(Math.random() * nounInput.split(",").length)].trim() : nouns[Math.floor(Math.random() * nouns.length)];
    const randomTime = timeInput ? timeInput.split(",")[Math.floor(Math.random() * timeInput.split(",").length)].trim() : times[Math.floor(Math.random() * times.length)];

    const line1 = `The person who`;
    const line2 = `${randomVerb} ${randomNoun}`;
    const line3 = `${randomTime}`;
    const line4 = `is an artist`;

    const generatedSentence = `${line1}\n${line2}\n${line3}\n${line4}`;

    // Display the generated sentence
    const terminal = document.getElementById("terminal");
    terminal.textContent = generatedSentence;

    // Add the generated sentence to the history
    sentenceHistory.push(generatedSentence);

    // Update the sentence history list
    const historyList = document.getElementById("history");
    historyList.innerHTML = '';
    sentenceHistory.forEach((sentence, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = sentence;

      // Add a black line between history items, except for the last one
      if (index < sentenceHistory.length - 1) {
        listItem.style.borderBottom = "1px solid black";
        listItem.style.marginBottom = "10px";
        listItem.style.paddingBottom = "10px";
      }

      historyList.appendChild(listItem);
    });
  }
}

// Function to generate a random sentence
function generateRandomSentence() {
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomTime = times[Math.floor(Math.random() * times.length)];

  const line1 = `The person who`;
  const line2 = `${randomVerb} ${randomNoun}`;
  const line3 = `${randomTime}`;
  const line4 = `is an artist`;

  const generatedSentence = `${line1}\n${line2}\n${line3}\n${line4}`;

  // Add the generated sentence to the history
  sentenceHistory.push(generatedSentence);

  // Update the terminal with the latest sentence
  const terminal = document.getElementById("terminal");
  terminal.textContent = generatedSentence;

  // Update the sentence history list
  const historyList = document.getElementById("history");
  historyList.innerHTML = '';
  sentenceHistory.forEach((sentence, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = sentence;

    // Add a black line between history items, except for the last one
    if (index < sentenceHistory.length - 1) {
      listItem.style.borderBottom = "1px solid black";
      listItem.style.marginBottom = "10px";
      listItem.style.paddingBottom = "10px";
    }

    historyList.appendChild(listItem);
  });
}

// Add click event listener to the "Display Sentence" button
document.getElementById("display-button").addEventListener("click", generateUserSentence);

// Add click event listener to the "Generate Sentence" button
document.getElementById("generate-button").addEventListener("click", generateRandomSentence);