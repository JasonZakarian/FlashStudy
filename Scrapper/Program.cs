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
            //var results = new List<StateCapitalSet>();
            var results = new List<JavaScriptMethod>();
            var webClient = new WebClient();
            var html = webClient.DownloadString("https://www.w3schools.com/jsref/jsref_obj_string.asp");
            var parser = new HtmlParser();
            var document = parser.Parse(html);

            //var table = document.QuerySelectorAll(".wikitable")[0];
            //var rows = table.QuerySelectorAll("tr").Skip(2);

            //foreach (var row in rows)
            //{
            //    var stateCapitalSet = new StateCapitalSet();
            //    var tableData = row.QuerySelectorAll("td");
            //    stateCapitalSet.State = tableData[0].TextContent;
            //    stateCapitalSet.City = tableData[3].TextContent;
            //    stateCapitalSet.Fact = tableData[10].TextContent;
            //    results.Add(stateCapitalSet);
            //}

            var table = document.QuerySelectorAll(".w3-table-all")[1];
            var rows = table.QuerySelectorAll("tr").Skip(1);

            foreach (var row in rows)
            {
                var method = new JavaScriptMethod();
                var innerData = row.QuerySelectorAll("td");
                method.Method = innerData[0].TextContent;
                method.Description = innerData[1].TextContent;
                results.Add(method);
            }

            SqlConnection con = new SqlConnection(Properties.Settings.Default.connectionString);

            con.Open();

            foreach (var row in results)
            {
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "Card_Create";

                cmd.Parameters.AddWithValue("@DeckId", 85);
                cmd.Parameters.AddWithValue("@Question", row.Description);
                cmd.Parameters.AddWithValue("@Answer", row.Method);
                cmd.Parameters.AddWithValue("@Position", results.IndexOf(row) + 1);

                cmd.Parameters.Add("Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }

        }
    }
}
