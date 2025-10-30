using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace EventBookingAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendBookingNotificationAsync(string toEmail, string eventTitle, string bookerName, string bookerEmail, string bookerPhone, string additionalInfo)
        {
            try
            {
                var smtpServer = _configuration["Email:SmtpServer"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
                var senderEmail = _configuration["Email:SenderEmail"] ?? "noreply@eventbooking.com";
                var senderPassword = _configuration["Email:SenderPassword"] ?? "";

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Event Booking System", senderEmail));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = $"New Booking for {eventTitle}";

                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = $@"
                    <h2>New Event Booking</h2>
                    <p><strong>Event:</strong> {eventTitle}</p>
                    <p><strong>Booker Name:</strong> {bookerName}</p>
                    <p><strong>Booker Email:</strong> {bookerEmail}</p>
                    <p><strong>Booker Phone:</strong> {bookerPhone}</p>
                    <p><strong>Additional Info:</strong> {additionalInfo}</p>
                ";

                message.Body = bodyBuilder.ToMessageBody();

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(smtpServer, smtpPort, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(senderEmail, senderPassword);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }
    }
}
