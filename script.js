function getCandyCollection() {
  const collection = localStorage.getItem('candyCollection');
  return collection ? JSON.parse(collection) : [];
}

// Function to save the updated candy collection to local storage
function saveCandyCollection(collection) {
  localStorage.setItem('candyCollection', JSON.stringify(collection));
}

// Function to update the display of candies based on the candy collection
function updateCandyDisplay() {
  const candyCollection = getCandyCollection();
  const candyCount = candyCollection.length;
  
  // Update the display for each candy slot
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    // Use the colored image if the index is less than the count of collected candies
    if (index < candyCount) {
      // Assuming you have a corresponding colored candy image for each collected type
      const candyType = candyCollection[index];
      candy.src = `jellybean_color_${candyType}.png`;
    } else {
      // Otherwise, use the grey image
      candy.src = `jellybean_grey_${index + 1}.png`;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a new candy was collected based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const collectedCandy = urlParams.get('candy');

  if (collectedCandy) {
    // If a new candy was collected, add it to the collection (if not already present)
    const candyCollection = getCandyCollection();
    if (candyCollection.length < 5 && candyCollection.indexOf(collectedCandy) === -1) {
      candyCollection.push(collectedCandy);
      saveCandyCollection(candyCollection);
    }
  }

  // Update the candy display
  updateCandyDisplay();
});

