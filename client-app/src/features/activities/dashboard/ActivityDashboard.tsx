import * as React from "react";
import { Container, Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// ! Create Props to receive activities from App.tsx
interface Props {
   activities: Activity[]; //
}

// Destructure Props - props is a type of Props
// ! Destructure activities passed from App.tsx
export default function ActivityDashboard({ activities }: Props) {
   return (
      <Grid>
         {/*  List Activities */}
         <Grid.Column width="10">
            <ActivityList activities={activities} />
         </Grid.Column>
         <Grid.Column width="6">
            {/*  List Activity Details */}
            {activities[0] && <ActivityDetails activity={activities[0]} />}
            {/*  List Form */}
            <ActivityForm />
         </Grid.Column>
      </Grid>
   );
}
