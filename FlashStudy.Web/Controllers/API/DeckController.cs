using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections.Generic;
using FlashStudy.Models.Request;
using FlashStudy.Models.Response;
using FlashStudy.Services;
using FlashStudy.Models.Domain;

namespace FlashStudy.Web.Controllers.API
{
    [RoutePrefix("api/decks")]
    public class DeckController : ApiController
    {
        readonly DeckService deckService;

        public DeckController(DeckService deckService)
        {
            this.deckService = deckService;
        }

        [Route,HttpPost]
        public HttpResponseMessage Create(DeckCreateRequest request)
        {
            int newDeckId = deckService.Create(request);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newDeckId });
        }

        [Route,HttpGet]
        public HttpResponseMessage GetAll() 
        {
            int UserId = 1; //Will change where this is grabbed once I figure out cookies

            List<Deck> deckList = new List<Deck>();
            deckList = deckService.GetAll(UserId);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<List<Deck>> { Item = deckList });
        }

        [Route("{deckId:int}"),HttpDelete]
        public HttpResponseMessage DeleteDeck(int deckId)
        {
            deckService.DeleteDeck(deckId);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
