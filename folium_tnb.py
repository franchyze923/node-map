import folium
import requests
from random import uniform

m = folium.Map(location=[37, 0],
           zoom_start=2.5,
           tiles='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
           attr='Esri World_Dark_Gray_Base')

response = requests.get(r"http://157.230.75.212/validators?limit=30&offset=0").json()

# Loop through all nodes returned from TNB Validator API
for node in response['results']:
    node_ip = node['ip_address']
    account_number = node['account_number']
    default_tx_fee = node['default_transaction_fee']
    # Feed ip-api the IP address of each validator.

    ip_info = requests.get("http://ip-api.com/json/{}".format(node_ip)).json()
    lat = ip_info['lat']
    # add offset to lat so points arent on top of each other
    lat = lat + uniform(0.01, 0.04)
    lon = ip_info['lon']
    country = ip_info['country']
    city = ip_info['city']
    provider = ip_info['org']

    html = '''<h2>Node Info</h2>
    IP Address: {}<br>
    Country: {}<br>
    City: {}<br>
    Account Number: {}<br>
    Provider: {}<br>
    Node Type: Validator<br>
    Default Tx Fee: {}'''.format(node_ip, country, city, account_number, provider, default_tx_fee)

    iframe = folium.IFrame(html, width=700, height=200)
    popup = folium.Popup(iframe, max_width=700)

    marker = folium.Marker([lat, lon], popup=popup, icon=folium.Icon(color='green', icon='cloud')).add_to(m)

m.save(r'E:\Youtube_Videos\index.html')