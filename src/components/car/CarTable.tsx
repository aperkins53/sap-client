import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from '@material-ui/core';
import APIURL from '../../helpers/environment';

const CarTable = (props) => {
  const deleteCar = (car) => {
    fetch(`${APIURL}/car/delete/${car.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchCars());
  };

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const cardStyle = {
    backgroundColor: '#554348'
  }

  const classes = useStyles();

  return props.cars.map((car, index) => {
    return(
        <div style={{marginBottom: '20px'}}>
          <Card className={classes.root} style={cardStyle}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={car.img}
                title="#"
                style={{height: '300px'}}
              />
              <CardContent>
                <Grid direction='row' justify='center'>
                  <Typography gutterBottom variant="h5" component="h2" style={{color: '#93B7BE'}}>
                    {car.year} {car.make} {car.model}
                  </Typography>
                </Grid>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: '#93B7BE', width: '25vw'}}>
                  Exterior Color: {car.exteriorColor}<br />
                  Interior Color: {car.interiorColor}<br />
                  Transmission: {car.transmission}<br />
                  Drivetrain: {car.drivetrain}<br />
                  Mileage: {car.mileage}<br />
                  Price: {car.price}<br />
                  Description: {car.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" style={{color: '#93B7BE'}} onClick={() => {props.editUpdateCar(car); props.updateOn()}}>
                Edit
              </Button>
              <Button size="small" style={{color: '#93B7BE'}} onClick={() => {deleteCar(car)}}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </div>
    );
  });
};


export default CarTable