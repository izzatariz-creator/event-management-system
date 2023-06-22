import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
   //  ! Variable/State
   const [activities, setActivities] = useState<Activity[]>([]);
   // * State can be activity or undefined with default undefined
   const [selectedActivity, setSelectedActivity] = useState<
      Activity | undefined
   >(undefined);
   //  ! Variable/State
   const [editMode, setEditMode] = useState(false);

   // * will execute once program run
   useEffect(() => {
      axios
         .get<Activity[]>("http://localhost:5000/api/activities")
         .then((response) => {
            // console.log(response);
            setActivities(response.data);
         });
   }, []);

   // * Receive id when button is clicked, Set selectedActivity to id when view button is clicked
   function handleSelectActivity(id: string) {
      // ! Activity id matches with received id
      setSelectedActivity(activities.find((x) => x.id === id));
   }

   // * Set selectedActivity to undefined when cancel button is clicked
   function handleCancelSelectActivity() {
      setSelectedActivity(undefined);
   }

   // * Receive optional id, check handleSelectActivity, open form
   function handleFormOpen(id?: string) {
      // ! if id is populated, pass id to handleSelectActivity, if not handleCancelSelectActivity is set to undefined
      id ? handleSelectActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
   }

   // * Close form
   function handleFormClose() {
      setEditMode(false);
   }

   function handleCreateOrEditActivity(activity: Activity) {
      activity.id
         ? setActivities([
              ...activities.filter((x) => x.id !== activity.id),
              activity,
           ]) // * Edit
         : setActivities([...activities, { ...activity, id: uuid() }]); // * Create id during activity creation

      setEditMode(false);
      setSelectedActivity(activity);
   }

   return (
      <>
         <NavBar openForm={handleFormOpen} />

         <Container style={{ marginTop: "7em" }}>
            {/* pass activities to dashboard */}
            <ActivityDashboard
               activities={activities}
               selectedActivity={selectedActivity}
               selectActivity={handleSelectActivity}
               cancelSelectActivity={handleCancelSelectActivity}
               editMode={editMode}
               openForm={handleFormOpen}
               closeForm={handleFormClose}
               createOrEdit={handleCreateOrEditActivity}
            />
         </Container>
      </>
   );
}

export default App;
