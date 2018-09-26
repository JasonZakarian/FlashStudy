using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashStudy.Models.Request
{
    public class DeckCreateRequest
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        //Privacy Option to be added later
    }
}
