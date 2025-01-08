const apiKey = "AIzaSyCnWIL0Po2DwU3gpsf0IuuEmHodn9IMp4o"; 

async function fetchRestaurants() {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.5237,-0.0759&radius=1500&type=restaurant&key=${AIzaSyCnWIL0Po2DwU3gpsf0IuuEmHodn9IMp4o}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        processRestaurants(data.results);
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        alert("Failed to fetch data from the API. Please check your settings.");
    }
}

function processRestaurants(restaurants) {
    const filtered = restaurants.filter(r => r.rating >= 4.0 && r.user_ratings_total >= 300);

    const groups = {
        low: filtered.filter(r => r.rating >= 4.0 && r.rating < 4.3),
        mid: filtered.filter(r => r.rating >= 4.3 && r.rating < 4.6),
        high: filtered.filter(r => r.rating >= 4.6)
    };

    const randomLow = groups.low[Math.floor(Math.random() * groups.low.length)];
    const randomMid = groups.mid[Math.floor(Math.random() * groups.mid.length)];
    const randomHigh = groups.high[Math.floor(Math.random() * groups.high.length)];

    document.getElementById("low").innerText = `4.0 - 4.3: ${randomLow ? randomLow.name : "Not found"}`;
    document.getElementById("mid").innerText = `4.3 - 4.6: ${randomMid ? randomMid.name : "Not found"}`;
    document.getElementById("high").innerText = `4.6 - 5.0: ${randomHigh ? randomHigh.name : "Not found"}`;
}

fetchRestaurants();