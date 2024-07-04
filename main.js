var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 10
});

function findRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    var geocoder = new naver.maps.Service();

    // Geocode start location
    geocoder.geocode({ address: start }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('출발지 주소를 찾을 수 없습니다.');
        }

        var startCoord = new naver.maps.LatLng(response.v2.addresses[0].y, response.v2.addresses[0].x);

        // Geocode end location
        geocoder.geocode({ address: end }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('도착지 주소를 찾을 수 없습니다.');
            }

            var endCoord = new naver.maps.LatLng(response.v2.addresses[0].y, response.v2.addresses[0].x);

            var directionsService = new naver.maps.DirectionsService();
            var directionsRenderer = new naver.maps.DirectionsRenderer({
                map: map
            });

            var request = {
                origin: startCoord,
                destination: endCoord,
                travelMode: naver.maps.DirectionsService.Mode.TRANSIT
            };

            directionsService.route(request, function(status, response) {
                if (status === naver.maps.DirectionsService.Status.OK) {
                    directionsRenderer.setDirections(response);
                } else {
                    alert('길찾기 경로를 찾을 수 없습니다.');
                }
            });
        });
    });
}
