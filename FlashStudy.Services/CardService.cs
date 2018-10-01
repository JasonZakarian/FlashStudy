using FlashStudy.Models.Request;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using FlashStudy.Models.Domain;
using System.Collections.Generic;

namespace FlashStudy.Services
{
    public class CardService
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public int Create(CardCreateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Card_Create";

                cmd.Parameters.AddWithValue("@DeckId", request.DeckId);
                cmd.Parameters.AddWithValue("@Question", request.Question);
                cmd.Parameters.AddWithValue("@Answer", request.Answer);
                cmd.Parameters.AddWithValue("@Position", request.Position);
                cmd.Parameters.Add("Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newCardId = (int)cmd.Parameters["Id"].Value;
                return newCardId;
            }
        }

        public void EditCard(CardEditRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Card_Edit";

                cmd.Parameters.AddWithValue("@Id", request.Id);
                cmd.Parameters.AddWithValue("@Question", request.Question);
                cmd.Parameters.AddWithValue("@Answer", request.Answer);
                cmd.Parameters.AddWithValue("@DeckId", request.DeckId);
                cmd.Parameters.AddWithValue("@Position", request.Position);

                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteCard(int deck, int position)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Card_Delete";

                cmd.Parameters.AddWithValue("@DeckId", deck);
                cmd.Parameters.AddWithValue("@Position", position);

                cmd.ExecuteNonQuery();
            }
        }

        public List<Card> GetByDeck(int deckId)
        {
            List<Card> deck = new List<Card>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Card_SelectByDeck";

                cmd.Parameters.AddWithValue("@DeckId", deckId);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Card card = new Card();
                    card.Id = (int)reader["Id"];
                    card.DeckId = (int)reader["DeckId"];
                    card.Question = (string)reader["Question"];
                    card.Answer = (string)reader["Answer"];
                    card.Position = (int)reader["Position"];
                    card.DeckName = (string)reader["Name"];
                    deck.Add(card);
                }

                return deck;
            }
        }

        public void FullDeckUpdate(List<Card> deck)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                foreach (Card item in deck)
                {
                    SqlCommand cmd = con.CreateCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Card_Edit";

                    cmd.Parameters.AddWithValue("@Id", item.Id);
                    cmd.Parameters.AddWithValue("@DeckId", item.DeckId);
                    cmd.Parameters.AddWithValue("@Question", item.Question);
                    cmd.Parameters.AddWithValue("@Answer", item.Answer);
                    cmd.Parameters.AddWithValue("@Position", deck.IndexOf(item)+1);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Card GetByPosition(int deck, int position)
        {
            Card card = new Card();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Card_GetByPosition";

                cmd.Parameters.AddWithValue("@DeckId", deck);
                cmd.Parameters.AddWithValue("@Position", position);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    card.Id = (int)reader["Id"];
                    card.DeckId = (int)reader["DeckId"];
                    card.Question = (string)reader["Question"];
                    card.Answer = (string)reader["Answer"];
                    card.Position = (int)reader["Position"];
                }
            }

            return card;
        }
    }
}
