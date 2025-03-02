(function() {
    'use strict';

    // Complex Data Structures and Utilities
    const complexData = {
        matrix: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.random())),
        graph: new Map(),
        tree: {
            value: "root",
            children: [
                { value: "child1", children: [{ value: "grandchild1" }] },
                { value: "child2" }
            ]
        },
        promiseChain: Promise.resolve(1)
            .then(val => val * 2)
            .then(val => val + 3)
    };

    const utils = {
        deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
        memoize: (func) => {
            const cache = new Map();
            return (...args) => {
                const key = JSON.stringify(args);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func(...args);
                cache.set(key, result);
                return result;
            };
        },
        debounce: (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(...args), delay);
            };
        },
        throttle: (func, limit) => {
            let inThrottle;
            return (...args) => {
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        asyncIterator: async function* (array) {
            for (let item of array) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
                yield item;
            }
        },
        generateUUID: () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    };

    // Complex Algorithms
    const algorithms = {
        dijkstra: (graph, start, end) => {
            const distances = new Map();
            const previous = new Map();
            const queue = [];

            for (let node of graph.keys()) {
                distances.set(node, Infinity);
                previous.set(node, null);
                queue.push(node);
            }

            distances.set(start, 0);

            while (queue.length) {
                queue.sort((a, b) => distances.get(a) - distances.get(b));
                const current = queue.shift();

                if (current === end) break;

                for (let neighbor of graph.get(current) || []) {
                    const alt = distances.get(current) + neighbor.weight;
                    if (alt < distances.get(neighbor.node)) {
                        distances.set(neighbor.node, alt);
                        previous.set(neighbor.node, current);
                    }
                }
            }

            const path = [];
            let current = end;
            while (current) {
                path.unshift(current);
                current = previous.get(current);
            }

            return { distance: distances.get(end), path };
        },
        fibonacci: utils.memoize((n) => {
            if (n <= 1) return n;
            return algorithms.fibonacci(n - 1) + algorithms.fibonacci(n - 2);
        }),
        quickSort: (array) => {
            if (array.length <= 1) return array;
            const pivot = array[0];
            const left = [];
            const right = [];
            for (let i = 1; i < array.length; i++) {
                if (array[i] < pivot) left.push(array[i]);
                else right.push(array[i]);
            }
            return [...algorithms.quickSort(left), pivot, ...algorithms.quickSort(right)];
        },
        complexAsyncOperation: async (delay) => {
            await new Promise(resolve => setTimeout(resolve, delay));
            const randomValue = Math.random();
            if (randomValue < 0.2) throw new Error("Complex operation failed.");
            return randomValue;
        }
    };

    // Event Handling and DOM Manipulation
    const eventHandlers = {
        handleClick: utils.debounce(() => {
            console.log("Button clicked after debounce.");
        }, 500),
        handleScroll: utils.throttle(() => {
            console.log("Scroll event throttled.");
        }, 200),
        handleAsyncClick: async () => {
            try {
                const result = await algorithms.complexAsyncOperation(1000);
                console.log("Async operation successful:", result);
            } catch (error) {
                console.error("Async operation failed:", error);
            }
        },
        createDynamicElements: () => {
            const container = document.getElementById("dynamic-container");
            if(container){
                for (let i = 0; i < 5; i++) {
                    const div = document.createElement("div");
                    div.textContent = `Dynamic Element ${i}`;
                    container.appendChild(div);
                }
            }

        }
    };

    // Asynchronous Operations and Iteration
    const asyncOperations = async () => {
        try {
            const iterator = utils.asyncIterator([1, 2, 3, 4, 5]);
            for await (let item of iterator) {
                console.log("Async iterator item:", item);
            }
        } catch (error) {
            console.error("Async iteration failed:", error);
        }

        try {
            const promiseResult = await complexData.promiseChain;
            console.log("Promise chain result:", promiseResult);
        } catch (error) {
            console.error("Promise chain failed:", error);
        }
    };

    // Initialize Graph data.
    complexData.graph.set("A", [{ node: "B", weight: 1 }, { node: "C", weight: 4 }]);
    complexData.graph.set("B", [{ node: "A", weight: 1 }, { node: "C", weight: 2 }, { node: "D", weight: 5 }]);
    complexData.graph.set("C", [{ node: "A", weight: 4 }, { node: "B", weight: 2 }, { node: "D", weight: 1 }]);
    complexData.graph.set("D", [{ node: "B", weight: 5 }, { node: "C", weight: 1 }]);

    // Example Usage
    console.log("Deep clone:", utils.deepClone(complexData.tree));
    console.log("Fibonacci(10):", algorithms.fibonacci(10));
    console.log("Quick sort:", algorithms.quickSort([5, 1, 4, 2, 8]));
    console.log("Dijkstra:", algorithms.dijkstra(complexData.graph, "A", "D"));
    console.log("UUID:", utils.generateUUID());

    // Event listeners
    document.getElementById("click-button")?.addEventListener("click", eventHandlers.handleClick);
    window.addEventListener("scroll", eventHandlers.handleScroll);
    document.getElementById("async-button")?.addEventListener("click", eventHandlers.handleAsyncClick);

    // Dynamic Elements
    eventHandlers.createDynamicElements();

    // Async Operations
    asyncOperations();

})();