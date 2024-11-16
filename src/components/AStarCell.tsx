import React from 'react';
import {CellProps} from '../types/astar.types';

const Cell: React.FC<CellProps> = ({ cell, x, y, getCellStyle }) => {
    return <div key={`${x}-${y}`} style={getCellStyle(cell, x, y)} />;
};

export default Cell;
