import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
   //  variable
   const [activities, setActivities] = useState<Activity[]>([]);

   // will execute once program run
   useEffect(() => {
      axios
         .get<Activity[]>("http://localhost:5000/api/activities")
         .then((response) => {
            // console.log(response);
            setActivities(response.data);
         });
   }, []);

   return (
      <>
         <NavBar />

         <Container style={{ marginTop: "7em" }}>
            {/* pass activities to dashboard */}
            <ActivityDashboard activities={activities} />
         </Container>
      </>
   );
}

export default App;
