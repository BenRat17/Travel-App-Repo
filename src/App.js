import React, { useState, useEffect } from 'react';
import Header from './components/header/header';
import List from './components/list/list';
import Map from './components/map/map';
import Button from '@material-ui/core/Button';
import Placedetails from './components/placedetails/placedetails';
import { getPlacesData } from './api'

import { CssBaseline, Grid } from '@material-ui/core';

function App() {
    const [places, setPlaces] = useState([]);

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude});
        });
    }, []);

    function getPlacesButton() {
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);
                setPlaces(data);
            })
    , [coords, bounds];
    }

    // useEffect(() => {
    //     getPlacesData(bounds.sw, bounds.ne)
    //         .then((data) => {
    //             console.log(data);
    //             setPlaces(data);
    //         })
    // }, [coords, bounds]);

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={places}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Map
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        places={places}
                    />
                    <Button onClick={getPlacesButton()} >Get Restaurants</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default App;