using System.Collections.Generic;

namespace Library.WebApi.Resources
{
    public class BookResource
    {
        public BookResource()
        {
            Books = new List<Book>();
        }
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public List<Book> Books { get; set; }
    }
    public class Book
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string Category { get; set; }
    }
}
