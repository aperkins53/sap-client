import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import APIURL from '../../helpers/environment';

export interface PartCreateProps {
    token: string;
    fetchParts: Function;
}

export interface PartCreateState {
    partName: string;
    grade: string;
    price: number;
    carYear: number;
    carMake: string;
    carModel: string;
    img: string;
}

const PartCreate: React.SFC<PartCreateProps> = (props) => {
    const [partName, setPartName] = React.useState<string>('');
    const [grade, setGrade] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [carYear, setCarYear] = React.useState<number>(0);
    const [carMake, setCarMake] = React.useState<string>('');
    const [carModel, setCarModel] = React.useState<string>('');
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/part/postSale`, {
            method: 'POST',
            body: JSON.stringify({
                part: {
                    partName: partName,
                    grade: grade,
                    price: price,
                    carYear: carYear,
                    carMake: carMake,
                    carModel: carModel,
                    img: image
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Listing added.');
                console.log(data);
                setPartName('');
                setGrade('');
                setPrice(0);
                setCarYear(0);
                setCarMake('');
                setCarModel('');
                props.fetchParts();
            })
    }

    const linkStyle = {
        textDecoration: 'underline #554348',
        color: '#93B7BE',
        backgroundColor: '#554348',
        fontWeight: 'bold'
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'sapimages')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/sapimages/image/upload', {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false);
    }

    return(
        <Grid container>
            <FormControl onSubmit={handleSubmit}>
                <h1>Post Listing</h1>
                <Grid item direction='row'>
                    <TextField id='standard-basic' label='Part Name' onChange={((e) => setPartName(e.target.value))} value={partName} required />
                    <TextField id='standard-basic' label='Grade' onChange={((e) => setGrade(e.target.value))} value={grade} required />
                    <TextField id='standard-basic' label='Price' onChange={((e) => setPrice(Number(e.target.value)))} value={price} required />
                </Grid>
                <Grid item direction='row'>
                    <TextField id='standard-basic' label='Car Year' onChange={((e) => setCarYear(Number(e.target.value)))} value={carYear} required />
                    <TextField id='standard-basic' label='Car Make' onChange={((e) => setCarMake(e.target.value))} value={carMake} required />
                    <TextField id='standard-basic' label='Car Model' onChange={((e) => setCarModel(e.target.value))} value={carModel} required />
                </Grid>
                <br />
                <Grid>
                    <h3>Upload an Image</h3>
                    <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                    />
                    {loading ? (
                    <h3>Loading...</h3>
                    ) : (
                    <img src={image} style={{ width: "300px" }} />
                    )}
                </Grid>
                <br />
                <Button variant='contained' style={linkStyle} type='submit' onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Grid>
    )
}

export default PartCreate;