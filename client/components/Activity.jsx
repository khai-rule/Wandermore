const Activity = () => {
    const [inDatabase, setInDatabase] = useState();


    //! Fetch Data
    const fetchData = async () => {
    try {
    const request = await fetch("/api/aboutyou")
    if (!request.ok) {
    throw new Error ("Network error");
    }
    const data = await request.json();
    if (data.length < 1) {
        console.log("no data");
    } else {
        setInDatabase(data[0]);
        console.log("data", inDatabase)
    }
    } catch (error) {
    console.error(error);
        };
    };
    
    useEffect(() => {fetchData()}, []);

    return (
        <div>

        </div>
    );
}
 
export default Activity;