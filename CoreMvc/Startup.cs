using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CoreMvc
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env,ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //调用多个中间件
            app.Use(async (context,next) =>
            {
                logger.LogInformation("M1 start");
                await context.Response.WriteAsync("Hello World!");
                await next();
                logger.LogInformation("M1 end");

            });
            app.Run(async (context) =>
            {
                logger.LogInformation("M2 start");
                await context.Response.WriteAsync("Another Hello World!");
                logger.LogInformation("M2 end");
            });
        }
    }
}
