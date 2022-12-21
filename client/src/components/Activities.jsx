import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";

const Activities = ({ activities }) => {


    //! Display Activities
    const displayActivities = () => {
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
                    <h2>{name}</h2>
                    <h4>{date}</h4>
                    <h4>{location}</h4>
                    <h5>{startTime} - {endTime}</h5>
                    <p>{description}</p>
                    <img src={photo1} width="500"/>
                    <img src={photo2} width="500"/>
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