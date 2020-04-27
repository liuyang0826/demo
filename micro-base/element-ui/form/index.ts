import { Form } from "element-ui";
import "./override.scss";

const form = Form;

export default form;

interface FormFieldRule {
  required?: boolean;
  message?: string;
  trigger?: "blur" | "change";
}

export interface FormRules {
  [key: string]: FormFieldRule | Array<FormFieldRule>;
}
