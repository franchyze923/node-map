var map = L.map('mapid').setView([37, 0], 2.5);
L.esri.basemapLayer('DarkGray').addTo(map);

function getBanks() {

    fetch('http://54.183.17.224/banks?limit=30&offset=0')
        .then(response => response.json())
        .then(function (data) {
            for (var x = 0; x < data.count; x++) {
                // console.log(data.results[x].ip_address)
                getLocation(data.results[x].ip_address)
            }
        })
}

function getLocation(ip_address) {

    fetch('http://ip-api.com/json/' + ip_address)
        .then(response => response.json())
        .then(function (data) {
            data.lat = data.lat + Math.random() * (0.2 - 0.1) + 0.1
            var combo = "IP Address: " + data.query + "<br>" + "Country: " + data.country + "<br>" + "City: " + data.city + "<br>" + "Node Type: Validator"
            var marker = L.marker([data.lat, data.lon]).addTo(map);
            marker.bindPopup(combo);
        })
}

getBanks()

d