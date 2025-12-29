import { useQuery } from "@tanstack/react-query";
import type { Platform } from "../services/formatters/Types";
import { PlatformQueries } from "../services/getAllData/getPlatforms";

export function usePlatforms() {
    return useQuery<Platform[], Error>({
        queryKey: ["platforms"],
        queryFn: async () => {
            const platformServices = new PlatformQueries()
            return platformServices.getPlatforms()
        }
    })
}