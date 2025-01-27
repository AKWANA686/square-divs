const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');
        
    // Function to generate random RGB color
        function getRandomRGB() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return { r, g, b };
        }

        // Function to darken an RGB color by a percentage
        function darkenRGB({ r, g, b }, percentage) {
            return {
                r: Math.max(Math.floor(r * (1 - percentage)), 0),
                g: Math.max(Math.floor(g * (1 - percentage)), 0),
                b: Math.max(Math.floor(b * (1 - percentage)), 0),
            };
        }

        // Function to set the color of a square
        function setSquareColor(square, { r, g, b }) {
            square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            square.dataset.rgb = `${r},${g},${b}`;
        }

        // Function to create the grid
        function createGrid(size) {
            container.innerHTML = ''; // Clear the container
            const squareSize = 480 / size; // Calculate square size based on the total grid size (480px)
            for (let i = 0; i < size * size; i++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.style.width = `${squareSize}px`;
                square.style.height = `${squareSize}px`;

                // Initialize square color
                const initialColor = getRandomRGB();
                setSquareColor(square, initialColor);
                square.dataset.darkness = 0; // Initialize darkness level

                // Add hover effect with darkening
                square.addEventListener('mouseover', () => {
                    const currentRGB = square.dataset.rgb.split(',').map(Number);
                    const darknessLevel = parseFloat(square.dataset.darkness);
                    const darkenedColor = darkenRGB(
                        { r: currentRGB[0], g: currentRGB[1], b: currentRGB[2] },
                        0.1
                    );
                    setSquareColor(square, darkenedColor);
                    square.dataset.darkness = Math.min(darknessLevel + 0.1, 1); // Update darkness level
                });

                container.append(square);
            }
        }

        // Function to reset the grid
        function resetGrid() {
            let size = prompt('Enter the number of squares per side (max 100):');
            size = parseInt(size);

            if (isNaN(size) || size < 1 || size > 100) {
                alert('Please enter a number between 1 and 100.');
                return;
            }

            createGrid(size);
        }

        // Add event listener to the button
        resetButton.addEventListener('click', resetGrid);

        // Initialize with a default grid size
        createGrid(16);