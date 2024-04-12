// Function to retrieve the candy collections from local storage or initialize them if they don't exist
function getCandyCollections() {
  const collections = localStorage.getItem('candyCollections');
  return collections ? JSON.parse(collections) : { type1: [], type2: [], type3: [] };
}

// Function to save the updated candy collections to local storage
function saveCandyCollections(collections) {
  localStorage.setItem('candyCollections', JSON.stringify(collections));
}

// Function to update the display of a specific type of candy based on its collection
function updateCandyDisplay(candyType) {
  const collections = getCandyCollections();
  const collection = collections[candyType];
  const candyCount = collection.length;
  
  // Update the main display to show the selected type of candy and its count
  const mainCandyDisplay = document.getElementById('main-candy-display');
  mainCandyDisplay.src = `colored_candy_${candyType}.png`;
  mainCandyDisplay.alt = `Candy Type ${candyType} - Count: ${candyCount}`;

  // Update the count display for the selected type of candy
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    candy.src = index < candyCount ? `colored_candy_${candyType}.png` : `grey_candy_${candyType}.png`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a new candy was collected based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const collectedCandyType = urlParams.get('type');
  const collectedCandyTag = urlParams.get('tag');

  if (collectedCandyType && collectedCandyTag) {
    // If a new candy was collected, update the collection for that candy type
    const collections = getCandyCollections();
    const collection = collections[collectedCandyType];

    if (!collection.includes(collectedCandyTag) && collection.length < 5) {
      collection.push(collectedCandyTag);
      saveCandyCollections(collections);

      // Update the display for the collected type of candy
      updateCandyDisplay(collectedCandyType);
    }
  } else {
    // If no new candy was collected, you can choose to update display for a default candy type
    // or handle it as needed
  }
});