var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 10
});

function findRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    naver.maps.Service.geocode({ query: start }, function(startResult, status) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('출발지 주소를 찾을 수 없습니다.');
        }

        var startCoord = startResult.v2.addresses[0].location;

        naver.maps.Service.geocode({ query: end }, function(endResult, status) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('도착지 주소를 찾을 수 없습니다.');
            }

            var endCoord = endResult.v2.addresses[0].location;

            var directionsService = new naver.maps.DirectionsService();
            var directionsRenderer = new naver.maps.DirectionsRenderer({
                map: map,
                panel: document.getElementById('panel')
            });

            var request = {
                origin: new naver.maps.LatLng(startCoord.y, startCoord.x),
                destination: new naver.maps.LatLng(endCoord.y, endCoord.x),
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
