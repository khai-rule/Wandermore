const formatDate = (date) => {

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

    const toDate = new Date(date)
    const formatted = (toDate?.toLocaleString("en-US", options))
    return formatted
}

export default formatDate;