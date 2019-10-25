using Library.WebApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Library.WebApi.Controllers
{
    [Authorize]
    public class BooksController : BaseApiController
    {
        private readonly ILogger<BooksController> logger;

        public BooksController(ILogger<BooksController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(BookResource), 200)]
        public IActionResult Get()
        {
            try
            {
                logger.LogInformation("In BooksController Get");

                //test data
                var bookResource = new BookResource()
                {
                    UserFullName = GetUserInfo("name"),
                    UserName = GetUserInfo("preferred_username"),
                    Books = new List<Book>()
                {
                    new Book()
                    {
                        BookId=1,
                        BookName="City of Girls",
                        AuthorName="Elizabeth Gilbert",
                        Category="Novel"
                    },
                    new Book()
                    {
                        BookId=2,
                        BookName="The Silent Patient",
                        AuthorName="Alex Michaelides",
                        Category="Thriller"
                    },
                     new Book()
                    {
                        BookId=3,
                        BookName="Once More We Saw Stars",
                        AuthorName="Jayson Greene",
                        Category="Memoir"
                    }
                }
                };

                return Ok(bookResource);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error in BooksController: {ex.Message}");
                return BadRequest($"{BadRequest().StatusCode} : {ex.Message}");

            }
        }
    }
}
