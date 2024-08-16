import { FormFieldSize, FormFieldType, FormSelectFieldType } from "../enums/formFieldEnum";

export interface FormField {
    name: string;
    label: string;
    fieldType: FormFieldType;
    value?: any;
    disabled?: boolean;
    textType?: string;
    columnWidth?: FormFieldSize;
    validations?: FormFieldValidation;
    inputOptions?: FormFieldSelectOption[];
    allowedFileType?: string;
    selectFieldType?: FormSelectFieldType;
}

export interface FormFieldSelectOption { 
    value?: any;
    description?: string;
}

export interface FormFieldValidation {
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}

