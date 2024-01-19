import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({
  name: 'vatOrFiscalCode',
  async: false,
})
export class VatOrFiscalCodeConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    // Remove any whitespace from the code
    let code = value.replace(/\s/g, '');

    // Check if the code is empty or not a string
    if (!code || typeof code !== 'string') {
      return false;
    }

    // Regular expression pattern for VAT or Fiscal Code validation
    var pattern = /^[A-Z]{2}\d{7}[A-Z\d]{3}$/;

    // Check if the provided code matches the pattern
    if (pattern.test(code)) {
      return true;
    }

    return false;
  }
}

export default function IsVatOrFiscalCode(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: VatOrFiscalCodeConstraint,
    });
  };
}
