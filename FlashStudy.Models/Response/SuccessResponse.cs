using FlashStudy.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashStudy.Models.Response
{
    public class SuccessResponse:BaseResponse
    {
        public SuccessResponse()
        {
            this.isSuccessfull = true;
        }
    }
}
