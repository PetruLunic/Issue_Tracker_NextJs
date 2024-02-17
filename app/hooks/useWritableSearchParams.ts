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
  const currentRef = useRef(new URLSearchParams(Array.from(searchParams.entries())));

  return {
    set: (keys) => {
      currentRef.current = new URLSearchParams(Array.from(searchParams.entries()));
      for (let key in keys) {
        currentRef.current.set(key, keys[key]);
      }
      router.push(`${pathname}/?${currentRef.current.toString()}`);

    },
    delete: (key: string) => {
      currentRef.current = new URLSearchParams(Array.from(searchParams.entries()));
      currentRef.current.delete(key);
      router.push(`${pathname}/?${currentRef.current.toString()}`);
    }
  }
}