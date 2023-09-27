function CS(data) {
  const array = [];
  for (let i = 0; i < data.messages.length; i++) {
    if (data.messages[i].actor !== undefined) {
      array.push(data.messages[i].actor);
    } else {
      array.push(data.messages[i].from);
    }
  }

  document.getElementById("group-name").textContent = data.name;
  const counts = new Map();
  array.forEach((item) => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });

  const topChitChatters = Array.from(counts, ([key, value]) => ({
    key,
    value,
  }));
  topChitChatters.sort((a, b) => b.value - a.value);

  let counter = 0;
  topChitChatters.forEach(function (itr) {
    const li = document.createElement("li");
    li.className = "lst";
    li.setAttribute("type", "square");
    li.textContent = `${topChitChatters[counter].key} --------- ${topChitChatters[counter].value}  {  messages }`;
    const ul = document.getElementById("list");
    ul.appendChild(li);
    counter++;
  });
}

function handleFileUpload() {
  const fileInput = document.getElementById("fileInput");
  const fileContentsDisplay = document.getElementById("fileContents");

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async function (e) {
      const fileContents = e.target.result;
      try {
        const jsonData = JSON.parse(fileContents);

        CS(jsonData); // Call your processing function with the JSON data
      } catch (error) {
        fileContentsDisplay.textContent = "Invalid JSON file.";
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file);
  } else {
    fileContentsDisplay.textContent = "No file selected.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const spinnerContainer = document.getElementById("spinner-container");
    if (spinnerContainer) {
      spinnerContainer.style.display = "none"; // Hide the spinner container
    }
  }, 1000);
});

