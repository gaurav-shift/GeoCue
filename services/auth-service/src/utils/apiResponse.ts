export interface ApiError {
  code: string;
  details: unknown | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: ApiError | null;
}

export const successResponse = <T>(
  message: string,
  data: T
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    error: null,
  };
};