import * as React from "react";
import { Container, Grid, List } from "semantic-ui-react";
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
}

// Destructure Props - props is a type of Props
// ! Destructure activities/Props passed from App.tsx
export default function ActivityDashboard({
   activities,
   selectedActivity,
   selectActivity,
   cancelSelectActivity,
}: Props) {
   return (
      <Grid>
         {/*  List Activities */}
         <Grid.Column width="10">
            <ActivityList
               activities={activities}
               selectActivity={selectActivity}
            />
         </Grid.Column>
         <Grid.Column width="6">
            {/*  List Activity Details */}
            {selectedActivity && (
               <ActivityDetails
                  activity={selectedActivity}
                  cancelSelectActivity={cancelSelectActivity}
               />
            )}
            {/*  List Form */}
            <ActivityForm />
         </Grid.Column>
      </Grid>
   );
}
