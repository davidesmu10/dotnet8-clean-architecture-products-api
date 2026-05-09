namespace asisya_api.Models
{
    public class ProductModel
    {
        public int ProductID { get; set; }

        public string ProductName { get; set; } = string.Empty;

        public int? SupplierID { get; set; }

        public int CategoryID { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public string? QuantityPerUnit { get; set; }

        public decimal? UnitPrice { get; set; }

        public int? UnitsInStock { get; set; }

        public int? UnitsOnOrder { get; set; }

        public int? ReorderLevel { get; set; }

        public string? Picture { get; set; }

        public bool Discontinued { get; set; }
    }
}
