using EventBookingAPI.Models.DTOs;

namespace EventBookingAPI.Services
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingRequest request, int userId);
        Task<List<BookingDto>> GetUserBookingsAsync(int userId);
        Task<List<BookingDto>> GetEventBookingsAsync(int eventId, int userId);
        Task<bool> CancelBookingAsync(int bookingId, int userId);
    }
}
