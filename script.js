// Define an object to store the counts for each candy type
const candyCounts = {
  type1: 0,
  type2: 0,
  type3: 0
};

// Function to retrieve the candy counts from local storage or initialize them if they don't exist
function getCandyCounts() {
  const counts = localStorage.getItem('candyCounts');
  return counts ? JSON.parse(counts) : { ...candyCounts };
}

// Function to save the updated candy counts to local storage
function saveCandyCounts(counts) {
  localStorage.setItem('candyCounts', JSON.stringify(counts));
}

// Function to update the display of candies based on the candy counts
function updateCandyDisplay(candyType) {
  const counts = getCandyCounts();
  
  // Update the main display to show the selected type of candy and its count
  const mainCandyDisplay = document.getElementById('main-candy-display');
  mainCandyDisplay.src = `colored_candy_${candyType}.png`;
  mainCandyDisplay.alt = `Candy Type ${candyType}`;
  
  // Update the count display for the selected type of candy
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    candy.src = index < counts[candyType] ? `colored_candy_${candyType}.png` : `grey_candy_${candyType}.png`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a new candy was collected based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const collectedCandyType = urlParams.get('type');
  const collectedCandyCount = parseInt(urlParams.get('count'), 10);

  if (collectedCandyType && !isNaN(collectedCandyCount)) {
    // If a new candy was collected, update the count for that candy type
    const counts = getCandyCounts();
    counts[collectedCandyType] = Math.min(collectedCandyCount, 5); // Ensure the count does not exceed 5 for any candy type
    saveCandyCounts(counts);
    
    // Update the display for the collected type of candy
    updateCandyDisplay(collectedCandyType);
  } else {
    // If no new candy was collected, you can choose to update display for a default candy type
    // or handle it as needed
  }
});