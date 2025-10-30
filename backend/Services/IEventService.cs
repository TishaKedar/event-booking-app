using EventBookingAPI.Models.DTOs;

namespace EventBookingAPI.Services
{
    public interface IEventService
    {
        Task<List<EventDto>> GetAllEventsAsync();
        Task<EventDto> GetEventByIdAsync(int id);
        Task<EventDto> CreateEventAsync(CreateEventRequest request, int userId);
        Task<EventDto> UpdateEventAsync(int id, UpdateEventRequest request, int userId);
        Task<bool> DeleteEventAsync(int id, int userId);
        Task<List<EventDto>> GetUserEventsAsync(int userId);
    }
}
