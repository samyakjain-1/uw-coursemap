import type {EdgeDefinition, ElementDefinition, LayoutOptions, NodeDefinition} from 'cytoscape'
import ELK, {type ElkNode} from 'elkjs/lib/elk.bundled.js'
import {getEdgeData, getNodeData} from './graph-data.ts'

export enum LayoutType {
    GROUPED,
    LAYERED,
}

export async function generateLayeredLayout(
    focus: string | null,
    courseData: ElementDefinition[],
    labelIsCode: boolean
): Promise<LayoutOptions> {
    const elk = new ELK()
    const newLayout: ElkNode = {
        id: "root",
        layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.randomSeed': `${Math.floor(Math.random() * 1000)}`,
        },
        children: getNodeData(courseData).map((node: NodeDefinition) => {
                if (!node.data.id) {
                    throw new Error("Node ID is undefined");
                }
                // console.log(node.data.title.split(' ').reduce(
                //             (acc: number, word: string) => acc = Math.max(acc, word.length),
                //       0) * 15)
                return {
                    id: node.data.id,
                    width: labelIsCode ? node.data.id.length * 7.5 :node.data.title.length * 7.5,
                    height: labelIsCode ? 15 : 25
                }
            }),
        edges: getEdgeData(courseData).map((edge: EdgeDefinition) => {
                if (!edge.data) {
                    throw new Error("Edge is undefined");
                }
                return {
                    id: edge.data.source + "-" + edge.data.target,
                    sources: [edge.data.source],
                    targets: [edge.data.target],
                }
            }),

    }

    const nodePos = await elk.layout(newLayout)
    return {
        name: 'preset',

        positions: Object.fromEntries(
            nodePos.children!.map((child) => [child.id, {
                x: child.x === undefined ? 0 : child.x,
                y: child.y === undefined ? 0 : child.y
            }])
        ),
        animate: !(focus),
        animationDuration: 1000,
        animationEasing: 'ease-in-out',
        zoom: undefined, // the zoom level to set (prob want fit = false if set)
        pan: undefined, // the pan level to set (prob want fit = false if set)
        fit: true, // whether to fit to viewport
        padding: 30, // padding on fit
    };
}

export function generateFcoseLayout(focus: string | null)  {

    return {
        name: 'fcose',
        quality: 'proof', // 'draft', 'default' or 'proof'
        animate: !(focus), // Whether to animate the layout
        animationDuration: 1000, // Duration of the animation in milliseconds
        animationEasing: 'ease-in-out', // Easing of the animation
        fit: true, // Whether to fit the viewport to the graph
        padding: 30, // Padding around the layout
        nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
        uniformNodeDimensions: true, // Specifies whether the node dimensions should be uniform
        packComponents: true, // Pack connected components - usually for graphs with multiple components
        nodeRepulsion: 40000, // Node repulsion (non overlapping) multiplier
        idealEdgeLength: 60, // Ideal edge (non nested) length
        edgeElasticity: 0.002, // Divisor to compute edge forces
        nestingFactor: 1, // Nesting factor (multiplier) to compute ideal edge length for nested edges
        gravity: 1,
        gravityRangeCompound: 1,
        gravityCompound: 0.1,
        gravityRange: 1.5,
        initialEnergyOnIncremental: 0.1,
        randomize: true, // Whether to randomize the initial positions of nodes
        // fixedNodeConstraint: [
        //     {
        //         nodeId: '300',
        //         position: {x: -100, y: 0}
        //     },
        //     {
        //         nodeId: '400',
        //         position: {x: 100, y: 0}
        //     }
        // ],
        // alignmentConstraint: {
        //     vertical: [],
        //     horizontal: [
        //         ['221', '222'],
        //         ['300', '400']
        //     ]
        // },
        // relativePlacementConstraint: [
        //     {left: '200', right: '300', gap: 100},
        //     {left: '221', right: '222', gap: 200},
        // ]
    }
}

