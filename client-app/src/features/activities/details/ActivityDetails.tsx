import * as React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

// * Interface
interface Props {
   activity: Activity;
   // * Function -> cancelSelectActivity returns void
   cancelSelectActivity: () => void;
   openForm: (id: string) => void;
}

// * Function
export default function ({ activity, cancelSelectActivity, openForm }: Props) {
   return (
      <Card fluid>
         {/* 'backtick' allows us to add JS property inside string  */}
         <Image src={`/assests/categoryImages/${activity.category}.jpg`} />
         <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
               <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>{activity.description}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <Button.Group widths="2">
               <Button
                  onClick={() => openForm(activity.id)}
                  basic
                  color="blue"
                  content="Edit"
               />
               <Button
                  onClick={cancelSelectActivity}
                  basic
                  color="grey"
                  content="Cancel"
               />
            </Button.Group>
         </Card.Content>
      </Card>
   );
}
