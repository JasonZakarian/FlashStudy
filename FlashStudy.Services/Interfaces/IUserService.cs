using FlashStudy.Models;
using FlashStudy.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashStudy.Services.Interfaces
{
    public interface IUserService
    {
        List<User> GetAll();
        int Create(UserCreateRequest request);
    }
}
