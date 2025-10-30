using EventBookingAPI.Data;
using EventBookingAPI.Models;
using EventBookingAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EventBookingAPI.Services
{
    public class EventService : IEventService
    {
        private readonly ApplicationDbContext _context;

        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDto>> GetAllEventsAsync()
        {
            return await _context.Events
                .Include(e => e.CreatedByUser)
                .Include(e => e.Bookings)
                .Select(e => new EventDto
                {
                    Id = e.Id,
                    Title = e.Title,
                    Description = e.Description,
                    EventDate = e.EventDate,
                    Location = e.Location,
                    MaxAttendees = e.MaxAttendees,
                    CurrentAttendees = e.Bookings.Count,
                    ImageUrl = e.ImageUrl,
                    CreatedByUserId = e.CreatedByUserId,
                    CreatedByUserName = e.CreatedByUser.Name,
                    CreatedAt = e.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<EventDto> GetEventByIdAsync(int id)
        {
            var @event = await _context.Events
                .Include(e => e.CreatedByUser)
                .Include(e => e.Bookings)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null) return null;

            return new EventDto
            {
                Id = @event.Id,
                Title = @event.Title,
                Description = @event.Description,
                EventDate = @event.EventDate,
                Location = @event.Location,
                MaxAttendees = @event.MaxAttendees,
                CurrentAttendees = @event.Bookings.Count,
                ImageUrl = @event.ImageUrl,
                CreatedByUserId = @event.CreatedByUserId,
                CreatedByUserName = @event.CreatedByUser.Name,
                CreatedAt = @event.CreatedAt
            };
        }

        public async Task<EventDto> CreateEventAsync(CreateEventRequest request, int userId)
        {
            var @event = new Event
            {
                Title = request.Title,
                Description = request.Description,
                EventDate = request.EventDate,
                Location = request.Location,
                MaxAttendees = request.MaxAttendees,
                ImageUrl = request.ImageUrl,
                CreatedByUserId = userId
            };

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return await GetEventByIdAsync(@event.Id);
        }

        public async Task<EventDto> UpdateEventAsync(int id, UpdateEventRequest request, int userId)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null || @event.CreatedByUserId != userId)
                return null;

            @event.Title = request.Title;
            @event.Description = request.Description;
            @event.EventDate = request.EventDate;
            @event.Location = request.Location;
            @event.MaxAttendees = request.MaxAttendees;
            @event.ImageUrl = request.ImageUrl;

            await _context.SaveChangesAsync();

            return await GetEventByIdAsync(@event.Id);
        }

        public async Task<bool> DeleteEventAsync(int id, int userId)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null || @event.CreatedByUserId != userId)
                return false;

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EventDto>> GetUserEventsAsync(int userId)
        {
            return await _context.Events
                .Where(e => e.CreatedByUserId == userId)
                .Include(e => e.CreatedByUser)
                .Include(e => e.Bookings)
                .Select(e => new EventDto
                {
                    Id = e.Id,
                    Title = e.Title,
                    Description = e.Description,
                    EventDate = e.EventDate,
                    Location = e.Location,
                    MaxAttendees = e.MaxAttendees,
                    CurrentAttendees = e.Bookings.Count,
                    ImageUrl = e.ImageUrl,
                    CreatedByUserId = e.CreatedByUserId,
                    CreatedByUserName = e.CreatedByUser.Name,
                    CreatedAt = e.CreatedAt
                })
                .ToListAsync();
        }
    }
}
