import type { ValidationResult, Schema } from '@hapi/joi';

export default class JoiUtil {
  static validate(params: any, schema: Schema) {
    const validationRes: ValidationResult = schema.validate(params, {
      abortEarly: false,
    });
    return validationRes.error ? validationRes.error.details.map((detail) => ({
      message: detail.message,
      key: detail.context && detail.context.key,
    })) : [];
  }
}
