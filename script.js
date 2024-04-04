function getCandyCollection() {
  // Retrieve the candy collection array from local storage or default to an empty array
  const collection = JSON.parse(localStorage.getItem('candyCollection')) || [];
  return collection;
}

function setCandyCollection(collection) {
  // Save the candy collection array to local storage
  localStorage.setItem('candyCollection', JSON.stringify(collection));
  // Update the candy display
  updateCandyDisplay(collection);
}

function updateCandyDisplay(collection) {
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    // If the candy at the current index is in the collection, show the colored candy
    candy.src = collection.includes(index + 1) ? `jellybean_color_${index + 1}.png` : `jellybean_color_${index + 1}.png`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const candy = parseInt(urlParams.get('candy'), 10);

  // Retrieve the current collection from local storage
  const collection = getCandyCollection();

  if (candy && !collection.includes(candy)) {
    // If 'candy' parameter is present and not already in the collection, add it
    collection.push(candy);
    setCandyCollection(collection);
  } else {
    // If no 'candy' parameter or it's already in the collection, just update the display
    updateCandyDisplay(collection);
  }
});