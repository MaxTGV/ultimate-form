import React from 'react';
import {MainContainer} from './component/MainContainer';
import {Form} from './component/Form';
import {Input} from './component/Input';
import {PrimaryButton} from './component/PrimaryButton';
import Typography from '@material-ui/core/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useHistory}  from 'react-router-dom';
import {useData} from './DataContext';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "First name should not contain numbers")
        .required("First name is a required field"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
        .required("Last name is a required field")
    
});

export const Step1 = () => {
    const history = useHistory();
    const {data, setValues} = useData();
    // eslint-disable-next-line
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {firstName: data.firstName,  lastName: data.lastName},
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        history.push("/step2");
        setValues(data);
    }

    return (
        <MainContainer>
             <Typography component="h2" variant="h5">
              Step 1
             </Typography>
             <Form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    ref={register} 
                    id="firstname" 
                    type="text" 
                    label="First Name" 
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                 <Input 
                    ref={register} 
                    id="lastname" 
                    type="text" 
                    label="Last Name" 
                    name="lastName"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <PrimaryButton>Next</PrimaryButton>
             </Form>
        </MainContainer>
    )
}