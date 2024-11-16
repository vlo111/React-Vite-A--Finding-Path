import React from 'react';
import {RowProps} from '../types/astar.types';
import Cell from './AStarCell';

const AStarRow: React.FC<RowProps> = ({row, y, getCellStyle}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {row.map((cell, x) => (
                <Cell key={`${x}-${y}`} cell={cell} x={x} y={y} getCellStyle={getCellStyle}/>
            ))}
        </div>
    );
};

export default AStarRow;
