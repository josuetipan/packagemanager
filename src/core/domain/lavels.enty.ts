class Levels {
    id_level: string;//
    id_stage?: string;
    id_day?: string;
    level_name: string;//
    number: string;
    description_level: string;//
    code_level: string;
  
    constructor(
      id_level: string,
      level_name: string,
      number: string,
      description_level: string,
      code_level: string,
      id_stage?: string,
      id_day?: string
    ) {
      this.id_level = id_level;
      this.id_stage = id_stage;
      this.id_day = id_day;
      this.level_name = level_name;
      this.number = number;
      this.description_level = description_level;
      this.code_level = code_level;
    }
}
  