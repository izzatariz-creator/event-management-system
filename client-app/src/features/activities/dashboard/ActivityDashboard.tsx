import * as React from "react";
import { Container, Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";

// ! Create Props to receive activities from App.tsx
interface Props {
   activities: Activity[]; //
}

// Destructure Props - props is a type of Props
// ! Destructure activities passed from App.tsx
export default function ActivityDashboard({ activities }: Props) {
   return (
      <Grid>
         <Grid.Column width="10">
            {/*  List Activities */}
            <ActivityList activities={activities} />
         </Grid.Column>
      </Grid>
   );
}
