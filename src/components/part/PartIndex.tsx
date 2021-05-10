import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useState, useEffect } from 'react';
import PartCreate from './PartCreate';
import PartTable from './PartTable';
import PartEdit from './PartEdit';
import APIURL from '../../helpers/environment';

const PartIndex = (props) => {
    const [parts, setParts] = useState<object[]>([]);
    const [updateActive, setUpdateActive] = useState<boolean>(false);
    const [partToUpdate, setPartToUpdate] = useState<object>({});

    const fetchParts = () => {
        fetch(`${APIURL}/part/`, {
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

    const gridStyle = {
        backgroundColor: '#D4F5F5',
        color: '#747578',
        paddingBottom: '20px'
    }

    return(
        <Grid container style={gridStyle}>
            <Grid container alignItems='center' direction='column'>
                <Grid>
                    <PartCreate fetchParts={fetchParts} token={props.token} />
                </Grid>
                <hr />
                <Grid container justify='space-around' direction='row'>
                    <PartTable parts={parts} editUpdatePart={editUpdatePart} updateOn={updateOn} updateOff={updateOff} fetchParts={fetchParts} token={props.token} partToUpdate={partToUpdate} />
                </Grid>
                {updateActive ? (
                    <PartEdit partToUpdate={partToUpdate} updateOff={updateOff} token={props.token} fetchParts={fetchParts} updateActive={updateActive}/>
                ) : (
                    <></>
                )}
            </Grid>
        </Grid>
    );
};

export default PartIndex;