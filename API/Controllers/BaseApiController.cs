using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")] // placeholder for controller name

    public class BaseApiController : ControllerBase
    {
        // only can be used by this class
        private IMediator _mediator;

        // can be used by any derived classes
        // => is return
        // if _mediator is null then assign value to Mediator
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}