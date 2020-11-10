import React from 'react';
import {MainContainer} from './component/MainContainer';
import Typography from '@material-ui/core/Typography';
import {Form} from './component/Form';
import { FileInput } from './component/FileInput';
import { useForm } from "react-hook-form";
import {PrimaryButton} from './component/PrimaryButton';
import {useHistory}  from 'react-router-dom';
import {useData} from './DataContext';

export const Step3 = () => {
    const history = useHistory();
    const {data, setValues} = useData();
    // eslint-disable-next-line
    const {control, handleSubmit} = useForm({
        files: data.files
    });

    const onSubmit = (data) => {
        history.push("/result");
        setValues(data);
    }

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                Step 3
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control}/> 
            <PrimaryButton>Next</PrimaryButton>
            </Form>  
        </MainContainer>
    )
}