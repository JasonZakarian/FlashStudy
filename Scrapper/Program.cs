using AngleSharp.Parser.Html;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Scrapper
{
    class Program
    {
        //public readonly string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        static void Main(string[] args)
        {
            var results = new List<StateCapitalSet>();
            var webClient = new WebClient();
            var html = webClient.DownloadString("https://en.wikipedia.org/wiki/List_of_capitals_in_the_United_States");
            var parser = new HtmlParser();
            var document = parser.Parse(html);

            var table = document.QuerySelectorAll(".wikitable")[0];
            var rows = table.QuerySelectorAll("tr").Skip(2);

            foreach (var row in rows)
            {
                var stateCapitalSet = new StateCapitalSet();
                var tableData = row.QuerySelectorAll("td");
                stateCapitalSet.State = tableData[0].TextContent;
                stateCapitalSet.City = tableData[3].TextContent;
                stateCapitalSet.Fact = tableData[10].TextContent;
                results.Add(stateCapitalSet);
            }

            SqlConnection con = new SqlConnection(Properties.Settings.Default.connectionString);

            con.Open();

            foreach (var row in results)
            {
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "Card_Create";

                cmd.Parameters.AddWithValue("@DeckId", 80);
                cmd.Parameters.AddWithValue("@Question", row.State);
                cmd.Parameters.AddWithValue("@Answer", row.City);
                cmd.Parameters.AddWithValue("@Position", results.IndexOf(row) + 1);

                cmd.Parameters.Add("Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }
       
        }
    }
}
