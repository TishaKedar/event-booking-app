using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EventBookingAPI.Models.DTOs;
using EventBookingAPI.Services;

namespace EventBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventService.GetAllEventsAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var @event = await _eventService.GetEventByIdAsync(id);
            if (@event == null)
                return NotFound();

            return Ok(@event);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var @event = await _eventService.CreateEventAsync(request, userId);

            return CreatedAtAction(nameof(GetEventById), new { id = @event.Id }, @event);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] UpdateEventRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var @event = await _eventService.UpdateEventAsync(id, request, userId);

            if (@event == null)
                return Unauthorized();

            return Ok(@event);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var success = await _eventService.DeleteEventAsync(id, userId);

            if (!success)
                return Unauthorized();

            return NoContent();
        }

        [HttpGet("user/my-events")]
        [Authorize]
        public async Task<IActionResult> GetUserEvents()
        {
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var events = await _eventService.GetUserEventsAsync(userId);

            return Ok(events);
        }
    }
}
