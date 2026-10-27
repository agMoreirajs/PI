const API_BASE_URL = 'https://api.roteirocaicara.com.br/v1';

export async function fetchFromAPI(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.warn(`[API Error] Falha ao carregar ${endpoint}, a utilizar dados locais como fallback:`, error.message);
    return null;
  }
}