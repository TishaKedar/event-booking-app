namespace EventBookingAPI.Models.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public string EventTitle { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AdditionalInfo { get; set; }
        public DateTime BookedAt { get; set; }
    }

    public class CreateBookingRequest
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AdditionalInfo { get; set; }
    }
}
