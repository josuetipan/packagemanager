class Discount {
    id_discount: string;//
    id_status?: string;
    name?: string;//
    number_discount?: number;//
    description: string;
    start_date?: Date;
    finish_date?: Date;
    last_modified_by?: string;
    created_at?: Date;
    last_modified_at?: Date;
  
    constructor(
      id_discount: string,
      description: string,
      id_status?: string,
      name?: string,
      number_discount?: number,
      start_date?: Date,
      finish_date?: Date,
      last_modified_by?: string,
      created_at?: Date,
      last_modified_at?: Date
    ) {
      this.id_discount = id_discount;
      this.id_status = id_status;
      this.name = name;
      this.number_discount = number_discount;
      this.description = description;
      this.start_date = start_date;
      this.finish_date = finish_date;
      this.last_modified_by = last_modified_by;
      this.created_at = created_at || new Date();
      this.last_modified_at = last_modified_at || new Date();
    }
  }
  