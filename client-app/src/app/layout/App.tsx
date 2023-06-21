import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

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

         {/*  List Activities */}
         <Container style={{ marginTop: "7em" }}>
            <List>
               {activities.map((activity) => (
                  <li key={activity.id}>{activity.title}</li>
               ))}
            </List>
         </Container>
      </>
   );
}

export default App;
