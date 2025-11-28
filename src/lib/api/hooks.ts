"use client";

import { useEffect, useState } from "react";
import { publicInstance } from "./instances";

export type Competition = {
  id: number;
  title: string;
  description: string;
  slug: string;
  is_private: boolean;
  created_at: string;
};

export type Phase = {
  id: number;
  name: string;
  starts_at: string;
  ends_at: string;
  submission_limit: number;
  metrics_config: Record<string, unknown>;
  track_id: number;
};

export function useCompetitions() {
  const [data, setData] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    publicInstance
      .get<Competition[]>("/competitions")
      .then((res) => {
        if (!mounted) return;
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

export function usePhase(phaseId?: string) {
  const [data, setData] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!phaseId) return;
    let mounted = true;
    setLoading(true);
    publicInstance
      .get<Phase>(`/phases/${phaseId}`)
      .then((res) => {
        if (!mounted) return;
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [phaseId]);

  return { data, loading, error };
}
