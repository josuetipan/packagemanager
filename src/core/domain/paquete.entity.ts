class PackagesManagement {
  name: string;
  originalPrice: number;
  discount?: number;//
  id_level?: string; //
  content?: string;
  description?: string;
  characteristics?: string;
  package_photo?: string;
  number_children?: number; //-------
  id_status?: string;
  last_modified_by?: string;
  created_at?: Date;
  last_modified_at?: Date;

  constructor(
    name: string,
    originalPrice: number,
    id_level?: string,
    discount?: number,
    characteristics?: string,
    description?: string,
    content?: string,
    number_children?: number,
    package_photo?: string,
    id_status?: string,
    last_modified_by?: string,
    created_at?: Date,
    last_modified_at?: Date
  ) {
    this.id_level = id_level;
    this.name = name;
    this.originalPrice = originalPrice;
    this.discount = discount;
    this.characteristics = characteristics;
    this.description = description;
    this.content = content;
    this.number_children = number_children;
    this.package_photo = package_photo;
    this.id_status = id_status;
    this.last_modified_by = last_modified_by;
    this.created_at = created_at || new Date();
    this.last_modified_at = last_modified_at || new Date();
  }
}
