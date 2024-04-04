function updateCandyCount(candyCount) {
    for (let i = 1; i <= 5; i++) {
      const candyImage = document.querySelector(`#candy-counter .candy:nth-child(${i})`);
      candyImage.src = i <= candyCount ? `jellybean.png` : `jellybean_grey_${i}.png`;
    }
  }
  
  document.getElementById('update-candy-count').addEventListener('click', function() {
    const count = parseInt(document.getElementById('candy-input').value, 10);
    if (isNaN(count) || count < 0 || count > 5) {
      alert('Please enter a count between 0 and 5.');
      return;
    }
    updateCandyCount(count);
  });

  function getCandyCountFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('candy'), 10);
}

function updateCandyDisplay(candyCount) {
  // Ensure candyCount is within the valid range
  candyCount = Math.max(0, Math.min(candyCount, 5));
  
  // Update candies based on the count
  const candies = document.querySelectorAll('#candy-counter .candy');
  candies.forEach((candy, index) => {
    if (index < candyCount) {
      // Show the colored candy
      candy.src = `jellybean_color${index + 1}.png`; // Ensure you have colored images named correctly
    } else {
      // Show the grey candy
      candy.src = `jellybean_grey_${index + 1}.png`;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let candyCount = getCandyCountFromUrl();

  if (!isNaN(candyCount)) {
    // Assume we store the collected candy count in localStorage
    const storedCount = parseInt(localStorage.getItem('candyCount'), 10) || 0;
    candyCount = storedCount + candyCount <= 5 ? storedCount + 1 : 5;
    localStorage.setItem('candyCount', candyCount.toString());
    updateCandyDisplay(candyCount);
  }
});