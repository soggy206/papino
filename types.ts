
export interface Medicine {
  id: string; // NDC or equivalent unique code
  name: string;
  genericName: string;
  strength: string;
  manufacturer: string;
  category: string;
  quantity: number;
  expiryDate: string; // YYYY-MM-DD
}
