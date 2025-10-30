namespace EventBookingAPI.Services
{
    public interface IEmailService
    {
        Task SendBookingNotificationAsync(string toEmail, string eventTitle, string bookerName, string bookerEmail, string bookerPhone, string additionalInfo);
    }
}
