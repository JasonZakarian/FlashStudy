using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashStudy.Models.Request
{
    public class CardCreateRequest
    {
        [Required]
        public int DeckId { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string Answer { get; set; }
        [Required]
        public int Position { get; set; }
    }
}
