import React from 'react';
import {Controller} from 'react-hook-form';
import Dropzone from 'react-dropzone';
import { Paper, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {CloudUpload, InsertDriveFile} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#eee",
        marginTop: "20px",
        textAlign: "center",
        cursor: "pointer",
        color: "#333",
        padding: "10px"
    },
    icon: {
        marginTop: "16px",
        color: "#888",
        fontSize: "42px"
    }
}))

export const FileInput = ({control, name}) => {
    const styles = useStyles();

   return (
       <Controller 
            control={control}
            name={name}
            defaultValue={[]}
            render={({onChange, onBlur, value}) => 
            <>
                <Dropzone onDrop={onChange}>
                    {
                        ({getRootProps, getInputProps}) => (
                        <Paper 
                            className={styles.root}
                            variant="outlined" 
                            {...getRootProps()}>
                                    <CloudUpload className={styles.icon}/>
                                    <input
                                        {...getInputProps()}
                                        name={name}
                                        onBlur={onBlur}    
                                    />
                                    <p>Drag 'n' drop files here, or click to select files</p>
                        </Paper>)
                    }
                </Dropzone>
                <List>
                    {
                        value.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile/>
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size}/>
                            </ListItem>
                        ))
                    }
                </List>
            </>}
        />
   )
};