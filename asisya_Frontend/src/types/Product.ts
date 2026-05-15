export type Product = {

  
  supplierName: any | null;
  categoryName: any | null;
  picture: any | null;
  productID?: number;

  productName: string;
  supplierID: number;
  categoryID: number | 0;

  quantityPerUnit: string;
  unitPrice: number;

  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;

  discontinued: boolean;
};