// Shared API configuration and types

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AppStatus {
  service: string;
  version: string;
  uptime: number;
}

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  TIMEOUT: 10000,
};

/**
 * Fetch helper to contact the backend service status
 */
export async function getStatus(): Promise<ApiResponse<AppStatus>> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/status`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch status" };
  }
}

/**
 * Fetch helper to verify backend server health status
 */
export async function checkHealth(): Promise<ApiResponse<{ status: string; message: string }>> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to check health" };
  }
}
