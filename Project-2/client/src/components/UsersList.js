import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { TextField, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, makeStyles } from '@material-ui/core';
import CreateUserForm from './CreateUserForm';
import { useNavigate } from 'react-router-dom';
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


const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
    // Add more styles as needed
}));
const UsersList = () => {
    const navigate = useNavigate();
    const details = (id) => {
      navigate(`/user-details/${id}`)
    }
    const classes = useStyles();
    const { loading, error, data } = useQuery(GET_USERS_QUERY);
   
    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users!</p>;
   
    return (
        <>
            
      
            <List>
                {data.users.map((user) => (
                    <Card key={user.id} className={classes.card} onClick={() => details(user.id)}>
                        <CardContent>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
                                <div>
                                  
                                </div>
                            </ListItem>
                        </CardContent>
                    </Card>
                ))}
            
            </List>
            <CreateUserForm />
        </>
    );
};
export default UsersList