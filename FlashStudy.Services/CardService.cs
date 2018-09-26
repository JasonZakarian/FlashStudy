using FlashStudy.Models.Request;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

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
    }
}
