import React from 'react';
import { Box, Typography, Button, TextField, Divider, useTheme } from '@mui/material';
import { tokens } from '../../theme'; // Import the tokens for consistent color usage
import { useNavigate } from 'react-router-dom';
import { Header } from "../../components";

const Store = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDesignSite = () => {
    navigate('/provide-business-details');
  };

  return (
    <Box
      sx={{
        marginLeft: '30px',
        marginTop: '30px',
        marginBottom: '50px',
        backgroundColor: "#fcfcfc" || '#defaultBackgroundColor',
        padding: '20px',
        width:'76vw',
        borderRadius:"10px",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        // border:"2px solid blue",
      }}
    >

      <Box
        sx={{
          backgroundColor: colors.white || '#defaultWhiteColor',
          width:"1130px",
          padding: '30px',
          marginBottom: '100px',
          textAlign: 'left',
          boxShadow: `0 2px 5px ${colors.grey?.[300] || '#defaultShadowColor'}`,
          // border:"2px solid green",
        }}
      >
        <Header title="Setup your Business"/>

        <Box sx={{ marginBottom: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '15px',
              paddingBottom: '15px',
              border: `1px solid ${colors.grey?.[300] || '#defaultBorderColor'}`,
              backgroundColor: colors.white,
              ':hover': {
                backgroundColor: colors.grey?.[100] || '#defaultHoverColor',
              },
            }}
          >
            <Box sx={{ marginRight: '10px', fontSize: '20px', color: colors.primary[600] }}>•</Box>

            <Typography
                flexGrow={1}
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
                Design your Website
            </Typography>

            <Button
              variant="outlined"
              sx={{
                color: colors.primary[600],
                borderColor: colors.primary[600],
                borderRadius: '5px',
                fontWeight: 600,
                height:"40px",
                width:"150px",
                backgroundColor: "#4cceac",
                border:"none",
                transition: ".4s ease",
                ':hover': {
                  backgroundColor: "#4cceac",
                  color: "white",
                },
              }}
              onClick={handleDesignSite}
            >
              Design Your Site
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginBottom: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '15px',
              paddingBottom:'15px',
              border: `1px solid ${colors.black?.[300] || '#defaultBorderColor'}`,
              backgroundColor: colors.white,
              ':hover': {
                backgroundColor: colors.grey?.[100] || '#defaultHoverColor',
              },
            }}
          >
            <Box sx={{ marginRight: '10px', fontSize: '20px', color: colors.primary[600] }}>•</Box>

            <Typography
                flexGrow={1}
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
                Connect Custom Domain
            </Typography>

            <Button
              variant="outlined"
              sx={{
                color: colors.primary[600],
                borderColor: colors.primary[600],
                borderRadius: '5px',
                fontWeight: 600,
                height:"40px",
                width:"150px",
                backgroundColor: "#4cceac",
                border:"none",
                transition: ".4s ease",
                ':hover': {
                  backgroundColor: "#4cceac",
                  color: "white",
                },
              }}
            >
              Connect Domain
            </Button>
          </Box>
        </Box>


        <Box sx={{ marginBottom: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '15px',
              paddingBottom: '15px',
              border: `1px solid ${colors.grey?.[300] || '#defaultBorderColor'}`,
              borderRadius: '5px',
              backgroundColor: colors.white,
              ':hover': {
                backgroundColor: colors.grey?.[100] || '#defaultHoverColor',
              },
            }}
          >
            <Box sx={{ marginRight: '10px', fontSize: '20px', color: colors.primary[600] }}>•</Box>
            
            <Typography
                flexGrow={1}
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
              Set Up Payments
            </Typography>

            <Button
              variant="outlined"
              sx={{
                color: colors.primary[600],
                borderColor: colors.primary[600],
                borderRadius: '5px',
                fontWeight: 600,
                height:"40px",
                width:"150px",
                backgroundColor: "#4cceac",
                border:"none",
                transition: ".4s ease",
                ':hover': {
                  backgroundColor: "#4cceac",
                  color: "white",
                },
              }}
            >
              Set Up Payments
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginBottom: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '15px',
              border: `1px solid ${colors.grey?.[300] || '#defaultBorderColor'}`,
              backgroundColor: colors.white,
              ':hover': {
                backgroundColor: colors.grey?.[100] || '#defaultHoverColor',
              },
            }}
          >
            <Box sx={{ marginRight: '10px', fontSize: '20px', color: colors.primary[600] }}>•</Box>
            
            <Typography
                flexGrow={1}
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
              Setup Shipping & Delievery
            </Typography>

            <Button 
              variant="outlined"
              sx={{
                color: colors.primary[600],
                borderColor: colors.primary[600],
                borderRadius: '5px',
                fontWeight: 600,
                height:"40px",
                width:"150px",
                backgroundColor: "#4cceac",
                border:"none",
                transition: ".4s ease",
                ':hover': {
                  backgroundColor: "#4cceac",
                  color: "white",
                },
              }}
            >
              Set Up Shipping
            </Button>
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Store;
