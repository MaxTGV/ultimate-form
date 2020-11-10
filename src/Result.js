import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {MainContainer} from './component/MainContainer';
import Typography from '@material-ui/core/Typography';
import {useData} from './DataContext';
import { Paper, TableBody, TableContainer, Table, TableHead, TableRow, TableCell, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {InsertDriveFile, SwapCalls} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {PrimaryButton} from './component/PrimaryButton';
import {Confetti} from 'react-confetti';

const useStyles = makeStyles({
    root: {
       marginBottom: "30px"
    },
    table: {
        marginBottom: "30px"
    }
})

export const Result = () => {
    const [success, setSuccess] = useState(false);
    const styles = useStyles();
    const {data} = useData();
    const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
    const {files} = data;

    const onSubmit = async() => {
        const formData = new FormData();

        if(data.files) {
            data.files.forEach(file => {
                formData.append("files", file, file.name);
            });
        }

        entries.forEach(entry => {
            formData.append(entry[0], entry[1]);
        });

        const res = await fetch("http://localhost:4000/", {
            method: 'POST',
            body: formData
        });

        if(res.status) {
            SwapCalls.fire("Great job!", "You've passed the challenge", "success");
            setSuccess(true);
        }

        if(success) {
            return <Confetti/>
        }
    };

    return (
        <MainContainer>
        <Typography component="h2" variant="h5">
            Form Values
        </Typography>
        <TableContainer className={styles.root} component={Paper}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        entries.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell>
                                    {
                                        entry[0]
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        entry[1].toString()
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        {
            files && (
               <>
                <Typography component="h2" variant="h5">
                    Files
                </Typography>
                <List>
                    {
                        files.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                     <InsertDriveFile/>
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size}/>
                            </ListItem>
                        ))
                    }
                </List>
               </> 
            )
        }
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link to="/">Start Over</Link>
    </MainContainer>
    )
};