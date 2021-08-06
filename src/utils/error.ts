export default class AppError extends Error {
    private code: string;

    private details: any;

    constructor(
      { code, message, details }: {
            code: string,
            message: string,
            details?: any
        },
    ) {
      super(message || 'Something went wrong');
      this.code = code || 'SomethingWentWrongError';
      this.details = details;
    }
}
