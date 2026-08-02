const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000";

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
};

export type QueuePatient = {
  id: string;
  rank: number;
  patient_code: string;
  name: string;
  risk_score: number;
  normalized_risk_score: number;
  urgency_level: "critical" | "high" | "moderate" | "low";
  case_status: "waiting" | "in_treatment" | "closed";
  created_at: string;
};

export type PatientHistory = {
  id: string;
  patient_code: string;
  name: string;
  risk_score: number;
  normalized_risk_score: number;
  urgency_level: "critical" | "high" | "moderate" | "low";
  case_status: "waiting" | "in_treatment" | "closed";
  created_at: string;
  updated_at: string;
  closed_at: string | null;
};

export type DashboardDistributionItem = {
  name: string;
  value: number;
};

export type DashboardTimeSeriesPoint = {
  date: string;
  total: number;
  waiting: number;
  in_treatment: number;
  closed: number;
  critical: number;
  high: number;
  moderate: number;
  low: number;
};

export type DashboardSummary = {
  cards: {
    total_patients: number;
    active_patients: number;
    waiting: number;
    in_treatment: number;
    closed: number;
    critical_active: number;
    average_active_risk_score: number;
  };
  status_distribution: DashboardDistributionItem[];
  active_status_distribution: DashboardDistributionItem[];
  urgency_distribution: DashboardDistributionItem[];
  active_urgency_distribution: DashboardDistributionItem[];
  time_series: DashboardTimeSeriesPoint[];
  metadata: {
    days: number;
    generated_at: string;
  };
};

export type PatientCreatePayload = {
  patient_code: string;
  name: string;
  clinical_data: {
    age: number;
    gender: "Male" | "Female";
    heart_rate: number;
    systolic_bp: number;
    diastolic_bp: number;
    respiratory_rate: number;
    temperature_c: number;
    spo2: number;
    wbc_count: number;
    hemoglobin: number;
    platelets: number;
    creatinine: number;
    blood_urea: number;
    lactate: number;
  };
  metadata: Record<string, unknown>;
};

type ListParams = {
  page?: number;
  limit?: number;
  days?: number;
};

function buildUrl(path: string, params: ListParams = {}) {
  const url = new URL(path, API_URL);

  if (params.page) {
    url.searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    url.searchParams.set("limit", String(params.limit));
  }

  if (params.days) {
    url.searchParams.set("days", String(params.days));
  }

  return url.toString();
}

async function fetchJson<T>(
  url: string,
  errorMessage: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getPatientQueue(
  params: ListParams = {}
): Promise<PaginatedResponse<QueuePatient>> {
  return fetchJson(
    buildUrl("/api/patients/queue", params),
    "Failed to fetch patient queue"
  );
}

export async function getPatientHistory(
  params: ListParams = {}
): Promise<PaginatedResponse<PatientHistory>> {
  return fetchJson(
    buildUrl("/api/patients/history", params),
    "Failed to fetch patient history"
  );
}

export async function getDashboardSummary(
  params: { days?: number } = {}
): Promise<DashboardSummary> {
  return fetchJson(
    buildUrl("/api/dashboard/summary", { days: params.days }),
    "Failed to fetch dashboard summary"
  );
}

export async function updatePatientStatus(
  patientId: string,
  status: QueuePatient["case_status"]
) {
  return fetchJson(
    buildUrl(`/api/patients/${patientId}/status`),
    "Failed to update patient status",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
}

export async function closePatient(patientId: string) {
  return fetchJson(
    buildUrl(`/api/patients/${patientId}/close`),
    "Failed to close patient",
    {
      method: "PATCH",
    }
  );
}

export async function createPatientCase(payload: PatientCreatePayload) {
  return fetchJson<{ id: string }>(
    buildUrl("/api/patients"),
    "Failed to create patient",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}
