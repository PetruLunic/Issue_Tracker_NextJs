"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useRef} from "react";

interface WritableSearchParams{
  set: ({}: {[key: string]: string}) => void;
  delete: (key: string) => void;
}

export const useWritableSearchParams = (): WritableSearchParams => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return {
    set: (keys) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      for (let key in keys) {
        current.set(key, keys[key]);
      }

      router.push(`${pathname}/?${current.toString()}`);
    },
    delete: (key: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      current.delete(key);

      router.push(`${pathname}/?${current.toString()}`);
    }
  }
}