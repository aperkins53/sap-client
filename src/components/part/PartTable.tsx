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
    
    const classes = useStyles();

    return props.parts.map((part, index) => {
        return(
            <div>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="#"
                  title="#"
                />
                <CardContent>
                  <Grid direction='row' >
                    <Typography gutterBottom variant="h5" component="h2">
                      {part.partName} from a {part.caryYear} {part.carMake} {part.carModel}
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {props.editUpdatePart(part); props.updateOn()}}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={() => {deletePart(part)}}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div> 
        );
    });
};

export default PartTable;