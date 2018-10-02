using FlashStudy.Models.Domain;
using FlashStudy.Models.Request;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace FlashStudy.Services
{
    public class DeckService
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public int Create(DeckCreateRequest request)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Deck_Create";

                cmd.Parameters.AddWithValue("@UserId", request.UserId);
                cmd.Parameters.AddWithValue("@Name", request.Name);
                cmd.Parameters.Add("Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newDeckId = (int)cmd.Parameters["Id"].Value;

                return newDeckId;
            }
        }

        public void DeleteDeck(int deckId)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Deck_Destroy";

                cmd.Parameters.AddWithValue("@DeckId", deckId);

                cmd.ExecuteNonQuery();
            }
        }

        public List<Deck> GetAll(int UserId)
        {
            List<Deck> deckList = new List<Deck>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Deck_SelectAll";

                cmd.Parameters.AddWithValue("@UserId", UserId);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Deck deck = new Deck();
                    deck.Id = (int)reader["Id"];
                    deck.Name = (string)reader["Name"];

                    deckList.Add(deck);
                }
            }

            return deckList;
        }
    }
}
