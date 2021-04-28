import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';

export interface CarCreateProps {
    token: string;
    fetchCars: Function;
}

export interface CarCreateState {
    year: number;
    make: string;
    model: string;
    color: string;
    mileage: number;
    vin: string;
    description: string;
    ownerId: number;
}


const CarCreate: React.SFC<CarCreateProps> = (props) => {
    const [year, setYear] = React.useState<number>(0);
    const [make, setMake] = React.useState<string>('');
    const [model, setModel] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('');
    const [mileage, setMileage] = React.useState<number>(0);
    const [vin, setVin] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/car/postSale', {
            method: 'POST',
            body: JSON.stringify({
                car: {
                    year: year,
                    make: make,
                    model: model,
                    color: color,
                    mileage: mileage,
                    vin: vin,
                    description: description
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Listing added.');
                console.log(data);
                setYear(0);
                setMake('');
                setModel('');
                setColor('');
                setMileage(0);
                setVin('');
                setDescription('');
                props.fetchCars();
            })
        }

        return(
            <Grid container>
                <FormControl onSubmit={handleSubmit}>
                    <h1>Post Listing</h1>
                    <Grid item direction='row'>
                        <TextField id="standard-basic" label="Year" onChange={((e) => setYear(Number(e.target.value)))} value={year} required />
                        <TextField id="standard-basic" label="Make" onChange={(e) => setMake(e.target.value)} value={make} required />
                        <TextField id="standard-basic" label="Model" onChange={(e) => setModel(e.target.value)} value={model} required />
                    </Grid>
                    <Grid item direction='row'>
                        <TextField id="standard-basic" label="Color" onChange={(e) => setColor(e.target.value)} value={color} required />
                        <TextField id="standard-basic" label="Mileage" onChange={(e) => setMileage(Number(e.target.value))} value={mileage} required />
                        <TextField id="standard-basic" label="Vin" onChange={(e) => setVin(e.target.value)} value={vin} required />
                    </Grid>
                        <TextField id="standard-basic" label="Description" onChange={(e) => setDescription(e.target.value)} value={description} required />
                    <br />
                    <Button variant="contained" color="primary" type='submit'>Submit</Button>
                </FormControl>
            </Grid>
        )
    }


export default CarCreate;