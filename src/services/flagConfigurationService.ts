/**
 * These are layouts to construct a flag.
 * Each layout, or FlagShape, has:
 * - a given number of colors,
 * - a series of shapes,
 * - a location for a symbol,
 * - a set of conditions based upon the axes.
 *
 * The conditions are pretty much straightforward, and are used elsewhere in this module:
 * each condition specifies a baseAxis (by id) and a numeric range,
 * and the value for that axis must be in the range for all conditions, for the layout to be eligible.
 *
 * The symbol location is a triplet giving x and y coordinates, and a scale, to draw a symbol on the flag.
 * Note that even though all layouts must have a symbol location, not all generated flags have symbols.
 *
 * The shapes are implemented as tuples,
 * where each tuple starts with a number identifying a color (among the number of colors of the layout).
 * When the second element of the tuple is "circle" or "circleSymbol",
 * the three other elements are x and y coordinates of the center and the radius of a circle to be drawn.
 * When it is "circleSymbol", the circle is only drawn if a symbol is to be drawn on top of it.
 * Otherwise, the tuples contain only numbers and are a series of x and y coordinates being the vertices of a polygon.
 */
type NumberTuple41 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
type NumberTuple13 = [number, number, number, number, number, number, number, number, number, number, number, number, number];
type NumberTuple9 = [number, number, number, number, number, number, number, number, number];
type NumberTuple7 = [number, number, number, number, number, number, number];
type CircleShape = [number, "circle", number, number, number];
type CircleSymbolShape = [number, "circleSymbol", number, number, number];
// The first element is the color index, lower than numColors
type FlagShapeSymbolPlacement = [number, number, number]; // x, y, scale
type FlagShapeCondition = {
	name: string,
	vmin: number,
	vmax: number,
};
export type FlagShape = {
	numColors: 0|1|2|3,
	shapes: (NumberTuple41 | NumberTuple13 | NumberTuple9 | NumberTuple7 | CircleShape | CircleSymbolShape)[],
	symbol: FlagShapeSymbolPlacement,
	cond: FlagShapeCondition[],
};
export const flagShapes: FlagShape[] = [
	/*
	****************************************************************************
	3C, REVO, JREH
	****************************************************************************
	*/
	// Révo, Int++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/6, 0, 1/6],
			[2, 0, 1/6, 1, 1/6, 1, 2/6, 0, 2/6],
			[1, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[2, 0, 3/6, 1, 3/6, 1, 4/6, 0, 4/6],
			[1, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
			[2, 0, 5/6, 1, 5/6, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.66,
			}
		]
	},
	// Révo, Int+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/5, 0, 1/5],
			[2, 0, 1/5, 1, 1/5, 1, 2/5, 0, 2/5],
			[1, 0, 2/5, 1, 2/5, 1, 3/5, 0, 3/5],
			[2, 0, 3/5, 1, 3/5, 1, 4/5, 0, 4/5],
			[1, 0, 4/5, 1, 4/5, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.66,
				vmax: -0.33,
			}
		]
	},
	// Révo
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/4, 0, 1/4],
			[2, 0, 1/4, 1, 1/4, 1, 2/4, 0, 2/4],
			[1, 0, 2/4, 1, 2/4, 1, 3/4, 0, 3/4],
			[2, 0, 3/4, 1, 3/4, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.33,
				vmax: 0.33,
			}
		]
	},
	// Révo, Nat+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/3, 0, 1/3],
			[2, 0, 1/3, 1, 1/3, 1, 2/3, 0, 2/3],
			[1, 0, 2/3, 1, 2/3, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.33,
				vmax: 0.66,
			}
		]
	},
	// Révo, Nat++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/2, 0, 1/2],
			[2, 0, 1/2, 1, 1/2, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.66,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	3C, REFO, JPUN
	****************************************************************************
	*/
	// Réfo, Int++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/8, 0, 1/8],
			[2, 0, 1/8, 1, 1/8, 1, 2/8, 0, 2/8],
			[1, 0, 2/8, 1, 2/8, 1, 3/8, 0, 3/8],
			[2, 0, 3/8, 1, 3/8, 1, 4/8, 0, 4/8],
			[1, 0, 4/8, 1, 4/8, 1, 5/8, 0, 5/8],
			[2, 0, 5/8, 1, 5/8, 1, 6/8, 0, 6/8],
			[1, 0, 6/8, 1, 6/8, 1, 7/8, 0, 7/8],
			[2, 0, 7/8, 1, 7/8, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2]
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.5,
			}
		]
	},
	// Réfo, Int+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/6, 0, 1/6],
			[2, 0, 1/6, 1, 1/6, 1, 2/6, 0, 2/6],
			[1, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[2, 0, 3/6, 1, 3/6, 1, 4/6, 0, 4/6],
			[1, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
			[2, 0, 5/6, 1, 5/6, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2]
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.5,
				vmax: 0.0,
			}
		]
	},
	// Réfo, Nat+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/4, 0, 1/4],
			[2, 0, 1/4, 1, 1/4, 1, 2/4, 0, 2/4],
			[1, 0, 2/4, 1, 2/4, 1, 3/4, 0, 3/4],
			[2, 0, 3/4, 1, 3/4, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2]
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.0,
				vmax: 0.5,
			}
		]
	},
	// Réfo, Nat++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/2, 0, 1/2],
			[2, 0, 1/2, 1, 1/2, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2]
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.5,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	3C, REVO, JPUN
	****************************************************************************
	*/
	// JPun, Int++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/8, 0, 1/8],
			[2, 0, 1/8, 1, 1/8, 1, 2/8, 0, 2/8],
			[1, 0, 2/8, 1, 2/8, 1, 3/8, 0, 3/8],
			[2, 0, 3/8, 1, 3/8, 1, 4/8, 0, 4/8],
			[1, 0, 4/8, 1, 4/8, 1, 5/8, 0, 5/8],
			[2, 0, 5/8, 1, 5/8, 1, 6/8, 0, 6/8],
			[1, 0, 6/8, 1, 6/8, 1, 7/8, 0, 7/8],
			[2, 0, 7/8, 1, 7/8, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1]
		],
		symbol: [1/6, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.6,
			}
		]
	},
	// JPun, Int+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/6, 0, 1/6],
			[2, 0, 1/6, 1, 1/6, 1, 2/6, 0, 2/6],
			[1, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[2, 0, 3/6, 1, 3/6, 1, 4/6, 0, 4/6],
			[1, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
			[2, 0, 5/6, 1, 5/6, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1]
		],
		symbol: [1/6, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.6,
				vmax: -0.2,
			}
		]
	},
	// JPun
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/4, 0, 1/4],
			[2, 0, 1/4, 1, 1/4, 1, 2/4, 0, 2/4],
			[1, 0, 2/4, 1, 2/4, 1, 3/4, 0, 3/4],
			[2, 0, 3/4, 1, 3/4, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1]
		],
		symbol: [1/6, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.2,
				vmax: 0.2,
			}
		]
	},
	// JPun, Nat+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/2, 0, 1/2],
			[2, 0, 1/2, 1, 1/2, 1, 1, 0, 1],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1]
		],
		symbol: [1/6, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.2,
				vmax: 0.6,
			}
		]
	},
	// JPun, Nat++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0, 1/3, 0, 1/3, 1, 0, 1],
			[2, 2/3, 0, 1, 0, 1, 1, 2/3, 1],
			[0, 1/3, 0, 2/3, 0, 2/3, 1, 1/3, 1]
		],
		symbol: [1/2, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.6,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	3C, REFO, JREH
	****************************************************************************
	*/
	// JReh, Int++
	{
		numColors: 3,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 4/16, 0, 6/16, 0, 6/16, 1, 4/16, 1],
			[1, 0, 3/8, 0, 5/8, 1, 5/8, 1, 3/8],
			[2, 4.4/16, 0, 5.6/16, 0, 5.6/16, 1, 4.4/16, 1],
			[2, 0, 3.4/8, 0, 4.6/8, 1, 4.6/8, 1, 3.4/8],
		],
		symbol: [2/16, 1.5/8, 0.8],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.6,
			}
		]
	},
	// JReh, Int+
	{
		numColors: 3,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 7/16, 0, 9/16, 0, 9/16, 1, 7/16, 1],
			[1, 0, 3/8, 0, 5/8, 1, 5/8, 1, 3/8],
			[2, 7.4/16, 0, 8.6/16, 0, 8.6/16, 1, 7.4/16, 1],
			[2, 0, 3.4/8, 0, 4.6/8, 1, 4.6/8, 1, 3.4/8],
		],
		symbol: [3.5/16, 1.5/8, 0.8],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.6,
				vmax: -0.2,
			}
		]
	},
	// JReh
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 3/12, 0, 3/12],
			[2, 0, 3/12, 1, 3/12, 1, 4/12, 0, 4/12],
			[0, 0, 4/12, 1, 4/12, 1, 8/12, 0, 8/12],
			[2, 0, 8/12, 1, 8/12, 1, 9/12, 0, 9/12],
			[1, 0, 9/12, 1, 9/12, 1, 1  , 0, 1  ],
		],
		symbol: [1/2, 1/2, 0.9],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.2,
				vmax: 0.2,
			}
		]
	},
	// JReh, Nat+
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/6, 0, 1/6],
			[2, 0, 1/6, 1, 1/6, 1, 2/6, 0, 2/6],
			[0, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[0, 0, 3/6, 1, 3/6, 1, 4/6, 0, 4/6],
			[2, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
			[1, 0, 5/6, 1, 5/6, 1, 1  , 0, 1  ],
		],
		symbol: [1/2, 1/2, 0.9],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.2,
				vmax: 0.6,
			}
		]
	},
	// JReh, Nat++
	{
		numColors: 3,
		shapes:
		[
			[1, 0, 0, 0, 1/3, 1, 1/3, 1, 0],
			[2, 0, 2/3, 0, 1, 1, 1, 1, 2/3],
			[0, 0, 1/3, 0, 2/3, 1, 2/3, 1, 1/3]
		],
		symbol: [1/2, 1/2, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.6,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	2C, REFO, JREH
	****************************************************************************
	*/
	// 2C, Réfo, JReh, Int++
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 0  , 1, 0  , 1, 1/9, 0, 1/9],
			[1, 0, 2/9, 1, 2/9, 1, 3/9, 0, 3/9],
			[1, 0, 4/9, 1, 4/9, 1, 5/9, 0, 5/9],
			[1, 0, 6/9, 1, 6/9, 1, 7/9, 0, 7/9],
			[1, 0, 8/9, 1, 8/9, 1, 9/9, 0, 9/9],
			[0, "circleSymbol", 0.5, 0.5, 0.25],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.666,
			}
		]
	},
	// 2C, Réfo, JReh, Int+
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 0  , 1, 0  , 1, 1/7, 0, 1/7],
			[1, 0, 2/7, 1, 2/7, 1, 3/7, 0, 3/7],
			[1, 0, 4/7, 1, 4/7, 1, 5/7, 0, 5/7],
			[1, 0, 6/7, 1, 6/7, 1, 1  , 0, 1  ],
			[0, "circleSymbol", 0.5, 0.5, 0.25],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.666,
				vmax: -0.333,
			}
		]
	},
	// 2C, Réfo, JReh, Int
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 0.75, 1, 0.75, 1, 0.8, 0, 0.8],
			[1, 0, 0.25, 1, 0.25, 1, 0.2, 0, 0.2],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.333,
				vmax: 0.0,
			}
		]
	},
	// 2C, Réfo, JReh, Nat
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1, 0, 1],
			[0, 0, 4/5, 1, 4/5, 1, 1/5, 0, 1/5],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.0,
				vmax: 0.333,
			}
		]
	},
	// 2C, Réfo, JReh, Nat+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/3, 0, 1/3],
			[0, 0, 1/3, 1, 1/3, 1, 2/3, 0, 2/3],
			[1, 0, 2/3, 1, 2/3, 1, 1  , 0, 1  ],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.333,
				vmax: 0.666,
			}
		]
	},
	// 2C, Réfo, JReh, Nat++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/2, 0, 1/2],
			[0, 0, 1/2, 1, 1/2, 1, 1  , 0, 1  ],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.666,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	2C, REVO, JREH
	****************************************************************************
	*/
	// 2C, Révo, JReh, Int++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/9, 0, 1/9],
			[0, 0, 1/9, 1, 1/9, 1, 2/9, 0, 2/9],
			[1, 0, 2/9, 1, 2/9, 1, 3/9, 0, 3/9],
			[0, 0, 3/9, 1, 3/9, 1, 4/9, 0, 4/9],
			[1, 0, 4/9, 1, 4/9, 1, 5/9, 0, 5/9],
			[0, 0, 5/9, 1, 5/9, 1, 6/9, 0, 6/9],
			[1, 0, 6/9, 1, 6/9, 1, 7/9, 0, 7/9],
			[0, 0, 7/9, 1, 7/9, 1, 8/9, 0, 8/9],
			[1, 0, 8/9, 1, 8/9, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.66,
			}
		]
	},
	// 2C, Révo, JReh, Int+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/7, 0, 1/7],
			[0, 0, 1/7, 1, 1/7, 1, 2/7, 0, 2/7],
			[1, 0, 2/7, 1, 2/7, 1, 3/7, 0, 3/7],
			[0, 0, 3/7, 1, 3/7, 1, 4/7, 0, 4/7],
			[1, 0, 4/7, 1, 4/7, 1, 5/7, 0, 5/7],
			[0, 0, 5/7, 1, 5/7, 1, 6/7, 0, 6/7],
			[1, 0, 6/7, 1, 6/7, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.66,
				vmax: -0.33,
			}
		]
	},
	// 2C, Révo, JReh, Int
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/5, 0, 1/5],
			[0, 0, 1/5, 1, 1/5, 1, 2/5, 0, 2/5],
			[1, 0, 2/5, 1, 2/5, 1, 3/5, 0, 3/5],
			[0, 0, 3/5, 1, 3/5, 1, 4/5, 0, 4/5],
			[1, 0, 4/5, 1, 4/5, 1, 1  , 0, 1  ],
			[0, 0, 0, 0.5, 0.5, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: -0.33,
				vmax: 0.0,
			}
		]
	},
	// 2C, Révo, JReh, Nat
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 1, 0, 0.5, 1, 0, 1, 0.5],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.0,
				vmax: 0.333,
			}
		]
	},
	// 2C, Révo, JReh, Nat+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 0, 1, 0.5, 0, 1],
		],
		symbol: [0.33, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.333,
				vmax: 0.666,
			}
		]
	},
	// 2C, Révo, JReh, Nat++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 1, 1, 1, 1, 0],
		],
		symbol: [0.125, 0.25, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "b",
				vmin: 0.666,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	2C, REVO, JPUN
	****************************************************************************
	*/
	// 2C, Révo, JPun, Int++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/8, 0, 1/8],
			[0, 0, 1/8, 1, 1/8, 1, 2/8, 0, 2/8],
			[1, 0, 2/8, 1, 2/8, 1, 3/8, 0, 3/8],
			[0, 0, 3/8, 1, 3/8, 1, 4/8, 0, 4/8],
			[1, 0, 4/8, 1, 4/8, 1, 5/8, 0, 5/8],
			[0, 0, 5/8, 1, 5/8, 1, 6/8, 0, 6/8],
			[1, 0, 6/8, 1, 6/8, 1, 7/8, 0, 7/8],
			[0, 0, 7/8, 1, 7/8, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2],
		],
		symbol: [1/6, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.666,
			}
		]
	},
	// 2C, Révo, JPun, Int+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1],
			[0, 0, 0/6, 1, 0/6, 1, 1/6, 0, 1/6],
			[0, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[0, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
		],
		symbol: [1/6, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.666,
				vmax: -0.333,
			}
		]
	},
	// 2C, Révo, JPun, Int
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 0, 1/3, 0, 1/3, 1, 0, 1],
			[0, 0, 0/5, 1, 0/5, 1, 1/5, 0, 1/5],
			[0, 0, 2/5, 1, 2/5, 1, 3/5, 0, 3/5],
			[0, 0, 4/5, 1, 4/5, 1, 5/5, 0, 5/5],
		],
		symbol: [1/6, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.333,
				vmax: 0.0,
			}
		]
	},
	// 2C, Révo, JPun, Nat
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 0, 1/3, 0, 1/3, 1, 0, 1],
			[1, 2/3, 0, 1, 0, 1, 1, 2/3, 1],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.0,
				vmax: 0.333,
			}
		]
	},
	// 2C, Révo, JPun, Nat+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 0.2, 0, 0, 0.1, 0, 1, 0.8, 1, 1, 0.9, 1],
			[0, 0, 0.8, 0, 1, 0.1, 1, 1, 0.2, 1, 0, 0.9, 0],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.333,
				vmax: 0.666,
			}
		]
	},
	// 2C, Révo, JPun, Nat++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 0, 0.37, 0, 0.43, 1/16, 0.37, 2/16, 0.43, 3/16, 0.37, 4/16, 0.43, 5/16, 0.37, 6/16, 0.43, 7/16, 0.37, 8/16, 0.43, 9/16, 0.37, 10/16, 0.43, 11/16, 0.37, 12/16, 0.43, 13/16, 0.37, 14/16, 0.43, 15/16, 0.37, 1, 0.43, 1, 0, 1],
		],
		symbol: [0.2, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.666,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	2C, REFO, JPUN
	****************************************************************************
	*/
	// 2C, Réfo, JPun, Int++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0  , 1, 0  , 1, 1/8, 0, 1/8],
			[0, 0, 1/8, 1, 1/8, 1, 2/8, 0, 2/8],
			[1, 0, 2/8, 1, 2/8, 1, 3/8, 0, 3/8],
			[0, 0, 3/8, 1, 3/8, 1, 4/8, 0, 4/8],
			[1, 0, 4/8, 1, 4/8, 1, 5/8, 0, 5/8],
			[0, 0, 5/8, 1, 5/8, 1, 6/8, 0, 6/8],
			[1, 0, 6/8, 1, 6/8, 1, 7/8, 0, 7/8],
			[0, 0, 7/8, 1, 7/8, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2],
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -1.0,
				vmax: -0.666,
			}
		]
	},
	// 2C, Réfo, JPun, Int+
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0  , 1, 0  , 1, 1/6, 0, 1/6],
			[1, 0, 1/6, 1, 1/6, 1, 2/6, 0, 2/6],
			[0, 0, 2/6, 1, 2/6, 1, 3/6, 0, 3/6],
			[1, 0, 3/6, 1, 3/6, 1, 4/6, 0, 4/6],
			[0, 0, 4/6, 1, 4/6, 1, 5/6, 0, 5/6],
			[1, 0, 5/6, 1, 5/6, 1, 1  , 0, 1  ],
			[0, 0, 0, 1/3, 0, 1/3, 1/2, 0, 1/2]
		],
		symbol: [1/6, 1/4, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.666,
				vmax: -0.333,
			}
		]
	},
	// 2C, Réfo, JPun, Int
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0.45, 0, 0.45, 1, 0.55, 1, 0.55, 0],
			[1, 0, 0.4, 1, 0.4, 1, 0.6, 0, 0.6],
		],
		symbol: [0.215, 0.2, 0.8],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: -0.333,
				vmax: 0.0,
			}
		]
	},
	// 2C, Réfo, JPun, Nat
	{
		numColors: 2,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
			[1, 0, 2/5, 1, 2/5, 1, 3/5, 0, 3/5],
			[1, 0.25, 0, 0.35, 0, 0.35, 1, 0.25, 1],
			[1, "circle", 0.3, 0.5, 0.25],
		],
		symbol: [0.3, 0.5, 0.9],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.0,
				vmax: 0.333,
			}
		]
	},
	// 2C, Réfo, JPun, Nat+
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, 0, 1/5, 1, 1/5, 1, 4/5, 0, 4/5],
			[1, "circle", 0.5, 0.5, 0.25],
		],
		symbol: [0.5, 0.5, 0.9],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.333,
				vmax: 0.666,
			}
		]
	},
	// 2C, Réfo, JPun, Nat++
	{
		numColors: 2,
		shapes:
		[
			[1, 0, 0, 1, 0, 1, 1, 0, 1],
			[0, "circle", 0.5, 0.5, 0.35]
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "j",
				vmin: 0.0,
				vmax: 1.0,
			},
			{
				name: "b",
				vmin: 0.666,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	1C, REVO
	****************************************************************************
	*/
	{
		numColors: 1,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
		],
		symbol: [0.125, 0.25, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: -1.0,
				vmax: 0.0,
			}
		]
	},
	/*
	****************************************************************************
	1C, REFO
	****************************************************************************
	*/
	{
		numColors: 1,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
		],
		symbol: [0.5, 0.5, 1.0],
		cond:
		[
			{
				name: "t",
				vmin: 0.0,
				vmax: 1.0,
			}
		]
	},
	/*
	****************************************************************************
	0C
	****************************************************************************
	*/
	{
		numColors: 0,
		shapes:
		[
			[0, 0, 0, 1, 0, 1, 1, 0, 1],
		],
		symbol: [0.5, 0.5, 1.0],
		cond: [ ]
	},
];

