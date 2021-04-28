import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useState, useEffect } from 'react';
import PartCreate from './PartCreate';
import PartTable from './PartTable';
import PartEdit from './PartEdit';

const PartIndex = (props) => {
    const [parts, setParts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [partToUpdate, setPartToUpdate] = useState({});

    const fetchParts = () => {
        fetch(`http://localhost:3000/part/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: props.token
            })
        })
            .then((res) => res.json())
            .then((data) => setParts(data));
    };

    const editUpdatePart = (part) => {
        setPartToUpdate(part);
        console.log(part);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchParts();
    }, []);

    return(
        <Grid container alignItems='center' direction='column'>
            <Grid>
                <PartCreate fetchParts={fetchParts} token={props.token} />
            </Grid>
            <hr />
            <Grid>
                <PartTable parts={parts} editUpdatePart={editUpdatePart} updateOn={updateOn} updateOff={updateOff} fetchParts={fetchParts} token={props.token} partToUpdate={partToUpdate} />
            </Grid>
            {updateActive ? (
                <PartEdit partToUpdate={partToUpdate} updateOf={updateOff} token={props.token} fetchParts={fetchParts} />
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default PartIndex;