using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashStudy.Models.Request
{
    public class CardGetRequest
    {
        public int DeckId { get; set; }
        public int Position { get; set; }
    }
}
