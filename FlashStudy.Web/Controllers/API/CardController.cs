using FlashStudy.Models.Domain;
using FlashStudy.Models.Request;
using FlashStudy.Models.Response;
using FlashStudy.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FlashStudy.Web.Controllers.API
{
    [RoutePrefix("api/cards")]
    public class CardController : ApiController
    {
        readonly CardService cardService;

        public CardController(CardService cardService)
        {
            this.cardService = cardService;
        }

        [Route,HttpPost]
        public HttpResponseMessage Create(CardCreateRequest request)
        {
            int newCardId = cardService.Create(request);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newCardId });
        }

        [Route("{deck:int}/{position:int}"),HttpGet]
        public HttpResponseMessage GetByPosition(int deck, int position)
        {
            Card card = new Card();
            card = cardService.GetByPosition(deck,position);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Card> { Item = card });
        }

        [Route,HttpPut]
        public HttpResponseMessage EditCard(CardEditRequest request)
        {
            cardService.EditCard(request);

            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
    }
}
