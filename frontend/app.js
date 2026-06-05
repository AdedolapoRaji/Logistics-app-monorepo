const ORDER_API = 'http://localhost:5001/api/orders';
const DRIVER_API = 'http://localhost:5002/api/drivers/available';
const TRACKING_API = 'http://localhost:5003/api/tracking';

async function createOrder() {
    const item = document.getElementById('item').value;
    const destination = document.getElementById('destination').value;
    
    const response = await fetch(ORDER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, destination })
    });
    const data = await response.json();
    document.getElementById('orderResponse').innerText = `Created! ID: ${data.id}\nStatus: ${data.status}`;
}

async function fetchDrivers() {
    const response = await fetch(DRIVER_API);
    const drivers = await response.json();
    const list = document.getElementById('driverList');
    list.innerHTML = '';
    drivers.forEach(d => {
        list.innerHTML += `<li class="bg-gray-700 p-3 rounded border border-gray-600 flex justify-between">
            <span class="font-medium">${d.name}</span> <span class="text-sm text-gray-400">${d.vehicle} (${d.driverId})</span>
        </li>`;
    });
}

async function trackOrder() {
    const id = document.getElementById('trackId').value;
    if(!id) return alert("Please map a valid Order ID first");
    
    const response = await fetch(`${TRACKING_API}/${id}`);
    const data = await response.json();
    document.getElementById('trackingOutput').innerHTML = `
        📍 Hub Location: ${data.currentLocation}<br>
        🛰️ Coordinates: Lat ${data.latitude}, Long ${data.longitude}<br>
        ⚙️ Core Status: [${data.status}]
    `;
}
