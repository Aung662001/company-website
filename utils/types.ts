export interface OrderFormData {
  hospital_name: string;
  contact_person_name: string;
  phone: string;
  email: string;
  hospital_address: string;
  order_type: { id: number; name: string };
}
