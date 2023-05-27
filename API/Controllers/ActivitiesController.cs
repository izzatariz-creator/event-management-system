using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // Get List Endpoint
        [HttpGet] // api/activities

        public async Task<ActionResult<List<Activity>>> GetActivites(){ // return list of activities
            // send this query to mediator handler
            return await Mediator.Send(new List.Query());
        }

        // Get an Activity Endpoint
        [HttpGet("{id}")] // api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id){ // return an activity
            return await Mediator.Send(new Details.Query{Id = id});
        }

        // Create an Activity Endpoint
        // IActionResult = ok
        [HttpPost]
        public async Task<IActionResult> CreateActivity (Activity activity){
            return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        // Edit an Activity Endpoint
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){

            activity.Id = id;

            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        // Delete an Activity Endpoint
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}