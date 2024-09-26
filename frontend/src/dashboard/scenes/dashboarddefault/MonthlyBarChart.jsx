import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 700, 
      animateGradually: {
        enabled: true,
        delay: 70 
      },
      dynamicAnimation: {
        enabled: true,
        speed: 700 
      }
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
      borderRadius: 10,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    dataLabels: {
      enabled: true
    },
  },
  legend: {
    show: false
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;

  // Declare initial series state
  const initialSeries = [
    {
      data: [0, 0, 0, 0, 0, 0] 
    }
  ];

  const [series, setSeries] = useState(initialSeries); 
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    // Create alternating colors for the bars
    const alternatingColors = [50, 90, 70, 20, 65, 55].map((_, index) =>
      index % 2 === 0 ? '#3a0ca3' : '#4895ef'
    );

    setOptions((prevState) => ({
      ...prevState,
      colors: alternatingColors, // Set alternating bar colors
      plotOptions: {
        ...prevState.plotOptions,
        bar: {
          ...prevState.plotOptions.bar,
          distributed: true // Ensure colors are applied per bar
        }
      },
      xaxis: {
        ...prevState.xaxis,
        labels: {
          ...prevState.xaxis.labels,
          style: {
            color:"black",
            fontWeight: 'bolder', // Make labels bold
            fontSize: '15px'    // Adjust font size if needed
          }
        }
      }
    }));

    // Simulate a delay to reset the series and trigger the animation
    setTimeout(() => {
      setSeries([
        {
          data: [50, 90, 70, 20, 65, 55] 
        }
      ]);
    }, 1); 
  }, [primary, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: '#f2f0f0' }}>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
