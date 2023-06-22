import * as React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

// ! Create Props to receive activities from App.tsx
interface Props {
   closeForm: () => void;
   activity: Activity | undefined;
}

export default function ActivityForm({ closeForm, activity }: Props) {
   return (
      // * Clear Float inside HTML
      <Segment clearing>
         <Form>
            <Form.Input placeholder="Title" />
            <Form.TextArea placeholder="Description" />
            <Form.Input placeholder="Category" />
            <Form.Input placeholder="Date" />
            <Form.Input placeholder="City" />
            <Form.Input placeholder="Venue" />
            <Button floated="right" positive type="submit" content="Submit" />
            <Button
               onClick={closeForm}
               floated="right"
               type="button"
               content="Cancel"
            />
         </Form>
      </Segment>
   );
}
