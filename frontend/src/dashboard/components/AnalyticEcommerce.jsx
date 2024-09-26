// import PropTypes from 'prop-types';

// // material-ui
// import Chip from '@mui/material/Chip';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import MainCard from '../components/MainCard';

// // assets
// import RiseOutlined from '@ant-design/icons/RiseOutlined';
// import FallOutlined from '@ant-design/icons/FallOutlined';

// const iconSX = { fontSize: '1.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

// export default function AnalyticEcommerce({ title, count, percentage, isLoss, extra, backgroundColor }) {
//   return (
//     <MainCard contentSX={{ p: 3, height:"210px", backgroundColor: backgroundColor || '#f9dee8' }} sx={{ boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)'}} >
//       <Stack spacing={4}>
//         <Typography variant="h4" sx={{fontWeight:"bold"}} color="#111c2d">
//           {title}
//         </Typography>
//         <Grid container alignItems="center">
//           <Grid item>
//             <Typography variant="h1" sx={{fontWeight:"550"}} color="inherit">
//               {count}
//             </Typography>
//           </Grid>
//           {percentage && (
//             <Grid item>
//               <Chip
//                 variant="combined"
//                 icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
//                 label={`${percentage}%`}
//                 sx={{ ml: 3, mt:1, pl: 1, width:"115px", height:"40px", borderRadius:"30px", backgroundColor: '#8965e5', color:"white", fontSize:"16px" }}
//                 size="medium"
//               />
//             </Grid>
//           )}
//         </Grid>
//       </Stack>

//       <Box sx={{ pt: 2.25, mt:2}}>
//         <Typography variant="h5" sx={{fontWeight:"bold"}} color="#111c2d" component="span">
//           You made an extra{' '}
//           <Typography variant="h5" sx={{ color: "blue", border:"1px solid black", pl:1, pr:1, pt:0.15, pb:0.15, borderRadius:"20px" }} component="span">
//             {extra}
//           </Typography>{' '}
//           this year
//         </Typography>
//       </Box>

//     </MainCard>
//   );
// }

// AnalyticEcommerce.propTypes = {
//   color: PropTypes.string,
//   title: PropTypes.string,
//   count: PropTypes.string,
//   percentage: PropTypes.number,
//   isLoss: PropTypes.bool,
//   extra: PropTypes.string,
//   backgroundColor: PropTypes.string
// };






























import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

// project import
import MainCard from '../components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import CountUp from 'react-countup';

const iconSX = { fontSize: '1.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ title, count, percentage, isLoss, extra, backgroundColor, delay }) {
  
    const [visible, setVisible] = useState(false);

    const numericCount = parseInt(count.replace(/[^0-9.-]+/g,""));

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
    return (
    <Grow in={visible} timeout={1000}>
    <MainCard contentSX={{ p: 3, height:"210px", backgroundColor: backgroundColor || '#f9dee8' }} sx={{ boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)'}} >
      <Stack spacing={4}>
        <Typography variant="h4" sx={{fontWeight:"bold"}} color="#111c2d">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h1" sx={{fontWeight:"550"}} color="inherit">
              <CountUp end={numericCount} duration={2.5} separator="," prefix="$" />
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                label={`${percentage}%`}
                sx={{ ml: 3, mt:1, pl: 1, width:"115px", height:"40px", borderRadius:"30px", backgroundColor: '#8965e5', color:"white", fontSize:"16px" }}
                size="medium"
              />
            </Grid>
          )}
        </Grid>
      </Stack>

      <Box sx={{ pt: 2.25, mt:2}}>
        <Typography variant="h5" sx={{fontWeight:"bold"}} color="#111c2d" component="span">
          You made an extra{' '}
          <Typography variant="h5" sx={{ color: "blue", border:"1px solid black", pl:1, pr:1, pt:0.15, pb:0.15, borderRadius:"20px" }} component="span">
            {extra}
          </Typography>{' '}
          this year
        </Typography>
      </Box>
    </MainCard>
    </Grow>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  backgroundColor: PropTypes.string
};




