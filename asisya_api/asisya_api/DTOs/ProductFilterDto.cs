namespace asisya_api.DTOs
{
    public class ProductFilterDto
    {
        public string? ProductName { get; set; }

        public string? CategoryName { get; set; }

        public int? SupplierID { get; set; }

        public bool? Discontinued { get; set; }

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
    }
}
