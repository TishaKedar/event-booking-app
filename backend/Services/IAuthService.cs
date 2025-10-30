using EventBookingAPI.Models.DTOs;

namespace EventBookingAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        string GenerateJwtToken(int userId, string email);
    }
}
