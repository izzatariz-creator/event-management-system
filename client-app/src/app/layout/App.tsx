import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
   //  ! Variable/State
   const [activities, setActivities] = useState<Activity[]>([]);
   // * State can be activity or undefined with default undefined
   const [selectedActivity, setSelectedActivity] = useState<
      Activity | undefined
   >(undefined);
   //  ! Variable/State
   const [editMode, setEditMode] = useState(false);
   const [loading, setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);

   // * will execute once program run
   useEffect(() => {
      agent.Activities.list().then((response) => {
         // console.log(response);
         let activities: Activity[] = [];
         // ? display date inside edit form
         response.forEach((activity) => {
            activity.date = activity.date.split("T")[0];
            activities.push(activity);
         });
         setActivities(response);
         setLoading(false);
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
      setSubmitting(true);
      if (activity.id) {
         // ! Edit Request
         agent.Activities.update(activity).then(() => {
            setActivities([
               ...activities.filter((x) => x.id !== activity.id),
               activity,
            ]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      } else {
         // ! Create Request
         activity.id = uuid();
         agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
         });
      }
   }

   function handleDeleteActivity(id: string) {
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
         setActivities([...activities.filter((x) => x.id !== id)]);
         setSubmitting(false);
      });
   }

   // * Add loading indicators before activities is loaded
   if (loading) return <LoadingComponent content="Loading app" />;

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
               deleteActivity={handleDeleteActivity}
               submitting={submitting}
            />
         </Container>
      </>
   );
}

export default App;
