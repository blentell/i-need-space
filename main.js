const button = document.querySelector("#search");
const api = document.querySelector("#api-key");
const address = document.querySelector("#address");
const norad = document.querySelector("#norad");
const satelliteTimes = document.querySelector(".times");
const content = document.querySelector(".content");
const satelliteImg = document.querySelector(".satelliteImg");
const output = document.querySelector("#output");

button.addEventListener("click", async function () {
	satelliteTimes.innerHTML = "";
	// fetch data from the map api site
	const rawData = await fetch(
		encodeURI(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${api.value}`
		)
	);
	const data = await rawData.json();

	const longitude = data.features[0].center[0];
	const latitude = data.features[0].center[1];

	console.log(longitude);
	console.log(latitude);

	// Apply data to the satellite fetch
	const satelliteRawData = await fetch(
		`https://satellites.fly.dev/passes/${norad.value}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`
	);
	const satelliteData = await satelliteRawData.json();

	const rise = satelliteData[0].rise.utc_datetime;
	const culmination = satelliteData[0].culmination.utc_datetime;
	const set = satelliteData[0].set.utc_datetime;

	const times1 = document.createElement("p");
	const times2 = document.createElement("p");
	const times3 = document.createElement("p");

	times1.innerText = `${address.value} rise time: ${rise}`;
	times2.innerText = `${address.value} culmination time: ${culmination}`;
	times3.innerText = `${address.value} set time: ${set}`;

	satelliteTimes.style.display = "flex";
	satelliteImg.style.display = "flex";
	output.style.display = "flex";

	satelliteTimes.appendChild(times1);
	satelliteTimes.appendChild(times2);
	satelliteTimes.appendChild(times3);

	console.log("Rise: ", rise);
	console.log("Culmination: ", culmination);
	console.log("Set: ", set);
});
