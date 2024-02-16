import { FormFieldSize, FormFieldType, FormSelectFieldType } from "../enums/formFieldEnum";
import { FormField } from "../models/formField";

export const FormFieldContants = {

    textField(name: string, label: string, required: boolean, textType: string = "text", currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium): FormField {
        let formField : FormField = {
            name: name,
            label: label,
            textType: textType,
            value: currentValue,
            fieldType: FormFieldType.Input,
            columnWidth: columnWidth,
            validations: {
              required: required,
              
            }
        };
        if (formField.validations) formField.validations.email = formField.textType == "email";

        return formField;
    },
      
    firstName(currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium) :  FormField {
        return {
            name: "firstName",
            label: "First Name",
            textType: "text",
            value: currentValue,
            fieldType: FormFieldType.Input,
            columnWidth: columnWidth,
            validations: {
              required: true
            }
        }
    },
      
    lastName(currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium) :  FormField {
        return {
            name: "lastName",
            label: "Last Name",
            textType: "text",
            value: currentValue,
            fieldType: FormFieldType.Input,
            columnWidth: columnWidth,
            validations: {
              required: true
            }
        }
    },
      
    middleName(currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium) :  FormField {
        return {
            name: "middleName",
            label: "Middle Name",
            textType: "text",
            value: currentValue,
            fieldType: FormFieldType.Input,
            columnWidth: columnWidth,
            validations: {
              required: true
            }
        }
    },

    selectField(name: string, label: string, required: boolean, currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium, selectFieldType: FormSelectFieldType  = FormSelectFieldType.None): FormField {
        return {
            name: name,
            label: label,
            value: currentValue,
            fieldType: FormFieldType.Select,
            columnWidth: columnWidth,
            selectFieldType: selectFieldType,
            validations: {
              required: required
            }
        }
    },
      
    gender(currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium) :  FormField {
        return {
            name: "gender",
            label: "Gender",
            value: currentValue,
            fieldType: FormFieldType.Select,
            columnWidth: columnWidth,
            validations: {
              required: true
            }
        }
    },
      
    religion(currentValue: any | undefined = undefined, columnWidth: FormFieldSize = FormFieldSize.Medium) :  FormField {
        return {
            name: "religion",
            label: "Religion",
            value: currentValue,
            fieldType: FormFieldType.Select,
            columnWidth: columnWidth,
            validations: {
              required: true
            }
        }
    },
};