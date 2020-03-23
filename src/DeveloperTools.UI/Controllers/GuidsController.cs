using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace DeveloperTools.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GuidsController : EnhancedControllerBase<GuidsController>
    {
        const int LOWER_REQUEST_LIMIT = 1;
        const int HIGH_REQUEST_LIMIT = 1000;

        public GuidsController(ILogger<GuidsController> logger)
            : base(logger)
        {
        }

        [HttpGet]
        public IActionResult Get(int numberOfGuids = 50)
        {
            if (numberOfGuids < LOWER_REQUEST_LIMIT || numberOfGuids > HIGH_REQUEST_LIMIT)
            {
                return BadRequest($"Number of requested GUIDs has to be between {LOWER_REQUEST_LIMIT} and {HIGH_REQUEST_LIMIT}.");
            }

            var result = Enumerable.Range(0, numberOfGuids).Select(x => Guid.NewGuid());

            return Ok(result);
        }
    }
}
