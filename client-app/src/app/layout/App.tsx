import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
   //  ! Variable/State
   const [activities, setActivities] = useState<Activity[]>([]);
   // * State can be activity or undefined with default undefined
   const [selectedActivity, setSelectedActivity] = useState<
      Activity | undefined
   >(undefined);

   // will execute once program run
   useEffect(() => {
      axios
         .get<Activity[]>("http://localhost:5000/api/activities")
         .then((response) => {
            // console.log(response);
            setActivities(response.data);
         });
   }, []);

   // * Receive id
   function handleSelectActivity(id: string) {
      // ! Activity id matches with received id
      setSelectedActivity(activities.find((x) => x.id === id));
   }

   function handleCancelSelectActivity() {
      setSelectedActivity(undefined);
   }

   return (
      <>
         <NavBar />

         <Container style={{ marginTop: "7em" }}>
            {/* pass activities to dashboard */}
            <ActivityDashboard
               activities={activities}
               selectedActivity={selectedActivity}
               selectActivity={handleSelectActivity}
               cancelSelectActivity={handleCancelSelectActivity}
            />
         </Container>
      </>
   );
}

export default App;
