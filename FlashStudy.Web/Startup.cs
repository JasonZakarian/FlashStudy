using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FlashStudy.Web.Startup))]
namespace FlashStudy.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
