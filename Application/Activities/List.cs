// return list of activities
// go-between application and api
// query handler

using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // IRequest will return list of activity as specified
        // will form a request to be passed to handler
        public class Query : IRequest<List<Activity>> {}

        // pass query to handler, return list
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext _context;

            // inject DB Context, to get list from database
            public Handler(DataContext context)
            {
                _context = context;
            }

            // return task must be async method
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return activities
                return await _context.Activities.ToListAsync();
            }
        }
    }
}