$(document).ready(function() {

    /* ========== GMAP ========== */
    var gmap;
        gmap = new GMaps({
            div: '#gmap',
            lat: 53.36669,
            lng: 83.750005,
            zoomControl : true,
            zoomControlOpt: {
                style : 'SMALL',
                position: 'TOP_LEFT'
            },
            panControl : true,
            streetViewControl : true,
            mapTypeControl: true,
            overviewMapControl: false
        });
        gmap.addMarker({
            lat: 53.36669,
            lng: 83.750005,
            title: 'Address',
            infoWindow: {
                content: '<h5>Our address:</h5><p>Chervonnaya st., 8,<br>Barnaul,<br>Russia</p>'
            }
        });


});