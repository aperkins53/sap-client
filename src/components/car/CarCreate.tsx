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
    img: string;
    ownerId: number;
}

const CarCreate: React.SFC<CarCreateProps> = (props) => {
    const [year, setYear] = useState<number>(0);
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [exteriorColor, setExteriorColor] = useState<string>('');
    const [interiorColor, setInteriorColor] = useState<string>('');
    const [transmission, setTransmission] = useState<string>('');
    const [drivetrain, setDrivetrain] = useState<string>('');
    const [mileage, setMileage] = useState<number>(0);
    const [vin, setVin] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/car/postSale', {
            method: "POST",
            body: JSON.stringify({
                car: {
                    year: year,
                    make: make,
                    model: model,
                    exteriorColor: exteriorColor,
                    interiorColor: interiorColor,
                    transmission: transmission,
                    drivetrain: drivetrain,
                    mileage: mileage,
                    vin: vin,
                    price: price,
                    description: description,
                    img: image
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
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
                setExteriorColor('');
                setInteriorColor('');
                setTransmission('');
                setDrivetrain('');
                setMileage(0);
                setVin('');
                setPrice('');
                setDescription('');
                props.fetchCars();
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

        return (
          <Grid container>
            <FormControl onSubmit={handleSubmit}>
              <h1>Post Listing</h1>
              <Grid item direction="row">
                <TextField
                  id="standard-basic"
                  label="Year"
                  onChange={(e) => setYear(Number(e.target.value))}
                  value={year}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Make"
                  onChange={(e) => setMake(e.target.value)}
                  value={make}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Model"
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                  required
                />
              </Grid>
              <Grid item direction="row">
                <TextField
                  id="standard-basic"
                  label="Exterior Color"
                  onChange={(e) => setExteriorColor(e.target.value)}
                  value={exteriorColor}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Interior Color"
                  onChange={(e) => setInteriorColor(e.target.value)}
                  value={interiorColor}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Mileage"
                  onChange={(e) => setMileage(Number(e.target.value))}
                  value={mileage}
                  required
                />
              </Grid>
              <Grid item direction="row">
                <TextField
                  id="standard-basic"
                  label="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Transmission"
                  onChange={(e) => setTransmission(e.target.value)}
                  value={transmission}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Drivetrain"
                  onChange={(e) => setDrivetrain(e.target.value)}
                  value={drivetrain}
                  required
                />
              </Grid>
              <Grid item direction="row">
                <TextField
                  id="standard-basic"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Vin"
                  onChange={(e) => setVin(e.target.value)}
                  value={vin}
                  required
                />
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
              <Button variant="contained" style={linkStyle} onClick={handleSubmit}>
                Submit
              </Button>
            </FormControl>
          </Grid>
        );
    }


export default CarCreate;