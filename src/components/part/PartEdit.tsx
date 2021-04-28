import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const PartEdit = (props) => {
    const [editPartName, setEditPartName] = useState(props.partToUpdate.partName);
    const [editCondition, setEditCondition] = useState(props.partToUpdate.condition);
    const [editPrice, setEditPrice] = useState(props.partToUpdate.price);
    const [editCarYear, setEditCarYear] = useState(props.partToUpdate.carYear);
    const [editCarMake, setEditCarMake] = useState(props.partToUpdate.carMake);
    const [editCarModel, setEditCarModel] = useState(props.partToUpdate.carModel);

    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
    
      function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
    
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
    
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: "absolute",
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

      function SimpleModal() {
        const classes = useStyles();
        const [modalStyle] = useState(getModalStyle);
        const [open, setOpen] = useState(false);
    
        const handleOpen = () => {
          setOpen(true);
        };
    
        const handleClose = () => {
          setOpen(false);
        };
    
        const body = (
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit Car Listing</h2>
            <form onSubmit={partUpdate}>
              <TextField
                id="standard-basic"
                label="Part Name"
                onChange={(e) => setEditPartName(e.target.value)}
                value={editPartName}
                required
              />
              <TextField
                id="standard-basic"
                label="Condition"
                onChange={(e) => setEditCondition(e.target.value)}
                value={editCondition}
                required
              />
              <TextField
                id="standard-basic"
                label="Price"
                onChange={(e) => setEditPrice(Number(e.target.value))}
                value={editPrice}
                required
              />
              <TextField
                id="standard-basic"
                label="Car Year"
                onChange={(e) => setEditCarYear(Number(e.target.value))}
                value={editCarYear}
                required
              />
              <TextField
                id="standard-basic"
                label="Car Make"
                onChange={(e) => setEditCarMake(e.target.value)}
                value={editCarMake}
                required
              />
              <TextField
                id="standard-basic"
                label="Car Model"
                onChange={(e) => setEditCarModel(e.target.value)}
                value={editCarModel}
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        );
    
        return (
          <div>
            <button type="button" onClick={handleOpen}>
              Open Modal
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
        );
      }

    const partUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/car/update/${props.partToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                part: {
                    partName: editPartName,
                    condition: editCondition,
                    price: editPrice,
                    carYear: editCarYear,
                    carMake: editCarMake,
                    carModel: editCarModel
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            })
        }).then((res) => {
            props.fetchParts();
            props.updateOff();
        });
    };

    return SimpleModal();
};

export default PartEdit;