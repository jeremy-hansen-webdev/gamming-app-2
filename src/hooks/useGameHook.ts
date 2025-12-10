

import { useEffect, useState } from "react";
import type { Filters } from "../services/GameApiClient";
import type { GamesDataProps } from "../services/useGame";
import { GamesData } from "../services/useGame";

export function useGames(filters?: Filters) {
    const [games, setGames] = useState<GamesDataProps[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {

        const fetchGames = async () => {
            try {
                setLoading(true);
                setError("");

            const gameService = new GamesData(filters);
            await gameService.setGameData();
            setGames(gameService.gameData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message ?? "Failed to load games data");
        } finally {
            setLoading(false);
        }
    };

    fetchGames();
    }, [filters])
    return {games, loading, error}
}