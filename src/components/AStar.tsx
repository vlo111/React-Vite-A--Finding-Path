import React, {useCallback, useEffect, useState} from 'react';
import {AStarPathfinder, createGrid} from '../utils/astar';
import {GRID_CONFIG} from '../utils/constants';
import Rows from './AStarRows.tsx';
import {buttonStyle, containerStyle} from "./AStrarStyle.ts";
import {Grid, Position} from "../types/astar.types.ts";

const AStar: React.FC = () => {
    const [grid, setGrid] = useState<Grid>([]);
    const [path, setPath] = useState<Position[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const initializeGrid = useCallback(() => {
        const newGrid = createGrid(GRID_CONFIG.SIZE, GRID_CONFIG.WALL_PROBABILITY);
        newGrid[GRID_CONFIG.START.y][GRID_CONFIG.START.x] = 'start';
        newGrid[GRID_CONFIG.END.y][GRID_CONFIG.END.x] = 'end';
        setGrid(newGrid);
        setPath([]);
    }, []);

    useEffect(() => {
        initializeGrid();
    }, [initializeGrid]);

    const findPath = useCallback(() => {
        setIsRunning(true);
        const pathFinder = new AStarPathfinder(grid);
        const aa = pathFinder.findPath(GRID_CONFIG.START, GRID_CONFIG.END);
        console.log(aa)
        setPath(aa);
        setIsRunning(false);
    }, [grid]);

    return (
        <div style={containerStyle}>
            <h2 style={{textAlign: 'center', marginBottom: 20, color: '#333'}}>A* Pathfinding Algorithm</h2>
            <div style={{marginBottom: 20}}>
                <Rows grid={grid} path={path}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>
                <button
                    onClick={findPath}
                    disabled={isRunning}
                    style={{
                        ...buttonStyle,
                        backgroundColor: isRunning ? '#999' : '#2196F3',
                    }}
                >
                    Find Path
                </button>
                <button
                    onClick={initializeGrid}
                    disabled={isRunning}
                    style={{
                        ...buttonStyle,
                        backgroundColor: isRunning ? '#999' : '#4CAF50',
                    }}
                >
                    Reset Grid
                </button>
            </div>
        </div>
    );
};

export default AStar;
