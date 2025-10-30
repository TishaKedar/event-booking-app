namespace EventBookingAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AdditionalInfo { get; set; }
        public DateTime BookedAt { get; set; } = DateTime.UtcNow;

        public Event Event { get; set; }
        public User User { get; set; }
    }
}
