var map = L.map('mapid').setView([37, 0], 2.5);
L.esri.basemapLayer('DarkGray').addTo(map);

function getNodeInfo(request) {

    fetch(request)
        .then(response => response.json())
        .then(function (node_data) {
            getLocation(node_data)
        })

}

function getLocation(node_data) {

    for (var x = 0; x < node_data.count; x++) {
        
        fetch('http://ip-api.com/json/' + node_data.results[x].ip_address)
        .then(response => response.json())
        .then(function (ip_data) {
            ip_data.lat = ip_data.lat + Math.random() * (0.2 - 0.1) + 0.1
            var combo = "IP Address: " + ip_data.query + "<br>" + "Country: " + ip_data.country + "<br>" + "City: " + ip_data.city + "<br>" + "Node Type:" + " Validator" + "<br>" + "Provider: " + ip_data.org
            var marker = L.marker([ip_data.lat, ip_data.lon]).addTo(map);
            marker.bindPopup(combo);
            console.log(ip_data)
        })
    }
}

getNodeInfo("http://157.230.75.212/validators?limit=30&offset=0")