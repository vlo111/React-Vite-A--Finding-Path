export const GRID_CONFIG = {
    SIZE: 15,
    WALL_PROBABILITY: 0.2,
    START: { x: 0, y: 0 },
    END: { x: 14, y: 14 },
    CELL_COLORS: {
        wall: '#333',
        start: '#4CAF50',
        end: '#f44336',
        path: '#2196F3'
    }
} as const;
