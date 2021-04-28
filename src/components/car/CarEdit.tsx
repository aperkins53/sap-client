import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const CarEdit = (props) => {
  const [editYear, setEditYear] = useState(props.carToUpdate.year);
  const [editMake, setEditMake] = useState(props.carToUpdate.make);
  const [editModel, setEditModel] = useState(props.carToUpdate.model);
  const [editColor, setEditColor] = useState(props.carToUpdate.color);
  const [editMileage, setEditMileage] = useState(props.carToUpdate.mileage);
  const [editVin, setEditVin] = useState(props.carToUpdate.vin);
  const [editDescription, setEditDescription] = useState(
    props.carToUpdate.description
  );

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
        <form onSubmit={carUpdate}>
          <TextField
            id="standard-basic"
            label="Year"
            onChange={(e) => setEditYear(e.target.value)}
            value={editYear}
            required
          />
          <TextField
            id="standard-basic"
            label="Make"
            onChange={(e) => setEditMake(e.target.value)}
            value={editMake}
            required
          />
          <TextField
            id="standard-basic"
            label="Model"
            onChange={(e) => setEditModel(e.target.value)}
            value={editModel}
            required
          />
          <TextField
            id="standard-basic"
            label="Color"
            onChange={(e) => setEditColor(e.target.value)}
            value={editColor}
            required
          />
          <TextField
            id="standard-basic"
            label="Mileage"
            onChange={(e) => setEditMileage(e.target.value)}
            value={editMileage}
            required
          />
          <TextField
            id="standard-basic"
            label="Vin"
            onChange={(e) => setEditVin(e.target.value)}
            value={editVin}
            required
          />
          <TextField
            id="standard-basic"
            label="Description"
            onChange={(e) => setEditDescription(e.target.value)}
            value={editDescription}
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

  const carUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/car/update/${props.carToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        car: {
          year: editYear,
          make: editMake,
          model: editModel,
          color: editColor,
          mileage: editMileage,
          vin: editVin,
          description: editDescription,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchCars();
      props.updateOff();
    });
  };

  return SimpleModal();
};

export default CarEdit;