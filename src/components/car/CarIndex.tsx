import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useState, useEffect } from 'react';
import CarCreate from './CarCreate';
import CarTable from './CarTable';
import CarEdit from './CarEdit';

const CarIndex = (props) => {
    const [cars, setCars] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [carToUpdate, setCarToUpdate] = useState({});

    const fetchCars = () => {
        fetch(`http://localhost:3000/car/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            })
        })
            .then((res) => res.json())
            .then((data) => setCars(data));
    };

    const editUpdateCar = (car) => {
        setCarToUpdate(car);
        console.log(car);
    };

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchCars();
    }, []);

    const gridStyle = {
        backgroundColor: '#D4F5F5',
        color: '#747578',
        paddingBottom: '20px'
    }

    return(
        <Grid container style={gridStyle}>
            <Grid container alignItems='center' direction='column'>
                <Grid>
                    <CarCreate fetchCars={fetchCars} token={props.token} />
                </Grid>
                <hr />
                <Grid>
                    <CarTable cars={cars} editUpdateCar={editUpdateCar} updateOn={updateOn} updateOff={updateOff} fetchCars={fetchCars} token={props.token} carToUpdate={carToUpdate} />
                </Grid>
                {updateActive ? (
                    <CarEdit carToUpdate={carToUpdate} updateOff={updateOff} token={props.token} fetchCars={fetchCars} updateActive={updateActive} />
                ) : (
                    <></>
                )}
            </Grid>
        </Grid>
    );
};

export default CarIndex;