/**
 * Pretty much self-explanatory.
 * Pairs of colors (one front and one back),
 * each matching a set of conditions for a range of one or several axes (incl. special axes) :
 * A pair of color is acceptable if and when for each of the pair's conditions, the value of the axis is in the range.
 * Axes (and special axes) are identified by their ids.
 */
type FlagColorCondition = {
	name: string,
	vmin: number,
	vmax: number,
};
export type FlagColor = {
	bgColor: string,
	fgColor: string,
	cond: FlagColorCondition[],
};
export const flagColors: FlagColor[] = [
	//Anarchisme
	{
		bgColor: "#000000",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "anar",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	//Monarichisme
	{
		bgColor: "#ffffff",
		fgColor: "#fa9e08",
		cond:
		[
			{
				name: "mona",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	/*
	//Nationalisme
	{
		bgColor: "#a45e22",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "b1",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	*/
	//Conservatism
	{
		bgColor: "#062b85",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "s1",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	//Communiste
	{
		bgColor: "#d71224",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "p0",
				vmin: 0.6,
				vmax: 1.0,
			}
		]
	},
	//Socialiste
	{
		bgColor: "#c92375",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "m0",
				vmin: 0.4,
				vmax: 1.0,
			},
			{
				name: "p0",
				vmin: 0.0,
				vmax: 0.59999,
			}
		]
	},
	{
		bgColor: "#c92375",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "m0",
				vmin: 0.4,
				vmax: 1.0,
			},
			{
				name: "p1",
				vmin: 0.0,
				vmax: 1.0,
			}
		]
	},
	//Liberal
	{
		bgColor: "#fcce0a",
		fgColor: "#1b67ac",
		cond:
		[
			{
				name: "m1",
				vmin: 0.4,
				vmax: 1.0,
			},
			{
				name: "p1",
				vmin: 0.1,
				vmax: 1.0,
			}
		]
	},
	//Ecologie
	{
		bgColor: "#069839",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "e0",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	//Egalité (constructivisme)
	{
		bgColor: "#6a1094",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "c0",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	//Progressisme
	{
		bgColor: "#f86d07",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "s0",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	},
	//Productivisme
	{
		bgColor: "#2fa2d3",
		fgColor: "#ffffff",
		cond:
		[
			{
				name: "e1",
				vmin: 0.4,
				vmax: 1.0,
			}
		]
	}
];

export enum FlagSprite {
	Scythe, // 0, 0
	GearArc, // 1, 0
	PartialVenus, // 2, 0
	PartialUnionStars, // 3, 0
	Sword, // 0, 1
	Compass, // 1, 1
	FistVenus, // 2, 1
	UnionStars, // 3, 1
	Hammer, // 0, 2
	Arrows, // 1, 2
	Wheat, // 2, 2
	Flower, // 3, 2
	XX, // 0, 3
	Star, // 1, 3
	FleurDeLys, // 2, 3
	SmileyFrown, // 3, 3
}
const flagSpriteFileExtension = new Map<FlagSprite, string>([
	[FlagSprite.Scythe, "svg"],
	[FlagSprite.GearArc, "webp"],
	[FlagSprite.PartialVenus, "svg"],
	[FlagSprite.PartialUnionStars, "svg"],
	[FlagSprite.Sword, "webp"],
	[FlagSprite.Compass, "webp"],
	[FlagSprite.FistVenus, "webp"],
	[FlagSprite.UnionStars, "svg"],
	[FlagSprite.Hammer, "svg"],
	[FlagSprite.Arrows, "svg"],
	[FlagSprite.Wheat, "webp"],
	[FlagSprite.Flower, "webp"],
	[FlagSprite.XX, "svg"],
	[FlagSprite.Star, "svg"],
	[FlagSprite.FleurDeLys, "webp"],
	[FlagSprite.SmileyFrown, "webp"],
]);
export function getFlagSpriteFileExtension(fs: FlagSprite) {
	return flagSpriteFileExtension.get(fs);
}

/**
 * These describe symbols to be drawn as part of a flag.
 * Each FlagSymbol entry has:
 * - one condition,
 * - a parent type,
 * - a series of transforms.
 * Note that there isn't a direct relationship
 * between FlagSymbol entries and flag sprites.
 *
 * The condition is of the same kind as others in this module:
 * An axis (or special axis) is specified by id,
 * and its value must be in the specified range for the symbol entry to be eligible.
 * The specificity here is that each symbol entry has a single condition.
 *
 * Each of the specified transforms is one way the symbol may exist and be drawn ;
 * some FlagSymbol entries have transforms using different FlagSprites
 * (for instance, one to be combined with others and one to be standalone).
 * Each symbol transform specifies a FlagSprite.
 * A symbol transform with a child type of "none" may only appear on its own.
 * For two symbol transforms to appear combined on a flag,
 * the child_type of each must be equal to the parent_type of the FlagSymbol of the other.
 * Given that "none" is not a valid parent type value, symbol transforms are
 * either only standalone (if their child_type is "none") or only to be combined (if not).
 * There is no combining more than two symbol transforms on a single flag.
 * There is no combining two transforms from the same FlagSymbol entry.
 * The "main" field of a transform gives it priority
 * to be the enclosing transform of the two, when combined
 * (it is ignored for standalone transforms).
 * Otherwise, the first transform in the order of the FlagSymbol entries
 * (so, in the order this module defines them) is the enclosing one.
 *
 * From the location set by the flag's layout to receive a symbol,
 * the enclosing or standalone transform's sprite is displayed after translating
 * in parent_tx pixels in the horizontal direction, -parent_ty pixels in the vertical direction,
 * rotating parent_sx degrees clockwise,
 * and scaling by a factor of parent_sx horizontally and parent_sy vertically.
 *
 * If a second sprite is to be drawn, it is applied the transformations specified
 * by the child_ fields of the enclosing transform,
 * and then the parent_ ones of the second transform.
 */
export type FlagSymbolDataPairingType = "curve" | "dot" | "line" | "tri";
type BaseFlagSymbolTransform = {
	sprite: FlagSprite,
	parent_tx: number,
	parent_ty: number,
	parent_sx: number,
	parent_sy: number,
	parent_r: number,
};
type StandaloneFlagSymbolTransform = BaseFlagSymbolTransform & {
	child_type: "none",
	main: true,
};
export type CombinedFlagSymbolTransform = BaseFlagSymbolTransform & {
	child_type: FlagSymbolDataPairingType,
	main: boolean,
	child_tx: number,
	child_ty: number,
	child_sx: number,
	child_sy: number,
	child_r: number,
};
export type FlagSymbolTransform = StandaloneFlagSymbolTransform | CombinedFlagSymbolTransform;
type FlagSymbolData = {
	parent_type: FlagSymbolDataPairingType,
	transforms: FlagSymbolTransform[],
};
export type FlagSymbolCondition = {
	name: string,
	vmin: number,
	vmax: number,
};
export type FlagSymbol = {
	data: FlagSymbolData,
	cond: FlagSymbolCondition,
};
export const flagSymbols: FlagSymbol[] = [
	//Féminisme
	{
		data: {
			parent_type: "curve",
			transforms: [
				{
					child_type: "none",
					sprite: 6,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "line",
					sprite: 2,
					main: true,
					parent_tx: 10,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: -2,
					child_ty: 0,
					child_sx: -1,
					child_sy: 1,
					child_r: 1
				},
				{
					child_type: "dot",
					sprite: 2,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 3,
					child_ty: 17,
					child_sx: 0.55,
					child_sy: 0.55,
					child_r: 0
				}
			]
		},
		cond: {
			name: "femi",
			vmin: 0.95,
			vmax: 1.0,
		}
	},
	//Communisme
	{
		data: {
			parent_type: "curve",
			transforms: [
				{
					child_type: "none",
					sprite: 0,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "line",
					sprite: 0,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: -17,
					child_ty: -14,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 0,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 6,
					child_sx: 0.55,
					child_sy: 0.55,
					child_r: 0
				}
			]
		},
		cond: {
			name: "p0",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Internationalisme
	{
		data: {
			parent_type: "curve",
			transforms: [
				{
					child_type: "none",
					sprite: 7,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "line",
					sprite: 3,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: -13,
					child_ty: -20,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 3,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 2,
					child_ty: 0,
					child_sx: 0.55,
					child_sy: 0.55,
					child_r: 0
				}
			]
		},
		cond: {
			name: "b0",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Productivisme
	{
		data: {
			parent_type: "curve",
			transforms: [
				{
					child_type: "none",
					sprite: 1,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "line",
					sprite: 1,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: -17,
					child_ty: -20,
					child_sx: -1,
					child_sy: 1,
					child_r: 1
				},
				{
					child_type: "dot",
					sprite: 1,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 4,
					child_ty: 2,
					child_sx: 0.55,
					child_sy: 0.55,
					child_r: 0
				}
			]
		},
		cond: {
			name: "e1",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Régulationnisme
	{
		data: {
			parent_type: "line",
			transforms: [
				{
					child_type: "none",
					sprite: 8,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 45,
				},
				{
					child_type: "curve",
					sprite: 8,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 8,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 8,
					main: true,
					parent_tx: 0,
					parent_ty: -18,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: -45,
					child_tx: 0,
					child_ty: 18,
					child_sx: 0.6,
					child_sy: 0.6,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 8,
					main: false,
					parent_tx: 0,
					parent_ty: 5,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "m0",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Conservatisme
	{
		data: {
			parent_type: "line",
			transforms: [
				{
					child_type: "none",
					sprite: 4,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: -45,
				},
				{
					child_type: "curve",
					sprite: 4,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 4,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 4,
					main: true,
					parent_tx: 0,
					parent_ty: -18,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: -45,
					child_tx: 0,
					child_ty: 18,
					child_sx: 0.6,
					child_sy: 0.6,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 4,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "s1",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Punitif
	{
		data: {
			parent_type: "line",
			transforms: [
				{
					child_type: "none",
					sprite: 9,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: -45,
				},
				{
					child_type: "curve",
					sprite: 9,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 9,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 9,
					main: true,
					parent_tx: 0,
					parent_ty: -18,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: -45,
					child_tx: 0,
					child_ty: 18,
					child_sx: 0.6,
					child_sy: 0.6,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 9,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "j1",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Ecologie
	{
		data: {
			parent_type: "line",
			transforms: [
				{
					child_type: "none",
					sprite: 11,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "curve",
					sprite: 10,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 10,
					main: false,
					parent_tx: -6,
					parent_ty: 0,
					parent_sx: 0.95,
					parent_sy: 0.95,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: -1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "dot",
					sprite: 10,
					main: true,
					parent_tx: 5,
					parent_ty: -15,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 90,
					child_tx: -10,
					child_ty: 15,
					child_sx: 0.6,
					child_sy: 0.6,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 11,
					main: false,
					parent_tx: -20,
					parent_ty: -20,
					parent_sx: 0.6,
					parent_sy: 0.6,
					parent_r: 45,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "e0",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Essentialisme
	{
		data: {
			parent_type: "dot",
			transforms: [
				{
					child_type: "none",
					sprite: 12,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "curve",
					sprite: 12,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 12,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 12,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "c1",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Révolution
	{
		data: {
			parent_type: "dot",
			transforms: [
				{
					child_type: "none",
					sprite: 13,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "curve",
					sprite: 13,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 13,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 13,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "t0",
			vmin: 0.7,
			vmax: 1.0,
		}
	},
	//Monarchie
	{
		data: {
			parent_type: "dot",
			transforms: [
				{
					child_type: "none",
					sprite: 14,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "curve",
					sprite: 14,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "line",
					sprite: 14,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				},
				{
					child_type: "tri",
					sprite: 14,
					main: false,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 0,
					child_sx: 1,
					child_sy: 1,
					child_r: 0
				}
			]
		},
		cond: {
			name: "mona",
			vmin: 0.9,
			vmax: 1.0,
		}
	},
	//Constructivisme
	{
		data: {
			parent_type: "tri",
			transforms: [
				{
					child_type: "none",
					sprite: 5,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
				},
				{
					child_type: "line",
					sprite: 5,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: 5,
					child_sx: 1,
					child_sy: 1,
					child_r: -45
				},
				{
					child_type: "dot",
					sprite: 5,
					main: true,
					parent_tx: 0,
					parent_ty: 0,
					parent_sx: 1,
					parent_sy: 1,
					parent_r: 0,
					child_tx: 0,
					child_ty: -18,
					child_sx: 0.65,
					child_sy: 0.65,
					child_r: 0
				}
			]
		},
		cond: {
			name: "c0",
			vmin: 0.7,
			vmax: 1.0,
		}
	}
];
