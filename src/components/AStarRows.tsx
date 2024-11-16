import React, {useCallback} from 'react';
import {CellType, RowsProps} from '../types/astar.types';
import {baseCellStyle, cellStyles} from './AStrarStyle';
import Row from './AStarRow.tsx';

const Rows: React.FC<RowsProps> = ({grid, path}) => {
    const getCellStyle = useCallback((cell: CellType, x: number, y: number): React.CSSProperties => {
        const isPath = cell !== 'start' && cell !== 'end' && path.some(p => p.x === x && p.y === y);

        return {
            ...baseCellStyle,
            ...(isPath ? cellStyles.path : cellStyles[cell] || cellStyles.default)
        };
    }, [path]);

    return (
        <div>
            {grid.map((row, y) => (
                <Row key={y} row={row} y={y} getCellStyle={getCellStyle}/>
            ))}
        </div>
    );
};

export default Rows;
