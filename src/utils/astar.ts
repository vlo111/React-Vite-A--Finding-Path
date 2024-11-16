import {Grid, NodeType, Position} from "../types/astar.types.ts";

class Node implements NodeType {
    position: Position;
    g: number; // Cost from start to current node
    f: number; // Estimated total cost (g + h)
    parent: NodeType | null;

    constructor(position: Position, g = 0, h = 0, parent: NodeType | null = null) {
        this.position = position;
        this.g = g;
        this.f = g + h;
        this.parent = parent;
    }
}

class MinHeap {
    private heap: Node[];

    constructor() {
        this.heap = [];
    }

    insert(node: Node) {
        this.heap.push(node);
        this.heapifyUp();
    }

    pop(): Node | null {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end!;
            this.heapifyDown();
        }
        return min;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private heapifyUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (parent.f <= element.f) break;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
        this.heap[idx] = element;
    }

    private heapifyDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild: Node | undefined, rightChild: Node | undefined;
            let swap: number | null = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild.f < element.f) swap = leftChildIdx;
            }

            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild.f < element.f) ||
                    (swap !== null && rightChild.f < leftChild!.f)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;

            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

export class AStarPathfinder {
    private readonly grid: string[][];
    private readonly gridSize: number;
    private readonly openSet: MinHeap;
    private readonly nodeMap: Map<string, Node>;

    constructor(grid: string[][]) {
        this.grid = grid;
        this.gridSize = grid.length;
        this.openSet = new MinHeap();
        this.nodeMap = new Map();
    }

    private manhattan(pos1: Position, pos2: Position): number {
        return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    }

    private getNeighbors({x, y}: Position): Position[] {
        const directions = [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: -1, y: 0},
        ];

        return directions
            .map(({x: dx, y: dy}) => ({x: x + dx, y: y + dy}))
            .filter(({x, y}) =>
                x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize && this.grid[y][x] !== 'wall',
            );
    }

    public findPath(start: Position, end: Position): Position[] {
        const startNode = new Node(start);
        this.openSet.insert(startNode);
        this.nodeMap.set(`${start.x},${start.y}`, startNode);

        const closedSet = new Set<string>();

        while (!this.openSet.isEmpty()) {
            const current = this.openSet.pop();
            if (!current) break;

            // If the end node is reached
            if (current.position.x === end.x && current.position.y === end.y) {
                const path: Position[] = [];
                let temp: NodeType | null = current;
                while (temp) {
                    path.push(temp.position);
                    temp = temp.parent;
                }
                return path.reverse();
            }

            closedSet.add(`${current.position.x},${current.position.y}`);

            // Check neighbors
            for (const neighbor of this.getNeighbors(current.position)) {
                if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;

                const g = current.g + 1;
                const h = this.manhattan(neighbor, end);
                const existingNode = this.nodeMap.get(`${neighbor.x},${neighbor.y}`);

                if (!existingNode) {
                    const neighborNode = new Node(neighbor, g, h, current);
                    this.openSet.insert(neighborNode);
                    this.nodeMap.set(`${neighbor.x},${neighbor.y}`, neighborNode);
                } else if (g < existingNode.g) {
                    existingNode.g = g;
                    existingNode.f = g + h;
                    existingNode.parent = current;

                    // Reinsert the updated node into the priority queue
                    this.openSet.insert(existingNode);
                }
            }
        }

        return []; // No path found
    }
}

export const createGrid = (size: number, wallProbability: number = 0.2): Grid => {
    return Array(size).fill(null).map(() =>
        Array(size).fill(null).map(() =>
            Math.random() < wallProbability ? 'wall' : 'default'
        )
    );
};
