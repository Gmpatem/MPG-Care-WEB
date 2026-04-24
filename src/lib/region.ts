import { useState, useEffect, useCallback } from 'react'
import type { RegionCode } from '@/types/content'

const STORAGE_KEY = 'mpg-region'
const DEFAULT_REGION: RegionCode = 'PH'

function getQueryParamRegion(): RegionCode | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const region = params.get('region')
  if (region === 'PH' || region === 'CM') return region
  return null
}

function getStorageRegion(): RegionCode | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'PH' || stored === 'CM') return stored
  return null
}

export function getUserRegion(): RegionCode {
  return getQueryParamRegion() ?? getStorageRegion() ?? DEFAULT_REGION
}

export function setUserRegion(region: RegionCode): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, region)
}

export function useRegion(): {
  region: RegionCode
  setRegion: (region: RegionCode) => void
} {
  const [region, setRegionState] = useState<RegionCode>(() => getUserRegion())

  const setRegion = useCallback((newRegion: RegionCode) => {
    setUserRegion(newRegion)
    setRegionState(newRegion)
  }, [])

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'PH' || e.newValue === 'CM')) {
        setRegionState(e.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return { region, setRegion }
}
