import React from "react";

export interface Position {
    x: number;
    y: number;
}

export type NodeType = {
    position: Position;
    g: number;
    f: number;
    parent: NodeType | null;
};

export type CellType = 'wall' | 'start' | 'end' | 'default';

export type Grid = CellType[][];

export type CellStylesType = {
    path: { backgroundColor: string };
    default: { backgroundColor: string };
    start: { backgroundColor: string };
    end: { backgroundColor: string };
    wall: { backgroundColor: string }
}

export interface CellProps {
    cell: CellType;
    x: number;
    y: number;
    getCellStyle: (cell: CellType, x: number, y: number) => React.CSSProperties;
}

export interface RowsProps {
    grid: CellType[][];
    path: Position[];
}

export interface RowProps {
    row: CellType[];
    y: number;
    getCellStyle: (cell: CellType, x: number, y: number) => React.CSSProperties;
}
