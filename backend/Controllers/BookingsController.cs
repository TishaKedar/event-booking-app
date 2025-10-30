using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EventBookingAPI.Models.DTOs;
using EventBookingAPI.Services;

namespace EventBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var booking = await _bookingService.CreateBookingAsync(request, userId);

            if (booking == null)
                return BadRequest("Event not found or is full");

            return CreatedAtAction(nameof(GetUserBookings), new { }, booking);
        }

        [HttpGet("my-bookings")]
        [Authorize]
        public async Task<IActionResult> GetUserBookings()
        {
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var bookings = await _bookingService.GetUserBookingsAsync(userId);

            return Ok(bookings);
        }

        [HttpGet("event/{eventId}")]
        [Authorize]
        public async Task<IActionResult> GetEventBookings(int eventId)
        {
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var bookings = await _bookingService.GetEventBookingsAsync(eventId, userId);

            return Ok(bookings);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
            var success = await _bookingService.CancelBookingAsync(id, userId);

            if (!success)
                return Unauthorized();

            return NoContent();
        }
    }
}
