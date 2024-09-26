import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { Header } from "../../components";
import { Grid2 } from '@mui/material';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AnalyticEcommerce from '../../components/AnalyticEcommerce';
import MonthlyBarChart from '../dashboarddefault/MonthlyBarChart';
import MainCard from '../../components/MainCard';

const Store = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDesignSite = () => {
    navigate('/provide-business-details');
  };

  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const delays = [0, 200, 400]; // Delays for each box
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAnimationDelay((prev) => prev + 1);
      }, delay + index * 300); // Incremental delay for pop-out effect
    });
  }, []);

  return (
    <>
      <Grid2 item xs={12} sx={{ mb: -2.25, ml: 5, display: "flex", alignItems: "center" }}>
        <lord-icon
          src="https://cdn.lordicon.com/yxyampao.json"
          trigger="in"
          colors="primary:#8B79D9"
          style={{height:"80px", width:"80px"}}>
        </lord-icon>
        <Typography variant="h1" sx={{ fontSize: "35px", fontWeight: "550", ml: 3 }}>Setup Your Store</Typography>
      </Grid2>

      <Grid2 sx={{ display: "flex", alignItems: "center" }}>
        <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "70px" }}>
          {[ 
            {
              title: "Design your Website",
              buttonText: "Design Ur Site",
              icon: <DashboardCustomizeOutlinedIcon />,
              onClick: handleDesignSite
            },
            {
              title: "Set Up Payment Method",
              buttonText: "Setup Payment",
              icon: <AddCardOutlinedIcon />,
              onClick: handleDesignSite
            },
            {
              title: "Preview your Website",
              buttonText: "Preview Site",
              icon: <DesktopMacOutlinedIcon />,
              onClick: handleDesignSite
            }
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                m: 4,
                bgcolor: "white",
                borderRadius: "20px",
                width: "40vw",
                boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)',
                opacity: animationDelay > index ? 1 : 0, // Fade in effect
                transform: animationDelay > index ? 'translateY(0)' : 'translateY(120px)', // Pop-out effect
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <Box
                sx={{
                  backgroundColor: colors.white || '#defaultWhiteColor',
                  width: "100%",
                  p: 4,
                  textAlign: 'left',
                }}
              >
                <Box sx={{ marginBottom: '10px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: "100%",
                      alignItems: 'center',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  >
                    <Typography
                      flexGrow={1}
                      variant="h5"
                      fontWeight="600"
                      color={colors.gray[100]}
                    >
                      {item.title}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        color: 'black',
                        borderRadius: '30px',
                        fontSize: "14px",
                        fontWeight: 550,
                        height: "50px",
                        width: "190px",
                        backgroundColor: "#B3BEFF",
                        border: "none",
                        transition: ".4s ease",
                        ':hover': {
                          backgroundColor: "#60308C",
                          color: "white",
                        },
                      }}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      {item.buttonText}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

        </Grid2>

        <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Grid2 item xs={12} md={5} lg={4}>
            <MainCard content={false}>
              <MonthlyBarChart />
            </MainCard>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={5} lg={4} sx={{ width: "500px", mt: 5, mb: 5 }}>
            <AnalyticEcommerce title="Total Views" count="4,42,236" percentage={59.3} extra="35,000" backgroundColor="#b7e4c7" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={5} lg={4} sx={{ width: "500px", mb: 10 }}>
            <AnalyticEcommerce title="Total Orders" isLoss count="4,236" percentage={64.4} extra="-1000" backgroundColor="#b3beff" />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Store;
