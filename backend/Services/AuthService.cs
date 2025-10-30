using EventBookingAPI.Data;
using EventBookingAPI.Models;
using EventBookingAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;

namespace EventBookingAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return new AuthResponse { Success = false, Message = "Email already exists" };
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user.Id, user.Email);

            return new AuthResponse
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                User = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email }
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                return new AuthResponse { Success = false, Message = "Invalid email or password" };
            }

            var token = GenerateJwtToken(user.Id, user.Email);

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                User = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email }
            };
        }

        public string GenerateJwtToken(int userId, string email)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? "your-secret-key-change-this-in-production-at-least-32-characters-long";
            var jwtIssuer = _configuration["Jwt:Issuer"] ?? "EventBookingAPI";
            var jwtAudience = _configuration["Jwt:Audience"] ?? "EventBookingClient";

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new System.Security.Claims.Claim("userId", userId.ToString()),
                new System.Security.Claims.Claim("email", email)
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == hash;
        }
    }
}
