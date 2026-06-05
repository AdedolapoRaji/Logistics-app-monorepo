// Change this IP to match your EC2 public IP address
const BASE_IP = "13.49.221.15"; 

const BACKEND_URLS = {
    orderService: `http://${BASE_IP}:5001`,
    driverService: `http://${BASE_IP}:5002`,
    trackingService: `http://${BASE_IP}:5003`
};

// 1. Scan Fleet (Fetch Drivers from Driver Service)
async function fetchDrivers() {
    const driverListElement = document.getElementById('driverList');
    driverListElement.innerHTML = `<li class="text-gray-500 animate-pulse">Scanning active fleet systems...</li>`;
    
    try {
        const response = await fetch(`${BACKEND_URLS.driverService}/api/drivers/available`);
        if (!response.ok) throw new Error("Failed to contact fleet telemetry.");
        
        const drivers = await response.json();
        driverListElement.innerHTML = ''; // Clear status message
        
        if (drivers.length === 0) {
            driverListElement.innerHTML = `<li class="text-yellow-400">No active drivers found in sector.</li>`;
            return;
        }

        drivers.forEach(driver => {
            const li = document.createElement('li');
            li.className = "bg-gray-700/50 p-3 rounded border border-gray-600 flex justify-between items-center";
            li.innerHTML = `
                <div>
                    <span class="font-bold text-gray-200">${driver.name}</span>
                    <span class="text-xs block text-gray-400">Unit ID: ${driver.driverId}</span>
                </div>
                <span class="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
                    🚛 ${driver.vehicle}
                </span>
            `;
            driverListElement.appendChild(li);
        });
    } catch (error) {
        driverListElement.innerHTML = `<li class="text-red-400 font-mono text-xs">⚠️ Error: ${error.message}</li>`;
    }
}

// 2. Dispatch Order (Send to Order Service)
async function createOrder() {
    const item = document.getElementById('item').value;
    const destination = document.getElementById('destination').value;
    const responseBox = document.getElementById('orderResponse');
    
    if (!item || !destination) {
        responseBox.className = "mt-4 text-sm text-red-400 font-mono";
        responseBox.innerText = "Error: Fields cannot be blank.";
        return;
    }

    responseBox.className = "mt-4 text-sm text-blue-400 font-mono animate-pulse";
    responseBox.innerText = "Transmitting dispatch manifest...";

    try {
        const response = await fetch(`${BACKEND_URLS.orderService}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, destination })
        });
        
        const data = await response.json();
        responseBox.className = "mt-4 text-sm text-emerald-400 font-mono bg-emerald-950/30 p-3 rounded border border-emerald-500/20";
        responseBox.innerHTML = `✅ Manifest Accepted!<br>ID: <span class="underline">${data.orderId || data.id || 'N/A'}</span>`;
    } catch (error) {
        responseBox.className = "mt-4 text-sm text-red-400 font-mono";
        responseBox.innerText = "Transmission loss: Could not post order.";
    }
}

// 3. Locate Asset (Fetch from Tracking Service)
async function trackOrder() {
    const trackId = document.getElementById('trackId').value;
    const trackingOutput = document.getElementById('trackingOutput');
    
    if (!trackId) {
        trackingOutput.innerText = "Input an active ID sequence.";
        return;
    }

    trackingOutput.innerText = "Pinging tracking transponder...";

    try {
        const response = await fetch(`${BACKEND_URLS.trackingService}/api/tracking/${trackId}`);
        const data = await response.json();
        
        trackingOutput.innerHTML = `
            Status: <span class="text-white font-bold">${data.status || 'IN_TRANSIT'}</span><br>
            Coordinates: <span class="text-gray-300 font-mono">${data.location || 'Lagos Central Hub'}</span><br>
            Timestamp: <span class="text-gray-500 text-xs">${new Date().toLocaleTimeString()}</span>
        `;
    } catch (error) {
        trackingOutput.innerText = "Failed to synchronize tracking system links.";
    }
}
