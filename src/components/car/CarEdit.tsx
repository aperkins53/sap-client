import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const CarEdit = (props) => {
  const [editYear, setEditYear] = useState<number>(props.carToUpdate.year);
  const [editMake, setEditMake] = useState<string>(props.carToUpdate.make);
  const [editModel, setEditModel] = useState<string>(props.carToUpdate.model);
  const [editExteriorColor, setEditExteriorColor] = useState<string>(props.carToUpdate.exteriorColor);
  const [editInteriorColor, setEditInteriorColor] = useState<string>(props.carToUpdate.interiorColor);
  const [editTransmission, setEditTransmission] = useState<string>(props.carToUpdate.transmission);
  const [editDrivetrain, setEditDrivetrain] = useState<string>(props.carToUpdate.drivetrain);
  const [editMileage, setEditMileage] = useState<number>(props.carToUpdate.mileage);
  const [editVin, setEditVin] = useState<string>(props.carToUpdate.vin);
  const [editPrice, setEditPrice] = useState<string>(props.carToUpdate.price)
  const [editDescription, setEditDescription] = useState<string>(
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
      backgroundColor: '#93B7BE'
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
    const [open, setOpen] = useState(props.updateActive);

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
            onChange={(e) => setEditYear(Number(e.target.value))}
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
            label="Exterior Color"
            onChange={(e) => setEditExteriorColor(e.target.value)}
            value={editExteriorColor}
            required
          />
          <TextField
            id="standard-basic"
            label="Interior Color"
            onChange={(e) => setEditInteriorColor(e.target.value)}
            value={editInteriorColor}
            required
          />
          <TextField
            id="standard-basic"
            label="Transmission"
            onChange={(e) => setEditTransmission(e.target.value)}
            value={editTransmission}
            required
          />
          <TextField
            id="standard-basic"
            label="Drivetrain"
            onChange={(e) => setEditDrivetrain(e.target.value)}
            value={editDrivetrain}
            required
          />
          <TextField
            id="standard-basic"
            label="Mileage"
            onChange={(e) => setEditMileage(Number(e.target.value))}
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
            label="Price"
            onChange={(e) => setEditPrice(e.target.value)}
            value={editPrice}
            required
          />
          <TextField
            id="standard-basic"
            label="Description"
            onChange={(e) => setEditDescription(e.target.value)}
            value={editDescription}
            required
          />
          <Button style={{textDecoration: 'underline #554348', color: '#93B7BE', backgroundColor: '#554348',fontWeight: 'bold'}} type="submit">
            Submit
          </Button>
        </form>
      </div>
    );

    return (
      <div>
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
          exteriorColor: editExteriorColor,
          InteriorColor: editInteriorColor,
          transmission: editTransmission,
          drivetrain: editDrivetrain,
          mileage: editMileage,
          vin: editVin,
          price: editPrice,
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