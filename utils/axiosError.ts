import {AxiosError} from 'axios';

// Define the shape of your backend API's error body
interface CustomApiError {
  msg?: string;
  message?: string;
}

// Type the error parameter as AxiosError<CustomApiError>
const axiosError = (error: unknown): string => {
  // Use isAxiosError type guard to safely narrow unknown errors
  if (error instanceof AxiosError || (error as AxiosError).isAxiosError) {
    const axiosErr = error as AxiosError<CustomApiError>;

    if (axiosErr.response?.data?.msg) {
      return axiosErr.response.data.msg;
    } else if (axiosErr.request) {
      return 'No server response';
    } else {
      return axiosErr.message;
    }
  }

  // Fallback for non-Axios standard JS errors or unknown thrown values
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export default axiosError;
