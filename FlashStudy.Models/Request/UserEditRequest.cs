using System.ComponentModel.DataAnnotations;

namespace FlashStudy.Models.Request
{
    public class UserEditRequest:UserCreateRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
