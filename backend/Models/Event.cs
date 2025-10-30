namespace EventBookingAPI.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public string Location { get; set; }
        public int MaxAttendees { get; set; }
        public string ImageUrl { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User CreatedByUser { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
