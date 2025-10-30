using EventBookingAPI.Data;
using EventBookingAPI.Models;
using EventBookingAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EventBookingAPI.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public BookingService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<BookingDto> CreateBookingAsync(CreateBookingRequest request, int userId)
        {
            var @event = await _context.Events
                .Include(e => e.CreatedByUser)
                .FirstOrDefaultAsync(e => e.Id == request.EventId);

            if (@event == null)
                return null;

            if (@event.Bookings.Count >= @event.MaxAttendees)
                return null;

            var booking = new Booking
            {
                EventId = request.EventId,
                UserId = userId,
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                AdditionalInfo = request.AdditionalInfo
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Send email notification to event creator
            await _emailService.SendBookingNotificationAsync(
                @event.CreatedByUser.Email,
                @event.Title,
                request.Name,
                request.Email,
                request.Phone,
                request.AdditionalInfo
            );

            return new BookingDto
            {
                Id = booking.Id,
                EventId = booking.EventId,
                EventTitle = @event.Title,
                Name = booking.Name,
                Email = booking.Email,
                Phone = booking.Phone,
                AdditionalInfo = booking.AdditionalInfo,
                BookedAt = booking.BookedAt
            };
        }

        public async Task<List<BookingDto>> GetUserBookingsAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Event)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    EventId = b.EventId,
                    EventTitle = b.Event.Title,
                    Name = b.Name,
                    Email = b.Email,
                    Phone = b.Phone,
                    AdditionalInfo = b.AdditionalInfo,
                    BookedAt = b.BookedAt
                })
                .ToListAsync();
        }

        public async Task<List<BookingDto>> GetEventBookingsAsync(int eventId, int userId)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);

            if (@event == null || @event.CreatedByUserId != userId)
                return new List<BookingDto>();

            return await _context.Bookings
                .Where(b => b.EventId == eventId)
                .Include(b => b.Event)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    EventId = b.EventId,
                    EventTitle = b.Event.Title,
                    Name = b.Name,
                    Email = b.Email,
                    Phone = b.Phone,
                    AdditionalInfo = b.AdditionalInfo,
                    BookedAt = b.BookedAt
                })
                .ToListAsync();
        }

        public async Task<bool> CancelBookingAsync(int bookingId, int userId)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null || booking.UserId != userId)
                return false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
