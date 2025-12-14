import { useEffect, useState } from "react";
import { PlatformQueries } from "../services/usePlatformQl";
import type { Platform } from "../services/Types";

export function usePlatforms() {
    const [platforms, setPlatforms] = useState<Platform[]>([])
      const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                setLoading(true)
                setError('')

                const platformServices = new PlatformQueries()
                const platformData = await platformServices.getPlatforms()
                setPlatforms(platformData)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message ?? "Failed to load platforms data")
            } finally {
                setLoading(false)
            }
        }
        fetchPlatforms()
    }, [])

    return {platforms, loading, error}
}