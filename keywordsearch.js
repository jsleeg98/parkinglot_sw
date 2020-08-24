var k_infowindow = new kakao.maps.InfoWindow({zIndex:1});

var k_mapContainer = document.getElementById('k_map'), // 지도를 표시할 div 
    k_mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var k_map = new kakao.maps.Map(k_mapContainer, k_mapOption); 


// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

ps.keywordSearch('이태원 맛집', palceSearchCB);

function placesSearchCB(data, status, pagination){
    if (status === kakao.maps.services.status.OK){
        var bounds = new kakao.maps.LatLngBounds();

        for(var i=0; i<data.length; i++){
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        k_map.setBounds(bounds);
    }
}

function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var k_marker = new kakao.maps.Marker({
        k_map: k_map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(k_marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        k_infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        k_infowindow.open(k_map, k_marker);
    });
}