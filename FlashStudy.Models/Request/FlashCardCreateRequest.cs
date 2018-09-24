using System.ComponentModel.DataAnnotations;

namespace FlashStudy.Models.Request
{
    public class FlashCardCreateRequest
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Front { get; set; }
        [Required]
        public string Back { get; set; }
    }
}
