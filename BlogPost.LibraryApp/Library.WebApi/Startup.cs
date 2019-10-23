using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Library.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = AzureADDefaults.AuthenticationScheme;
            })
                   .AddJwtBearer("AzureAD", options =>
                   {
                       options.Audience = Configuration.GetValue<string>("AzureAd:Audience");
                       options.Authority = Configuration.GetValue<string>("AzureAd:Instance") +
                       Configuration.GetValue<string>("AzureAd:TenantId");

                       options.TokenValidationParameters = new TokenValidationParameters()
                       {
                           ValidIssuer = Configuration.GetValue<string>("AzureAd:Issuer"),
                           ValidAudience = Configuration.GetValue<string>("AzureAd:Audience")
                       };
                   });

            var LibraryUIAppOrigins = new string[] { "https://localhost:44331" };

            services.AddCors(
              o => o.AddPolicy("LibraryWebApiCorsPolicy", builder =>
              {
                  builder.WithOrigins(LibraryUIAppOrigins)
                            .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
              }));


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            app.UseCors("LibraryWebApiCorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
