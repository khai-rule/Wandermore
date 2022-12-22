import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";
import Typography from "./mui-components/Typography";
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";

const Activities = ({ activities, departureDate, returnDate }) => {

  //! Get all Dates and Day Number

  const sortedByDate = activities?.sort(function (a, b) {
    return (
      new Date(a.date).getTime() - new Date(b.date).getTime() ||
      a.startTime?.localeCompare(b.startTime)
    );
  });

    // console.log("sort", sortedByDate);

    
//     const displayDay = () => {
//       //! Display all the days
//       const startDate = new Date(departureDate);
//       const endDate = new Date(returnDate);
    
//       let currentDate = startDate;
//       const dateList = [];
    
//       while (currentDate <= endDate) {
//         dateList.push(formatDate(currentDate));
//         currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
//       }
    
//       const displayDate = dateList?.map((date, index) => {
//         return (
//             <>
//                 <h1>Day {index + 1}</h1>
//                 <h2>{date}</h2>
//             </>
//         )
//       });
//       return displayDate
//   }




  //! Display Activities
  const displayActivities = (day) => {

     const getActivities = activities?.map((activity) => {
        const name = capitaliseFirstLetter(activity?.name);
        const date = formatDate(activity?.date);
        const location = capitaliseFirstLetter(activity?.location);
        const startTime = activity?.startTime;
        const endTime = activity?.endTime;
        const description = capitaliseFirstLetter(activity?.description);
        const photo1 = activity?.photo1;
        const photo2 = activity?.photo2;

        return (
          <Container key={name} sx={{ mt: 4, mb: 15, display: 'flex', position: 'relative', flexDirection: 'column', alignItems:"center" }}>
            <Typography variant="h1">{day}</Typography>
            <Typography variant="subtitle2">{date}</Typography>
            <Typography variant="subtitle2">
              {startTime} - {endTime}
            </Typography>
            <Typography variant="h4" sx={{ py:1 }}>{name}</Typography>
            <Typography variant="p" color="text.secondary" sx={{ py:1 }}>{location}</Typography>
            <Typography variant="p" sx={{ py:1, px: 24 }}>{description}</Typography>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 4 }}
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={6}><img src={photo1} alt={name} width="500" /></Grid>
                {photo2 === "" ? <></> : <Grid item xs={6}><img src={photo2} alt={name} width="500" /></Grid>}
            </Grid>

          </Container>
        );
      });
      return getActivities;
    };



  return (
    <>
        {displayActivities()}
    </>
  )
};

export default Activities;
