import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';

export interface PartCreateProps {
    token: string;
    fetchParts: Function;
}

export interface PartCreateState {
    partName: string;
    condition: string;
    price: number;
}

const PartCreate: React.SFC<PartCreateProps> = (props) => {
    const [partName, setPartName] = React.useState<string>('');
    const [condition, setCondition] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [carYear, setCarYear] = React.useState<number>(0);
    const [carMake, setCarMake] = React.useState<string>('');
    const [carModel, setCarModel] = React.useState<string>('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/part/postSale', {
            method: 'POST',
            body: JSON.stringify({
                part: {
                    partName: partName,
                    condition: condition,
                    price: price,
                    carYear: carYear,
                    carMake: carMake,
                    carModel: carModel
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPartName('');
                setCondition('');
                setPrice(0);
                setCarYear(0);
                setCarMake('');
                setCarModel('');
                props.fetchParts();
            })
    }

    return(
        <Grid container>
            <FormControl onSubmit={handleSubmit}>
                <h1>Post Listing</h1>
                <Grid item direction='row'>
                    <TextField id='standard-basic' label='Part Name' onChange={((e) => setPartName(e.target.value))} value={partName} required />
                    <TextField id='standard-basic' label='Condition' onChange={((e) => setCondition(e.target.value))} value={condition} required />
                    <TextField id='standard-basic' label='Price' onChange={((e) => setPrice(Number(e.target.value)))} value={price} required />
                </Grid>
                <Grid item direction='row'>
                    <TextField id='standard-basic' label='Car Year' onChange={((e) => setCarYear(Number(e.target.value)))} value={carYear} required />
                    <TextField id='standard-basic' label='Car Make' onChange={((e) => setCarMake(e.target.value))} value={carMake} required />
                    <TextField id='standard-basic' label='Car Model' onChange={((e) => setCarModel(e.target.value))} value={carModel} required />
                </Grid>
                <br />
                <Button variant='contained' color='primary' type='submit'>Submit</Button>
            </FormControl>
        </Grid>
    )
}

export default PartCreate;