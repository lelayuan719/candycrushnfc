// function getCandyCollection() {
//   const collection = localStorage.getItem('candyCollection');
//   return collection ? JSON.parse(collection) : [];
// }

// // Function to save the updated candy collection to local storage
// function saveCandyCollection(collection) {
//   localStorage.setItem('candyCollection', JSON.stringify(collection));
// }

// // Function to update the display of candies based on the candy collection
// function updateCandyDisplay() {
//   const candyCollection = getCandyCollection();
//   const candyCount = candyCollection.length;
  
//   // Update the display for each candy slot
//   const candies = document.querySelectorAll('#candy-counter .candy');
//   candies.forEach((candy, index) => {
//     // Use the colored image if the index is less than the count of collected candies
//     if (index < candyCount) {
//       // Assuming you have a corresponding colored candy image for each collected type
//       const candyType = candyCollection[index];
//       candy.src = `jellybean_color_${candyType}.png`;
//     } else {
//       // Otherwise, use the grey image
//       candy.src = `jellybean_grey_${index + 1}.png`;
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   // Check if a new candy was collected based on the URL parameter
//   const urlParams = new URLSearchParams(window.location.search);
//   const collectedCandy = urlParams.get('candy');

//   if (collectedCandy) {
//     // If a new candy was collected, add it to the collection (if not already present)
//     const candyCollection = getCandyCollection();
//     if (candyCollection.length < 5 && candyCollection.indexOf(collectedCandy) === -1) {
//       candyCollection.push(collectedCandy);
//       saveCandyCollection(candyCollection);
//     }
//   }

//   // Update the candy display
//   updateCandyDisplay();
// });

// Function to retrieve the candy collection from local storage
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
  // Prepare an array to keep track of which candy types have been collected
  const collectedTypes = new Array(4).fill(0);
  const candyCollection = getCandyCollection();

  // Map each candy identifier to its type
  candyCollection.forEach(candyId => {
    const candyType = Math.ceil(candyId / 7); // Determine candy type by id
    collectedTypes[candyType - 1]++;
  });

  // Update the display for each candy slot
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    const candyType = Math.floor(index / 5); // Determine the type based on slot
    // Determine which image to display
    candy.src = collectedTypes[candyType] > 0 ? `colored_candy_${candyType + 1}.png` : `grey_candy_${candyType + 1}.png`;
    // Subtract from the count of collected candies of this type
    if (collectedTypes[candyType] > 0) collectedTypes[candyType]--;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a new candy was collected based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const collectedCandyId = parseInt(urlParams.get('candy'), 10);

  if (collectedCandyId) {
    // If a new candy was collected, add it to the collection if it's not already there
    const candyCollection = getCandyCollection();
    if (!candyCollection.includes(collectedCandyId) && candyCollection.length < 5) {
      candyCollection.push(collectedCandyId);
      saveCandyCollection(candyCollection);
    }
  }

  // Update the candy display
  updateCandyDisplay();
});
