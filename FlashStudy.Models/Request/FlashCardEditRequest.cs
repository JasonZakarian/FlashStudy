using System.ComponentModel.DataAnnotations;

namespace FlashStudy.Models.Request
{
    public class FlashCardEditRequest:FlashCardCreateRequest
    {
        [Required]
        public string Id { get; set; }
    }
}
