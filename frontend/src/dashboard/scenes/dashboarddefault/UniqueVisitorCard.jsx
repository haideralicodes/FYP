import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from '../../components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard() {
  const [slot, setSlot] = useState('week');

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{height:"74px"}} >
        <Grid item>
          <Typography variant="h3" sx={{ml:1, fontSize:"35px", fontWeight:"550", mb:2}}>Unique Visitor</Typography>
        </Grid>
        <Grid item >
          <Stack direction="row" alignItems="center" spacing={3} sx={{mr:2, mb:2}}>
            <Button
              size="large"
              sx={{color:"#3a0ca3", fontWeight:"550", fontSize:"13px", border:"1px solid #3a0ca3", borderRadius:"20px", width:"80px"}}
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size="large"
              sx={{display: 'inline-block', borderRadius:"20px", backgroundColor:"#FFAFCC", fontWeight:"550", fontSize:"13px", border:"1px solid black"}}
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'primary'}
              variant={slot === 'week' ? 'outlined' : 'outlined'}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>
      
      <MainCard content={false} sx={{ mt: 1.5, boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.10)' }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot={slot} />
        </Box>
      </MainCard>
    </>
  );
}
