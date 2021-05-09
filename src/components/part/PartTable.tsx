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

const PartTable = (props) => {
    const deletePart = (part) => {
        fetch(`http://localhost:3000/part/delete/${part.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token,
            })
        }).then(() => props.fetchParts());
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

    return props.parts.map((part, index) => {
        return(
            <div style={{marginBottom: '20px'}}>
            <Card className={classes.root} style={cardStyle}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={part.img}
                  title="#"
                  style={{height: '300px'}}
                />
                <CardContent>
                  <Grid direction='row' justify='center'>
                    <Typography gutterBottom variant="h5" component="h2" style={{color: '#93B7BE'}}>
                      {part.partName}
                    </Typography>
                  </Grid>
                  <Grid container direction='row' justify='center'>
                      <Typography variant="body2" color="textSecondary" component="p" style={{color: '#93B7BE', width: '25vw'}}>
                        Grade: {part.grade}<br />
                        Price: {part.price}<br />
                        Car Year: {part.carYear}<br />
                        Car Make: {part.carMake}<br />
                        Car Model: {part.carModel}
                      </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" style={{color: '#93B7BE'}} onClick={() => {props.editUpdatePart(part); props.updateOn()}}>
                  Edit
                </Button>
                <Button size="small" style={{color: '#93B7BE'}} onClick={() => {deletePart(part)}}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div> 
        );
    });
};

export default PartTable;