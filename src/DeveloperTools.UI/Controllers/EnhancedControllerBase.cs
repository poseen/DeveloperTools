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
    public abstract class EnhancedControllerBase<T> : ControllerBase where T : EnhancedControllerBase<T>
    {
        protected readonly ILogger<T> _logger;

        protected EnhancedControllerBase(ILogger<T> logger)
        {
            _logger = logger;
        }

        public override BadRequestResult BadRequest()
        {
            _logger.LogWarning("Bad request with unspecified readon happened.");
            return base.BadRequest();
        }

        public override BadRequestObjectResult BadRequest([ActionResultObjectValue] object error)
        {
            string json = null;
            string jsonSerializationError = null;
            try
            {
                json = JsonConvert.SerializeObject(error);
            }
            catch (Exception ex)
            {
                jsonSerializationError = ex.ToString();
            }

            var sb = new StringBuilder("Bad request!");

            if (json != null)
            {
                sb.AppendLine("---[START OF serialized JSON of error object]---");
                sb.AppendLine(json);
                sb.AppendLine("---[END OF Serialized JSON of error object]---");
            }

            if (!string.IsNullOrEmpty(jsonSerializationError))
            {
                sb.AppendLine("Error occured while serializing error object:");
                sb.AppendLine("---[START OF exception]---");
                sb.AppendLine(jsonSerializationError);
                sb.AppendLine("---[END OF exception]---");
            }

            _logger.LogWarning(sb.ToString());

            return base.BadRequest(error);
        }

        public override BadRequestObjectResult BadRequest([ActionResultObjectValue] ModelStateDictionary modelState)
        {
            string json = null;
            string jsonSerializationError = null;
            try
            {
                json = JsonConvert.SerializeObject(modelState);
            }
            catch (Exception ex)
            {
                jsonSerializationError = ex.ToString();
            }

            var sb = new StringBuilder("Bad request!");

            if (json != null)
            {
                sb.AppendLine("---[START OF serialized JSON of error object]---");
                sb.AppendLine(json);
                sb.AppendLine("---[END OF Serialized JSON of error object]---");
            }

            if (!string.IsNullOrEmpty(jsonSerializationError))
            {
                sb.AppendLine("Error occured while serializing error object:");
                sb.AppendLine("---[START OF exception]---");
                sb.AppendLine(jsonSerializationError);
                sb.AppendLine("---[END OF exception]---");
            }

            _logger.LogWarning(sb.ToString());

            return base.BadRequest(modelState);
        }
    }
}
