import { useEffect, useRef, useState } from "react";
import { FullscreenControl, Map, Placemark, withYMaps } from "react-yandex-maps";

export const SelectMap = withYMaps(props => {
    // console.log(props);
    const [state, setState] = useState({
        coords: props.coords || [55.751574, 37.573856],
        iconCaption: 'поиск...',
        balloonContent: ''
    });
    const handleRef = map => {
        if(map){
            map.events.add('click', function (e) {
                var coords = e.get('coords');
                setState(prev => {
                    const res = {
                        ...prev, 
                        coords
                    }
                    props.onChange && props.onChange(coords);
                    return res;
                });
            });
        }
    }
    const handleDrag = e => {
        setState(prev => {
            const res = {
                ...prev, 
                coords: e.originalEvent.target.geometry.getCoordinates()
            }
            props.onChange && props.onChange(res.coords);
            return res;
        });
    }
    function getAddress(geocode) {
        if(!props.ymaps) return;
        setState(prev => ({
            ...prev,
            iconCaption: 'поиск...'
        }));
        geocode(state.coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            setState(prev => ({
                ...prev,
                iconCaption: [
                    firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                ].filter(Boolean).join(', '),
                balloonContent: firstGeoObject.getAddressLine()
            }));
        });
    }
    return(
        <Map
            defaultState={{
                center: state.coords,
                zoom: 7,
            }}
            instanceRef={handleRef}
            modules={['geocode']}
            onLoad={(ymaps) => getAddress(ymaps.geocode)}
        >
            <Placemark 
                geometry={state.coords} 
                options={{
                    draggable: true
                }}
                properties={{
                    // iconCaption: state.iconCaption,
                    // balloonContent: state.balloonContent
                }}
                onDragEnd={handleDrag}
                
            />
            <FullscreenControl />
        </Map>
    );
});