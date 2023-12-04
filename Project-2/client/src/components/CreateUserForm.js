
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, makeStyles } from '@material-ui/core';

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        backgroundColor: '#4caf50', // Example color, you can choose your own
        color: 'white',
        '&:hover': {
            backgroundColor: '#388e3c', // Darker shade for hover effect
        },
    },
}));
const CreateUserForm = () => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION, {
        refetchQueries: [{ query: GET_USERS_QUERY }],
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser({ variables: { firstName, lastName, email } });
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    return (
        <div>
            <h3 className={classes.form}> Create a new user below :</h3>

            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" disabled={loading} className={classes.button}>Create User</Button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
        </div>
    );
};


export default CreateUserForm