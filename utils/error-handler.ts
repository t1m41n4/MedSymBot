import { logError } from './logger'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    logError(error, { statusCode: error.statusCode, code: error.code })
    return { message: error.message, statusCode: error.statusCode }
  }

  const defaultError = new AppError('Internal Server Error')
  logError(defaultError)
  return { message: defaultError.message, statusCode: defaultError.statusCode }
}
