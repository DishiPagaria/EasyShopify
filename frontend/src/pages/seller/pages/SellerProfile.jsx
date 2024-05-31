import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Paper, Typography, Avatar, TextField, Button } from '@mui/material';
import axios from 'axios'; 
import { updateCurrentUser } from '../../../redux/userSlice';


const SellerProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        shopName: currentUser.shopName,
        email: currentUser.email,
        role: currentUser.role
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to your API endpoint to update the seller profile
      const response = await axios.put('/api/seller/profile', formData);

      // Update the user data in the Redux store
      dispatch(updateCurrentUser(response.data));

      // Display success message or perform any other actions upon successful update
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      // Handle error - display error message or perform appropriate actions
      console.error('Error updating profile:', error.message);
    }
    setIsEditing(false); // Set editing mode to false regardless of success or failure
  };

  return (
    <ProfileContainer>
      <ProfileHeader elevation={3}>
        <ProfileAvatar>
          <h1>{currentUser ? currentUser.name[0].toUpperCase() : ''}</h1>
        </ProfileAvatar>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        ) : (
          <>
            <ProfileName sx={{ padding: '0', fontWeight: 'bold' }}>
              {currentUser ? currentUser.shopName : ''}
            </ProfileName>
            <ProfileName variant="h5">
              {currentUser ? currentUser.name : ''}
            </ProfileName>
            <ProfileText variant="h6">
              Email: {currentUser ? currentUser.email : ''}
            </ProfileText>
            <ProfileText variant="h6">
              Role: {currentUser ? currentUser.role : ''}
            </ProfileText>
            {/* <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button> */}
          </>
        )}
      </ProfileHeader>
    </ProfileContainer>
  );
};

export default SellerProfile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileHeader = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 40%;
  background-color: #f0f0f0;
`;

const ProfileAvatar = styled(Avatar)`
  padding: 30px;
  background-color: #3f51b5;
  margin-bottom: 10px;
`;

const ProfileName = styled(Typography)`
  padding: 10px;
`;

const ProfileText = styled(Typography)`
  margin-bottom: 10px;
`;
