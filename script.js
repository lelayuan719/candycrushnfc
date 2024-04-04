function getCandyCount() {
  // Retrieve the candy count from local storage or default to 0
  return parseInt(localStorage.getItem('candyCount'), 10) || 0;
}

function setCandyCount(count) {
  // Save the candy count to local storage
  localStorage.setItem('candyCount', count);
  // Update the candy display
  updateCandyDisplay(count);
}

function updateCandyDisplay(candyCount) {
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    candy.src = index < candyCount ? `colored_candy_${index + 1}.png` : `grey_candy_${index + 1}.png`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const candy = urlParams.get('candy');

  if (candy) {
    // If 'candy' parameter is present, increment the candy count
    let candyCount = getCandyCount();
    candyCount = Math.min(candyCount + 1, 5); // Ensure the count does not exceed 5
    setCandyCount(candyCount);
  } else {
    // If no 'candy' parameter, just update the display based on the current count
    updateCandyDisplay(getCandyCount());
  }
});