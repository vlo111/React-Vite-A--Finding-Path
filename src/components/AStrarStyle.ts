import React from "react";
import {CellStylesType} from "../types/astar.types.ts";

export const cellStyles: CellStylesType = {
    wall: {backgroundColor: '#333'},
    start: {backgroundColor: '#4CAF50'},
    end: {backgroundColor: '#f44336'},
    path: {backgroundColor: '#2196F3'},
    default: {backgroundColor: '#fff'},
};

export const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
};

export const containerStyle: React.CSSProperties = {
    maxWidth: window.innerWidth / 1.2,
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
};

export const baseCellStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: '1px solid #ccc',
    display: 'inline-block',
    margin: '1px',
};
