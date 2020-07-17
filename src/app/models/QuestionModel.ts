/** QuestionMVC model definitions **/

export interface QuestionModel {
  id?: number;
  category?: string;
  difficulty?: string;
  question?: string;
  type?: string;
  incorrect_answers?: Array<string>;
  correct_answer?: string;
  text?: string;
  completed: boolean;
}

export namespace QuestionModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
