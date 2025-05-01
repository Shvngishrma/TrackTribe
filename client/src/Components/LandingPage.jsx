import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AnimatedHeading = ({ text }) => {
  const colors = [
    'text-pink-400',
    'text-purple-400',
    'text-blue-400',
    'text-cyan-400',
    'text-green-400',
    'text-yellow-400',
    'text-orange-400',
  ];
  
  return (
    <h1 className="text-7xl md:text-8xl font-serif flex flex-wrap justify-center mb-10 text-shadow-glow drop-shadow-2xl">
      {text.split("").map((char, idx) => {
        // Assign a color based on position for rainbow effect
        const colorClass = colors[idx % colors.length];
        
        return (
          <span
            key={idx}
            className={`inline-block transition-all duration-300 transform hover:scale-150 hover:rotate-12 ${colorClass} hover:text-white hover:filter hover:brightness-150`}
            style={{ 
              textShadow: "0 0 15px currentColor",
              transition: `all 0.3s ease ${idx * 0.03}s`
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
};

const LandingPage = () => {
  const canvasRef = useRef(null);
  const prevPos = useRef({ x: null, y: null });
  const mousePos = useRef({ x: null, y: null });
  const circlesRef = useRef([]);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Full screen setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = 'black';
    canvas.style.display = 'block';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 0; // Ensure canvas stays below text
    canvas.style.cursor = 'none';

    // Update mouse position on move
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Initialize prevPos on first move
      if (prevPos.current.x === null) {
        prevPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Draw loop using GSAP ticker
    const draw = () => {
      const { x: currX, y: currY } = mousePos.current;
      const { x: prevX, y: prevY } = prevPos.current;

      // Only draw when the mouse has moved
      if (currX !== null && (currX !== prevX || currY !== prevY)) {
        // Create a random "pulsating" effect with purple/blue colors
        const size = Math.random() * 20 + 20; // Size between 20px and 40px
        const distortionX = Math.random() * 60 - 30; // Random horizontal distortion
        const distortionY = Math.random() * 60 - 30; // Random vertical distortion
        const opacity = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8
        const pulseSpeed = Math.random() * 2 + 0.5; // Random pulse speed

        // Choose a color for the circle randomly from a wide range of neon colors
        const colors = [
          'rgba(138, 43, 226,',  // BlueViolet
          'rgba(0, 255, 127,',   // SpringGreen
          'rgba(255, 20, 147,',  // DeepPink
          'rgba(0, 255, 255,',   // Cyan
          'rgba(255, 215, 0,',   // Gold
          'rgba(50, 205, 50,',   // LimeGreen
          'rgba(255, 69, 0,',    // OrangeRed
          'rgba(255, 0, 255,',   // Magenta
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Store the circle's position and attributes temporarily
        circlesRef.current.push({
          x: currX + distortionX,
          y: currY + distortionY,
          size,
          time: Date.now(),
          opacity,
          pulseSpeed,
          color: randomColor,  // Random color chosen for each circle
        });

        // Draw the circle (fluid, distorted, and pulsating)
        ctx.fillStyle = `${randomColor} ${opacity})`; // Apply the selected color with opacity
        ctx.beginPath();
        ctx.ellipse(currX + distortionX, currY + distortionY, size, size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Update previous position for next frame
        prevPos.current = { x: currX, y: currY };
      }

      // Fade circles after some time
      const currentTime = Date.now();
      circlesRef.current = circlesRef.current.filter(circle => {
        // If the circle is older than 200ms, remove it (this is the fade-away effect)
        return currentTime - circle.time < 200;
      });

      // Clear the canvas and redraw all the recent circles with pulsing effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circlesRef.current.forEach((circle) => {
        const pulse = Math.sin((currentTime - circle.time) / circle.pulseSpeed) * 30 + 20; // Pulsing effect with larger circles
        ctx.fillStyle = `${circle.color} ${circle.opacity})`;  // Apply the color and opacity dynamically
        ctx.beginPath();
        ctx.ellipse(circle.x, circle.y, pulse, pulse, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Start the GSAP ticker
    gsap.ticker.add(draw);

    // Event listeners for mouse move and window resize
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignUpLoginClick = () => {
    navigate('/auth'); // Navigate to SignUpLogin component
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-900 via-black to-pink-900">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />

      <div className="relative z-10 text-center px-8 md:px-16">
        <AnimatedHeading text="Find Your Dream Party" />

        <p className="text-3xl md:text-4xl mb-10 text-indigo-400 italic drop-shadow-xl font-semibold">
          Vibe with the best crowd.
        </p>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-center mb-16">
          <button
            onClick={handleSignUpLoginClick}
            className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] relative group overflow-hidden"
          >
            <span className="relative z-10">Sign Up / Login</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></span>
          </button>
          
          <button className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:border-transparent hover:bg-gradient-to-r hover:from-green-400 hover:via-cyan-400 hover:to-indigo-500 hover:text-white font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_15px_rgba(45,212,191,0.6)]">
            Discover Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
