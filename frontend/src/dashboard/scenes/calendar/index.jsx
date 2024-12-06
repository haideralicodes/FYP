import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { Header } from "../../components";
import { formatDate } from "@fullcalendar/core";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(max-width:920px)");
  const isSmDevices = useMediaQuery("(max-width:600px)");
  const isXsDevices = useMediaQuery("(max-width:380px)");

  const [initialEvents, setInitialEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const fetchScheduledPosts = async () => {
        try {
            console.log("Fetching.........")
            const response = await fetch('http://localhost:4000/api/get-scheduled-posts');
            if (!response.ok) {
                throw new Error('Failed to fetch scheduled posts');
            }
            
            const storedPosts = await response.json();
            console.log(storedPosts)

            const newEvents = storedPosts.map(post => {
                const { imageUrl, text, scheduledTime } = post;

                console.log("imageUrl: ", imageUrl, ", text: ", text, ", scheduledTime: ", scheduledTime)

                return {
                    id: `${scheduledTime}-${text}`,
                    title: text,
                    start: scheduledTime,
                    end: scheduledTime,
                    allDay: false,
                    extendedProps: {
                        image: imageUrl,
                        hashtags: post.hashtags,
                    },
                };
            });

            setInitialEvents(newEvents);
            setCurrentEvents(newEvents);

        } catch (error) {
            console.error('Error fetching scheduled posts:', error);
        }
    };

    fetchScheduledPosts();
  }, []);

  const renderEventContent = (eventInfo) => {
    console.log("Rendering Image:", eventInfo.event.extendedProps.image);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          gap:"10px"
        }}
      >
        {eventInfo.event.extendedProps.image && (
          <img
            src={eventInfo.event.extendedProps.image}
            style={{ width: '100px', height: '120px',  maxHeight: '100px', borderRadius: '30px' }}
            alt="Event"
          />
        )}
      </Box>
    );
  };

  return (
    <Box m="20px">
      <Header title="Calendar" />
      <Box display="flex" justifyContent="space-between" gap={2}>
        {/* CALENDAR SIDEBAR */}
        <Box
          display={`${isMdDevices ? "none" : "block"}`}
          flex="1 1 20%"
          bgcolor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  bgcolor: `${colors.greenAccent[500]}`,
                  my: "10px",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {event.extendedProps.hashtags}
                      </Typography>
                    </Typography>
                  }
                />
                {event.extendedProps.image && (
                  <img
                    src={event.extendedProps.image}
                    alt="Event"
                    style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box
          flex="1 1 100%"
          sx={{
            "& .fc-list-day-cushion ": {
              bgcolor: `${colors.greenAccent[500]} !important`,
            },
          }}
        >
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: `${isSmDevices ? "prev,next" : "prev,next today"}`,
              center: "title",
              right: `${
                isXsDevices
                  ? ""
                  : isSmDevices
                  ? "dayGridMonth,listMonth"
                  : "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
              }`,
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventsSet={(events) => setCurrentEvents(events)}
            eventContent={renderEventContent}
            events={initialEvents}
            eventDidMount={(info) => {
              info.el.setAttribute('title', '');
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
