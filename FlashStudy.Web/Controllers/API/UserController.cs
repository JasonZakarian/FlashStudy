using FlashStudy.Models;
using FlashStudy.Models.Domain;
using FlashStudy.Models.Request;
using FlashStudy.Models.Response;
using FlashStudy.Services;
using FlashStudy.Services.Interfaces;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FlashStudy.Web.Controllers.API
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<User> list = new List<User>();

            list = userService.GetAll();

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<List<User>> { Item = list });
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<User>() { Item = null });
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(UserCreateRequest request) 
        {
            if (request == null)
            {
                ModelState.AddModelError("","No Request Data Found");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            
            int newId = userService.Create(request);
            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newId });
        }

        /*[Route("login"),HttpPost]
        public HttpResponseMessage Login(UserLoginRequest request)
        {
            if (request == null)
            {
                ModelState.AddModelError("", "No Request Data Found");
            }

        }*/

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Edit(UserEditRequest request)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Changed it buddy");
        }

        [Route("{id:int}"),HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "All Gone My Dude");
        }
    }
}
