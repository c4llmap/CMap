var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 10
});

function findRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    // Geocode start location
    naver.maps.Service.geocode({ address: start }, function(status, startResult) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('출발지 주소를 찾을 수 없습니다.');
        }

        var startCoord = new naver.maps.LatLng(startResult.v2.addresses[0].y, startResult.v2.addresses[0].x);

        // Geocode end location
        naver.maps.Service.geocode({ address: end }, function(status, endResult) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('도착지 주소를 찾을 수 없습니다.');
            }

            var endCoord = new naver.maps.LatLng(endResult.v2.addresses[0].y, endResult.v2.addresses[0].x);

            var directionsService = new naver.maps.DirectionsService();
            var directionsRenderer = new naver.maps.DirectionsRenderer({
                map: map
            });

            var request = {
                origin: startCoord,
                destination: endCoord,
                travelMode: naver.maps.DirectionsService.Mode.TRANSIT
            };

            directionsService.route(request, function(response, status) {
                if (status === naver.maps.DirectionsService.Status.OK) {
                    directionsRenderer.setDirections(response);
                } else {
                    alert('길찾기 경로를 찾을 수 없습니다.');
                }
            });
        });
    });
}
