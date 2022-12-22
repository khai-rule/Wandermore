import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";

const Activities = ({ activities, departureDate, returnDate }) => {


    //! Get all Dates and Day Number

        //! Display all the days
        const startDate = new Date(departureDate);
        const endDate = new Date(returnDate);
    
        let currentDate = startDate
        const dateList = [];
        
        while (currentDate <= endDate) {
          dateList.push(formatDate(currentDate));
          currentDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24));
        }

        const displayDate = dateList?.map((date, index) => date) // [ array of all the dates of this trip ]


    //! Display Activities
    const displayActivities = (day) => {

        const getActivities = activities?.map(activity => {

            const name = capitaliseFirstLetter(activity?.name)
            const date = formatDate(activity?.date)
            const location = capitaliseFirstLetter(activity?.location)
            const startTime = activity?.startTime
            const endTime = activity?.endTime
            const description = capitaliseFirstLetter(activity?.description)
            const photo1 = activity?.photo1
            const photo2 = activity?.photo2
        
            return (
                <div key={name}>
                    <h1>{day}</h1>
                    <h2>{name}</h2>
                    <h4>{date}</h4>
                    <h4>{location}</h4>
                    <h5>{startTime} - {endTime}</h5>
                    <p>{description}</p>
                    <img src={photo1} alt={name} width="500"/>
                    {photo2 === "" ? <></> : <img src={photo2} alt={name} width="500"/>}
                </div>
            );
        });
        return getActivities
    };


    return (
        <div>
            {displayActivities()}
        </div>
    );
}
 
export default Activities;