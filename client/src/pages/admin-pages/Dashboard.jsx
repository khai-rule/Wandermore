import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../../components/DashboardTable";
import AuthAPI from "../../utils/AuthAPI";

const Dashboard = () => {
  const { auth, loginID } = useContext(AuthAPI);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== true || loginID !== "63a2d821c9a00cb6cee4d134") {
      navigate("/");
    }
  }, [auth]);

  //TODO Overview of request
  // Show completed and uncomplete request
  // click on it to edit their itinerary
  // sort by latest and/or uncomplete

  return (
    <div>
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
