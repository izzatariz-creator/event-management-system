import * as React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

// ! Create Props to receive activities from App.tsx
interface Props {
   closeForm: () => void;
   activity: Activity | undefined;
   createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({
   closeForm,
   activity: selectedActivity,
   createOrEdit,
}: Props) {
   // state
   // ! if activity is null then {}
   const initialState = selectedActivity ?? {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
   };

   const [activity, setActivity] = useState(initialState);

   // * Function to handle form submission
   function handleSubmit() {
      // console.log(activity);
      createOrEdit(activity);
   }

   // * Function to handle input change
   function handleInputChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      // ! Track value inside form
      const { name, value } = event.target;
      // ! Spread existing property of activity, assign value to property with specific key of name
      setActivity({ ...activity, [name]: value });
   }

   return (
      // * Clear Float inside HTML
      <Segment clearing>
         <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input
               placeholder="Title"
               value={activity.title}
               name="title"
               onChange={handleInputChange}
            />
            <Form.TextArea
               placeholder="Description"
               value={activity.description}
               name="description"
               onChange={handleInputChange}
            />
            <Form.Input
               placeholder="Category"
               value={activity.category}
               name="category"
               onChange={handleInputChange}
            />
            <Form.Input
               type="date"
               placeholder="Date"
               value={activity.date}
               name="date"
               onChange={handleInputChange}
            />
            <Form.Input
               placeholder="City"
               value={activity.city}
               name="city"
               onChange={handleInputChange}
            />
            <Form.Input
               placeholder="Venue"
               value={activity.venue}
               name="venue"
               onChange={handleInputChange}
            />
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
