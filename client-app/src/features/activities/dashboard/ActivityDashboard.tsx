import * as React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// ! Create Props to receive activities from App.tsx
interface Props {
   activities: Activity[];
   selectedActivity: Activity | undefined;
   // * Function -> selectActivity returns void
   selectActivity: (id: string) => void;
   // * Function -> cancelSelectActivity returns void
   cancelSelectActivity: () => void;
   editMode: boolean;
   openForm: (id: string) => void;
   closeForm: () => void;
   createOrEdit: (activity: Activity) => void;
   deleteActivity: (id: string) => void;
   submitting: boolean;
}

// Destructure Props - props is a type of Props
// ! Destructure activities/Props passed from App.tsx
export default function ActivityDashboard({
   activities,
   selectedActivity,
   selectActivity,
   cancelSelectActivity,
   editMode,
   openForm,
   closeForm,
   createOrEdit,
   deleteActivity,
   submitting,
}: Props) {
   return (
      <Grid>
         {/*  List Activities */}
         <Grid.Column width="10">
            <ActivityList
               activities={activities}
               selectActivity={selectActivity}
               deleteActivity={deleteActivity}
            />
         </Grid.Column>
         <Grid.Column width="6">
            {/*  List Activity Details */}
            {selectedActivity && !editMode && (
               <ActivityDetails
                  activity={selectedActivity}
                  cancelSelectActivity={cancelSelectActivity}
                  openForm={openForm}
               />
            )}
            {/*  List Form if in edit mode*/}
            {editMode && (
               <ActivityForm
                  closeForm={closeForm}
                  activity={selectedActivity}
                  createOrEdit={createOrEdit}
                  submitting={submitting}
               />
            )}
         </Grid.Column>
      </Grid>
   );
}
